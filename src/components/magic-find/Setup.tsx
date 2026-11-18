import { useState } from "preact/hooks";
import type { ProfilesAnswer } from "../../magic-find/profile";
import { loadProfiles, readMember } from "../../magic-find/profile";
import { LookupError, NAME, age, coins, num, profileLabel } from "../../lib/player";
import type { GearScan } from "../../magic-find/gear";
import { scanGear } from "../../magic-find/gear";
import type { BossId, ProgressStat } from "../../magic-find/sources";
import { ACTIVITIES, BOSSES, PROGRESS, SOURCES, TOGGLES } from "../../magic-find/sources";
import { MOBS } from "../../magic-find/mobs";
import { BESTIARY_MF_PER_TIER, FAMILY_NAMES, bestPetLevel, bestiaryTier } from "../../magic-find/progress";
import type { MobValue } from "../../magic-find/payback";
import { appliesTo } from "../../magic-find/planner";
import type { State } from "../../magic-find/state";
import { pickActivity, pickMob, setOwned } from "../../magic-find/state";
import { MfIcon } from "./MfIcon";

export type Update = (change: (s: State) => void) => void;

/** Magic Find to one decimal. */
export const r1 = (x: number) => num(x, 1);

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const sourceName = (id: string) => SOURCES.find((s) => s.id === id)?.name ?? id;
const inputValue = (e: Event) => (e.currentTarget as HTMLInputElement).value;

export function ProfilePanel({ s, update }: { s: State; update: Update }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState<ProfilesAnswer | null>(null);
  const [profileId, setProfileId] = useState("");
  const [gear, setGear] = useState<GearScan | null>(null);

  async function applyProfile(a: ProfilesAnswer, id: string) {
    const p = a.profiles.find((x) => x.profile_id === id);
    if (!p) return;
    const playerUuid = a.uuid;
    const member = p.members?.[playerUuid];
    const r = readMember(member);
    const got: string[] = [];
    const miss: string[] = [];
    const m = member as { bestiary?: { kills?: Record<string, number> }; pets_data?: { pets?: unknown } } | undefined;
    update((st) => {
      if (r.combat !== undefined) {
        st.prog.combat = r.combat;
        got.push(`Combat ${r.combat}`);
      } else miss.push("Combat level");
      if (r.petScore !== undefined) {
        st.prog.pet = r.petScore;
        got.push(`Pet Score ${r.petScore}`);
      } else miss.push("Pet Score");
      const slayers = r.slayers;
      if (slayers) {
        st.slayers = slayers;
        st.prog.slv = slayers[st.boss] ?? 0;
        got.push(`Slayers ${BOSSES.map((b) => slayers[b.id] ?? 0).join("/")}`);
      } else miss.push("Slayer levels");
      if (r.cookie !== undefined) {
        st.tog.cookie = r.cookie;
        got.push(`Cookie ${r.cookie ? "on" : "off"}`);
      }
      // Bestiary tiers for every tracked family; the picked mob's tier fills Bestiary Magic Find.
      const kills = m?.bestiary?.kills;
      if (kills && typeof kills === "object") {
        const tiers: Record<string, number> = {};
        for (const fam of FAMILY_NAMES) {
          const t = bestiaryTier(fam, kills);
          if (t !== null) tiers[fam] = t;
        }
        st.bestiary = tiers;
        const fam = MOBS.find((x) => x.id === st.mob)?.bestiary;
        if (fam && tiers[fam] !== undefined) {
          st.prog.best = tiers[fam]! * BESTIARY_MF_PER_TIER;
          got.push(`${fam} Bestiary tier ${tiers[fam]}`);
        } else got.push("Bestiary");
      } else miss.push("Bestiary");
      // Griffin (King of Kings needs Legendary or better) and Megalodon levels.
      const griffin = bestPetLevel(m?.pets_data?.pets, "GRIFFIN", "LEGENDARY");
      if (griffin !== null) {
        st.prog.griffin = griffin;
        got.push(`Griffin ${griffin}`);
      }
      const mega = bestPetLevel(m?.pets_data?.pets, "MEGALODON");
      if (mega !== null) {
        st.prog.mega = mega;
        got.push(`Megalodon ${mega}`);
      }
    });

    setGear(null);
    try {
      const scan = await scanGear(member);
      setGear(scan);
      update((st) => {
        for (const id of scan.owned) setOwned(st, id, true);
      });
      if (!scan.inventoryApi) miss.push("inventory (API setting off)");
    } catch {
      miss.push("inventory");
    }
    setMessage(`${got.join(", ") || "Nothing read"}.` + (miss.length ? ` Not loaded: ${miss.join(", ")}.` : ""));
  }

  async function load(e: Event) {
    e.preventDefault();
    const name = s.name.trim();
    if (!NAME.test(name)) {
      setError("Enter a Minecraft name.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const a = await loadProfiles(name);
      const first = a.profiles.find((p) => p.selected) ?? a.profiles[0];
      if (!first) throw new LookupError(`${a.player} has no SkyBlock profiles.`);
      setAnswer(a);
      setProfileId(first.profile_id);
      await applyProfile(a, first.profile_id);
    } catch (err) {
      setAnswer(null);
      setError(err instanceof LookupError ? err.message : "The profile server is down. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section class="mf-block" aria-labelledby="mf-profile">
      <h3 id="mf-profile">Profile</h3>
      <form class="lookup-form" onSubmit={(e) => void load(e)}>
        <label for="mf-name" class="visually-hidden">
          Minecraft name
        </label>
        <div class="lookup-row">
          <input
            id="mf-name"
            type="text"
            autocomplete="off"
            spellcheck={false}
            maxLength={16}
            placeholder="Minecraft name"
            value={s.name}
            onInput={(e) => update((st) => (st.name = inputValue(e).trim()))}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading…" : "Load"}
          </button>
        </div>
      </form>
      {error && <p class="lookup-error small">{error}</p>}
      {answer && answer.profiles.length > 1 && (
        <label class="lookup-who small">
          <span>Profile</span>
          <select
            value={profileId}
            onChange={(e) => {
              const id = inputValue(e);
              setProfileId(id);
              void applyProfile(answer, id);
            }}
          >
            {answer.profiles.map((p) => (
              <option key={p.profile_id} value={p.profile_id}>
                {profileLabel({ id: p.profile_id, name: p.cute_name ?? p.profile_id, mode: p.game_mode ?? "", selected: !!p.selected })}
              </option>
            ))}
          </select>
        </label>
      )}
      <p class="mf-note" aria-live="polite">
        {answer ? `${answer.player}, ${age(answer.fetchedAt)}. ${message}` : "Optional. Fills in your stats and owned gear. Gear needs SkyBlock API Inventory on."}
      </p>
      {gear?.inventoryApi && (
        <div class="mf-gear">
          {gear.owned.size > 0 && <p class="mf-note">Found: {[...gear.owned].map(sourceName).join(", ")}</p>}
          {gear.looting.length > 0 && (
            <ul>
              {gear.looting.slice(0, 6).map((l, i) => (
                <li key={i}>
                  {l.name}: Looting {ROMAN[l.level] ?? l.level} <span class="muted">({l.where})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export function FarmingPanel({ s, update, value }: { s: State; update: Update; value: MobValue | null }) {
  const note = ACTIVITIES.find((a) => a.id === s.act)?.note ?? "";
  const mobs = s.act === "all" ? MOBS : MOBS.filter((m) => m.act === s.act);
  const mob = MOBS.find((m) => m.id === s.mob);
  const kph = mob ? (s.kph[mob.id] ?? mob.killsPerHour) : 0;
  const tier = mob?.bestiary ? s.bestiary[mob.bestiary] : undefined;
  return (
    <section class="mf-block" aria-labelledby="mf-farming">
      <h3 id="mf-farming">Farming</h3>
      <div class="mf-seg" role="group" aria-label="Activity">
        {ACTIVITIES.map((a) => (
          <button key={a.id} type="button" aria-pressed={a.id === s.act} onClick={() => update((st) => pickActivity(st, a.id))}>
            {a.name}
          </button>
        ))}
      </div>
      {note && <p class="mf-note">{note}</p>}
      <label class="mf-field">
        <span>Mob</span>
        <select value={s.mob} onChange={(e) => update((st) => pickMob(st, inputValue(e)))}>
          <option value="">Any mob</option>
          {mobs.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </label>
      {mob && (
        <>
          <p class="mf-note">
            {mob.types.join(", ")}
            {tier !== undefined && `. Bestiary ${tier}`}
          </p>
          <label class="mf-field">
            <span>Kills per hour</span>
            <input
              type="number"
              min="0"
              step="1"
              value={kph}
              onChange={(e) =>
                update((st) => {
                  const n = Number(inputValue(e));
                  if (Number.isFinite(n) && n > 0) st.kph[mob.id] = n;
                  else delete st.kph[mob.id];
                })
              }
            />
          </label>
          {value && value.perPointPerHour > 0 ? (
            <p class="mf-value">
              1 MF ≈ <strong class="mf-coin">{coins(value.perPointPerKill)}</strong>/kill, <strong class="mf-coin">{coins(value.perPointPerHour)}</strong>/h
            </p>
          ) : (
            value && mob.drops.length > 0 && <p class="mf-note">No drop prices yet.</p>
          )}
          {mob.dataNote && <p class="mf-note">{mob.dataNote}</p>}
        </>
      )}
    </section>
  );
}

export function StatsPanel({ s, update }: { s: State; update: Update }) {
  const stats = PROGRESS.filter(appliesTo(s));
  const valueOf = (p: ProgressStat) => s.prog[p.id] ?? 0;
  return (
    <section class="mf-block" aria-labelledby="mf-stats">
      <h3 id="mf-stats">Your stats</h3>
      {s.act === "slayer" && (
        <label class="mf-field">
          <span>Boss</span>
          <select
            value={s.boss}
            onChange={(e) =>
              update((st) => {
                st.boss = inputValue(e) as BossId;
                const loaded = st.slayers[st.boss];
                if (loaded !== undefined) st.prog.slv = loaded;
              })
            }
          >
            {BOSSES.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <div class="mf-stats">
        {stats.map((p) => (
          <label key={p.id} class="mf-stat">
            <span class="mf-stat-name">{p.name}</span>
            <input
              type="number"
              min="0"
              max={p.max}
              value={valueOf(p)}
              onChange={(e) =>
                update((st) => {
                  const n = Number(inputValue(e));
                  st.prog[p.id] = Number.isFinite(n) && n > 0 ? n : 0;
                })
              }
            />
            <span class="mf-stat-hint">{p.hint}</span>
            <span class="mf-stat-bonus mf-mf">+{r1(p.mf(Math.min(p.max, valueOf(p)), s.boss))} ✯</span>
          </label>
        ))}
      </div>
      <div class="mf-toggles">
        {TOGGLES.map((g) => (
          <label key={g.id} class="mf-check">
            <input type="checkbox" checked={!!s.tog[g.id]} onChange={(e) => update((st) => (st.tog[g.id] = (e.currentTarget as HTMLInputElement).checked))} />
            {g.id !== "aatrox" && <MfIcon toggle={g.id} />}
            <span>{g.name}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
