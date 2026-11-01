import { useEffect, useState } from "preact/hooks";
import { API_NAMES, apply, count, progressPercent, requestChecklist, reset, type Answer } from "../../../lib/checklist";
import { LookupError, NAME, age, pageUrl, profileLabel, readQuery, type Query } from "../../../lib/player";
import { SKILLS } from "../../../lib/skills";
import { SkillTabs, joinList } from "../../player/Shell";

interface Props {
  skill: string;
}

/**
 * The player page of a skill the engine does not cover: the same POST /checklist as a guide page, written into the
 * static to-do list below this island ([data-skill-body]). It never calls GET /player, which only answers for mining.
 */
export default function SkillPage({ skill: id }: Props) {
  const skill = SKILLS.find((s) => s.id === id)!;
  const path = skill.path!;
  const [q, setQ] = useState<Query | null>(null);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState<LookupError | null>(null);
  const [busy, setBusy] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [next, setNext] = useState<{ id: string; name: string; state: string }[]>([]);

  useEffect(() => setQ(readQuery(skill.id)), []);
  useEffect(() => {
    if (!q) return;
    if (!NAME.test(q.name)) { setError(new LookupError("Enter a Minecraft name: 1 to 16 letters, digits or underscores.", false)); return; }
    const controller = new AbortController();
    setBusy(true);
    setError(null);
    requestChecklist(path.guide, q.name, q.profile, controller.signal)
      .then((a) => {
        apply(a);
        setAnswer(a);
        setNext(nextUp());
        document.title = `${a.player ?? q.name}: ${skill.label} | SkyProgression`;
      })
      .catch((e: unknown) => {
        if (controller.signal.aborted) return;
        reset();
        setAnswer(null);
        setError(e instanceof LookupError ? e : new LookupError(String(e)));
      })
      .finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, [q && pageUrl(q), attempt]);

  // No list for a player that does not exist or has no profiles, as the other pages hide their tabs.
  const known = !error || error.retry;
  useEffect(() => {
    const body = document.querySelector<HTMLElement>("[data-skill-body]");
    if (!body) return;
    body.hidden = !known;
    body.classList.toggle("stale", busy);
  }, [known, busy]);

  const name = answer?.player || q?.name || "";
  const counts = answer ? count(answer.results) : null;
  const total = answer?.results.length ?? 0;
  const off = answer ? Object.entries(API_NAMES).filter(([k]) => !answer.api[k as keyof Answer["api"]]).map(([, v]) => v) : [];
  const vaultOff = answer !== null && answer.api.inventory && !answer.api.vault;

  function pick(profile: string) {
    if (!q) return;
    const change = { ...q, profile };
    history.replaceState(null, "", pageUrl(change));
    setQ(change);
  }

  return (
    <div class="player" aria-busy={busy}>
      <header class="player-head">
        <h1 class="player-name">{name || "Player"}</h1>
        {known && <SkillTabs q={q} current={skill.id} />}
        {answer && answer.profiles.length > 1 && (
          <div class="player-controls">
            <label>
              <span>Profile</span>
              <select value={answer.profile.id} disabled={busy} onChange={(e) => {
                const p = answer.profiles.find((x) => x.id === (e.target as HTMLSelectElement).value);
                if (p) pick(p.selected ? "" : p.name);
              }}>
                {answer.profiles.map((p) => <option value={p.id} key={p.id}>{profileLabel(p)}</option>)}
              </select>
            </label>
          </div>
        )}
        {answer && (
          <p class="player-age">
            {answer.profiles.length === 1 && <>{profileLabel(answer.profile)}. </>}
            Profile data from {age(answer.fetchedAt)}. Hypixel shows changes a few minutes after you make them.
          </p>
        )}
      </header>

      <div aria-live="polite">
        {error && (
          <div class="player-error" role="alert">
            <p><strong>{error.message}</strong></p>
            {error.retry && <p><button type="button" class="link-button" onClick={() => setAttempt(attempt + 1)}>Try again</button></p>}
            <p><a href="/player/">Look up another player</a></p>
          </div>
        )}
        {!error && !answer && <p class="player-loading">Loading {q?.name ?? "the player"}…</p>}
      </div>

      {known && <p class="skill-note">{path.note}</p>}

      {(off.length > 0 || vaultOff) && (
        <div class="api-help">
          <p>
            <strong>Some API settings are off.</strong>{" "}
            {off.length > 0 && <>The {joinList(off)} {off.length > 1 ? "are" : "is"} off for this profile, so those rows show as unknown, not missing. </>}
            {vaultOff && <>The Personal Vault API is off, so items kept in the vault are not counted.</>}
          </p>
          <p>
            In game, open the <strong>SkyBlock Menu</strong>, then <strong>Settings</strong>, then <strong>API Settings</strong>, and switch each one on.
            Look again here after a few minutes.
          </p>
        </div>
      )}

      {answer && counts && (
        <section class="panel skill-progress" aria-labelledby="skill-progress-title">
          <h2 id="skill-progress-title">{counts.owned} of {total} done</h2>
          <div class="xp" aria-hidden="true"><span style={{ width: `${progressPercent(counts, total)}%` }} /></div>
          <p class="small">
            {counts.partial > 0 && <>{counts.partial} partly done. </>}
            {counts.missing > 0 && <>{counts.missing} missing. </>}
            {counts.manual > 0 && <>{counts.manual} to check yourself. </>}
            {counts.unknown > 0 && <>{counts.unknown} unknown, not counted as missing.</>}
          </p>
          {next.length > 0 && (
            <>
              <h3>Next up</h3>
              <ol class="small">{next.map((n) => <li key={n.id}>{n.name}{n.state === "partial" && " (partly done)"}</li>)}</ol>
            </>
          )}
        </section>
      )}
    </div>
  );
}

/** The first rows on the path that the API shows as not finished. */
function nextUp() {
  return [...document.querySelectorAll<HTMLElement>("[data-skill-body] [data-requirement]")]
    .filter((r) => r.dataset.state === "missing" || r.dataset.state === "partial")
    .slice(0, 3)
    .map((r) => ({ id: r.dataset.requirement!, name: r.querySelector(".name")?.textContent?.trim() ?? "", state: r.dataset.state! }));
}
