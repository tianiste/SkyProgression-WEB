import { useEffect, useRef, useState } from "preact/hooks";
import { SITE } from "../../config";

/**
 * "Check a player" on a guide page: sends the guide's requirements and a player name to the API, then ticks off the
 * page's to-do squares (data-requirement rows), fills the XP bar and the section counts, and explains unknown data.
 * Player and profile live in the URL query (?player=&profile=) so a checked guide can be shared.
 */

type State = "owned" | "partial" | "missing" | "unknown" | "manual";
interface Part { part: string; modifier?: number; text: string; have?: string }
interface Result {
  id: string;
  state: State;
  text?: string;
  have?: number;
  need?: number;
  missing?: Part[];
  unchecked?: Part[];
  where?: string[];
  coveredBy?: string;
  api?: string;
  options?: Result[];
  chosen?: number;
}
interface ProfileInfo { id: string; name: string; mode: string; selected: boolean }
interface Answer {
  player?: string;
  uuid: string;
  profile: ProfileInfo;
  profiles: ProfileInfo[];
  fetchedAt: string;
  api: { inventory: boolean; vault: boolean; collections: boolean; skills: boolean };
  results: Result[];
}

const LABEL: Record<State, string> = {
  owned: "Done.",
  partial: "Partly done.",
  missing: "Missing.",
  unknown: "Unknown.",
  manual: "Check this yourself.",
};
const API_NAMES: Record<string, string> = { inventory: "Inventory API", collections: "Collections API", skills: "Skills API" };
const NOT_AVAILABLE = "Player lookup is not available yet.";

interface Props {
  guide: string;
  total: number;
}

export default function PlayerLookup({ guide, total }: Props) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const requirements = useRef<unknown[] | null>(null);

  async function check(player: string, profile = "") {
    player = player.trim();
    if (!/^[A-Za-z0-9_]{1,16}$/.test(player)) {
      setError("Enter a Minecraft name: 1 to 16 letters, digits or underscores.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (!requirements.current) {
        const r = await fetch(`/guides/${guide}.json`);
        requirements.current = ((await r.json()) as { requirements: unknown[] }).requirements;
      }
      let response: Response;
      try {
        response = await fetch(`${SITE.api}/checklist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ign: player, profile, requirements: requirements.current }),
        });
      } catch {
        // An API without /checklist refuses the page's origin, which the browser reports as a network error.
        throw new Error(NOT_AVAILABLE);
      }
      const body = (await response.json().catch(() => ({}))) as Partial<Answer> & { error?: string; code?: string };
      if (!response.ok) throw new Error(message(response.status, body.code, body.error, player));
      const a = body as Answer;
      setAnswer(a);
      apply(a);
      const url = new URL(location.href);
      url.searchParams.set("player", a.player ?? player);
      if (a.profile.selected) url.searchParams.delete("profile");
      else url.searchParams.set("profile", a.profile.name);
      history.replaceState(null, "", url);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  function clear() {
    setAnswer(null);
    setError(null);
    reset();
    const url = new URL(location.href);
    url.searchParams.delete("player");
    url.searchParams.delete("profile");
    history.replaceState(null, "", url);
  }

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const player = q.get("player");
    if (player) {
      setName(player);
      void check(player, q.get("profile") ?? "");
    }
  }, []);

  const counts = answer ? count(answer.results) : null;
  const off = answer ? Object.entries(API_NAMES).filter(([k]) => !answer.api[k as keyof Answer["api"]]).map(([, v]) => v) : [];
  const vaultOff = answer !== null && answer.api.inventory && !answer.api.vault;
  const unknown = counts?.unknown ?? 0;

  return (
    <div class="lookup-island">
      <form
        class="lookup-form"
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          void check(name);
        }}
      >
        <label for="lookup-player">Check a player's progress</label>
        <div class="lookup-row">
          <input
            id="lookup-player"
            name="player"
            type="text"
            autocomplete="off"
            spellcheck={false}
            placeholder="Minecraft name"
            maxLength={16}
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
            required
          />
          <button type="submit" disabled={busy}>{busy ? "Checking…" : "Check profile"}</button>
        </div>
      </form>

      <div aria-live="polite">
        {error && <p class="lookup-error" role="alert">{error}</p>}
        {!answer && !error && (
          <p class="lookup-hint">
            <strong>0 of {total} checked.</strong> Enter a name to tick off what that player already has.
          </p>
        )}
        {answer && counts && (
          <div class="lookup-result">
            <p class="lookup-who">
              <strong>{answer.player ?? "This player"}</strong>
              {answer.profiles.length > 1 ? (
                <>
                  {" on "}
                  <label class="visually-hidden" for="lookup-profile">Profile</label>
                  <select id="lookup-profile" value={answer.profile.id} disabled={busy} onChange={(e) => {
                    const p = answer.profiles.find((x) => x.id === (e.target as HTMLSelectElement).value);
                    if (p) void check(answer.player ?? name, p.id);
                  }}>
                    {answer.profiles.map((p) => <option value={p.id} key={p.id}>{profileLabel(p)}</option>)}
                  </select>
                </>
              ) : (
                <> on {profileLabel(answer.profile)}</>
              )}
              <button type="button" class="link-button" onClick={clear}>Clear</button>
            </p>
            <p class="lookup-counts">
              <strong>{counts.owned} of {total} done</strong>
              {counts.partial > 0 && <>, {counts.partial} partly done</>}
              {counts.missing > 0 && <>, {counts.missing} missing</>}.
              {counts.manual > 0 && <> {counts.manual} to check yourself.</>}
              {unknown > 0 && <> {unknown} unknown.</>}
            </p>
            {counts.tiers.length > 0 && (
              <p class="lookup-tiers">
                {counts.tiers.map((t) => (
                  <span class="section-progress" key={t.label}>
                    {t.label} {t.done} of {t.total}
                    <span class="bar" aria-hidden="true"><span style={{ width: `${(100 * t.done) / Math.max(1, t.total)}%` }} /></span>
                  </span>
                ))}
              </p>
            )}
            <p class="lookup-age">{age(answer.fetchedAt)} Hypixel shows changes a few minutes after you make them.</p>
            {(off.length > 0 || unknown > 0 || vaultOff) && (
              <div class="api-help">
                <p>
                  <strong>{off.length > 0 || vaultOff ? "Some API settings are off." : "Some data is missing from the API."}</strong>{" "}
                  {off.length > 0 && <>The {joinList(off)} {off.length > 1 ? "are" : "is"} off for this profile, so those rows show as unknown, not missing. </>}
                  {vaultOff && <>The Personal Vault API is off, so items kept in the vault are not counted. </>}
                  {off.length === 0 && unknown > 0 && <>Rows marked unknown are not counted as missing.</>}
                </p>
                <p>
                  To turn them on, open the <strong>SkyBlock Menu</strong> in game, then <strong>Settings</strong>, then{" "}
                  <strong>API Settings</strong>, and switch each one on. Check again here after a few minutes.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function message(status: number, code: string | undefined, error: string | undefined, player: string): string {
  if (status === 404 && code === "unknown_endpoint") return NOT_AVAILABLE;
  if (code === "unavailable") return NOT_AVAILABLE;
  if (status === 404) return error && !/^Minecraft player not found/.test(error) ? `${error}.`.replace(/\.\.$/, ".") : `No Minecraft player is called ${player}.`;
  if (status === 429) return "Too many lookups right now. Try again in a minute.";
  if (code === "bad_key") return "The server can't read Hypixel profiles right now. Try again later.";
  if (status === 400) return error ?? "That request was not valid.";
  if (status === 403) return NOT_AVAILABLE;
  return "The profile server is down. Try again later.";
}

function profileLabel(p: ProfileInfo): string {
  const mode = p.mode === "ironman" ? " (Ironman)" : p.mode === "island" ? " (Stranded)" : p.mode === "bingo" ? " (Bingo)" : "";
  return p.name + mode + (p.selected ? ", selected in game" : "");
}

function age(at: string): string {
  const minutes = Math.round((Date.now() - Date.parse(at)) / 60_000);
  if (!Number.isFinite(minutes)) return "";
  if (minutes < 1) return "Data from just now.";
  if (minutes < 60) return `Data from ${minutes} minute${minutes === 1 ? "" : "s"} ago.`;
  const hours = Math.round(minutes / 60);
  return `Data from ${hours} hour${hours === 1 ? "" : "s"} ago.`;
}

function joinList(items: string[]): string {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

interface Counts {
  owned: number;
  partial: number;
  missing: number;
  unknown: number;
  manual: number;
  tiers: { label: string; done: number; total: number }[];
}

function count(results: Result[]): Counts {
  const c: Counts = { owned: 0, partial: 0, missing: 0, unknown: 0, manual: 0, tiers: [] };
  for (const r of results) c[r.state]++;
  // Untiered entries belong to both setups.
  const tiers = new Map<string, { done: number; total: number }>([["budget", { done: 0, total: 0 }], ["max", { done: 0, total: 0 }]]);
  for (const r of results) {
    const tier = document.querySelector<HTMLElement>(`[data-requirement="${CSS.escape(r.id)}"]`)?.dataset.tier;
    for (const [k, t] of tiers) if (!tier || tier === k) { t.total++; if (r.state === "owned") t.done++; }
  }
  const hasTiers = results.some((r) => document.querySelector<HTMLElement>(`[data-requirement="${CSS.escape(r.id)}"]`)?.dataset.tier);
  if (hasTiers) c.tiers = [{ label: "Budget setup", ...tiers.get("budget")! }, { label: "Max setup", ...tiers.get("max")! }];
  return c;
}

/** Writes the answer into the static page: row states and status lines, unmet upgrades, the XP bar, section counts. */
function apply(a: Answer) {
  reset();
  for (const r of a.results) {
    for (const row of document.querySelectorAll<HTMLElement>(`[data-requirement="${CSS.escape(r.id)}"]`)) {
      row.dataset.state = r.state;
      for (const p of r.missing ?? []) if (p.modifier !== undefined) row.querySelectorAll(`[data-mod="${p.modifier}"]`).forEach((el) => el.setAttribute("data-unmet", ""));
      if (r.chosen !== undefined && (r.state === "owned" || r.state === "partial")) row.querySelector(`[data-option="${r.chosen}"]`)?.setAttribute("data-chosen", "");
      const status = row.querySelector<HTMLElement>("[data-status]");
      if (!status) continue;
      const label = document.createElement("b");
      label.textContent = LABEL[r.state];
      status.replaceChildren(label, " " + detail(r, row));
      status.hidden = false;
    }
  }
  const c = count(a.results);
  const bar = document.querySelector<HTMLElement>(".progress .xp span");
  if (bar) bar.style.width = `${(100 * (c.owned + c.partial / 2)) / Math.max(1, a.results.length)}%`;
  for (const scope of document.querySelectorAll<HTMLElement>("[data-progress-scope]")) {
    const out = scope.querySelector<HTMLElement>("[data-progress]");
    const rows = [...scope.querySelectorAll<HTMLElement>("[data-requirement][data-state]")];
    if (!out || rows.length === 0) continue;
    const done = rows.filter((r) => r.dataset.state === "owned").length;
    out.innerHTML = "";
    const bar = document.createElement("span");
    bar.className = "bar";
    bar.setAttribute("aria-hidden", "true");
    const fill = document.createElement("span");
    fill.style.width = `${(100 * done) / rows.length}%`;
    bar.append(fill);
    out.append(`${done} of ${rows.length} done`, bar);
    out.hidden = false;
  }
}

function reset() {
  for (const row of document.querySelectorAll<HTMLElement>("[data-requirement][data-state]")) delete row.dataset.state;
  document.querySelectorAll("[data-unmet]").forEach((el) => el.removeAttribute("data-unmet"));
  document.querySelectorAll("[data-chosen]").forEach((el) => el.removeAttribute("data-chosen"));
  document.querySelectorAll<HTMLElement>("[data-status], [data-progress]").forEach((el) => { el.hidden = true; el.replaceChildren(); });
  const bar = document.querySelector<HTMLElement>(".progress .xp span");
  if (bar) bar.style.width = "0";
}

/** The status line after the state word: what is still needed, and where the counted copy is. */
function detail(r: Result, row: HTMLElement): string {
  const where = r.where?.length ? ` In: ${r.where.join(", ")}.` : "";
  if (r.state === "unknown") {
    const setting = r.api ? API_NAMES[r.api] : undefined;
    return setting ? `Turn on the ${setting} to check this.` : "Hypixel did not send the data for this.";
  }
  if (r.state === "manual") return r.options ? "None of the options can be read from the API." : "This can't be read from the API.";
  if (r.options && r.chosen !== undefined) {
    const option = r.options[r.chosen]!;
    const name = row.querySelector(`[data-option="${r.chosen}"]`)?.textContent?.trim();
    return `${name ? `${name}: ` : ""}${detail(option, row)}`;
  }
  if (r.coveredBy) return `${r.text ?? ""}${where}`;
  if (r.missing?.length) {
    const parts = r.missing.map((p) => {
      const text = p.modifier !== undefined ? row.querySelector(`[data-mod="${p.modifier}"]`)?.textContent?.trim() || p.text : p.text;
      return p.have ? `${text}, now ${p.have}` : text;
    });
    return `Still needed: ${parts.join("; ")}.${where}`;
  }
  if (r.state === "missing" && r.text && r.need === undefined) return "Not found in the profile.";
  const unchecked = r.unchecked?.length ? ` Not checked: ${r.unchecked.map((p) => row.querySelector(`[data-mod="${p.modifier}"]`)?.textContent?.trim() || p.text).join(", ")}.` : "";
  return `${r.need !== undefined ? (r.text ?? "") : ""}${where}${unchecked}`.trim();
}
