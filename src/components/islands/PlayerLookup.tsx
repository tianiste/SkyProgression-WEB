import { useEffect, useState } from "preact/hooks";
import { API_NAMES, apply, count, requestChecklist, reset, type Answer } from "../../lib/checklist";
import { profileLabel } from "../../lib/player";

/**
 * "Check a player" on a guide page: sends the guide's requirements and a player name to the API, then ticks off the
 * page's to-do squares (data-requirement rows), fills the XP bar and the section counts, and explains unknown data.
 * Player and profile live in the URL query (?player=&profile=) so a checked guide can be shared.
 */

interface Props {
  guide: string;
  total: number;
  /** The guide's names for its two setups. */
  tiers?: string[];
  /** The link to the player's page for this guide's skill. */
  playerLink?: { path: string; label: string };
}

export default function PlayerLookup({ guide, total, tiers = ["Budget setup", "Max setup"], playerLink }: Props) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<Answer | null>(null);

  async function check(player: string, profile = "") {
    player = player.trim();
    if (!/^[A-Za-z0-9_]{1,16}$/.test(player)) {
      setError("Enter a Minecraft name: 1 to 16 letters, digits or underscores.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const a = await requestChecklist(guide, player, profile);
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

  const counts = answer ? count(answer.results, tiers) : null;
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
              {playerLink && <a href={`/player/${encodeURIComponent(answer.player ?? name)}/${playerLink.path}`}>{playerLink.label}</a>}
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
