import type { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import { VIEWS, age, load, pageUrl, profileLabel, readQuery, LookupError, NAME, type Common, type Query, type View } from "../../lib/player";

/** The page's query, its answer, and a setter that updates the URL and loads again. */
export function usePlayer<T extends Common>(view: View) {
  const [q, setQ] = useState<Query | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<LookupError | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => setQ(readQuery(view)), []);
  useEffect(() => {
    if (!q) return;
    if (!NAME.test(q.name)) { setError(new LookupError("Enter a Minecraft name: 1 to 16 letters, digits or underscores.", false)); return; }
    const controller = new AbortController();
    setBusy(true);
    setError(null);
    load<T>(q, controller.signal)
      .then((d) => {
        setData(d);
        document.title = `${d.player || q.name}: ${VIEWS.find((v) => v.id === view)!.label} | SkyProgression`;
      })
      .catch((e: unknown) => { if (!controller.signal.aborted) setError(e instanceof LookupError ? e : new LookupError(String(e))); })
      .finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, [q && pageUrl(q)]);

  function update(change: Partial<Query>) {
    if (!q) return;
    const next = { ...q, ...change };
    history.replaceState(null, "", pageUrl(next));
    setQ(next);
  }
  return { q, data, error, busy, update };
}

interface Props<T extends Common> {
  view: View;
  state: ReturnType<typeof usePlayer<T>>;
  /** Selectors the page uses (the method is always shown, prices only where coins appear). */
  prices?: boolean;
  god?: boolean;
  children?: ComponentChildren;
}

const API_NAMES: Record<string, string> = { inventory: "Inventory API", collections: "Collections API", skills: "Skills API", vault: "Personal Vault API" };

export function Shell<T extends Common>({ view, state, prices = false, god = false, children }: Props<T>) {
  const { q, data, error, busy, update } = state;
  const name = data?.player || q?.name || "";
  const off = data ? (["inventory", "collections", "skills"] as const).filter((k) => !data.api[k]) : [];
  const vaultOff = data !== null && data.api.inventory && !data.api.vault;
  const tab = (id: View) => (q ? pageUrl({ ...q, view: id }) : "#");

  return (
    <div class="player" aria-busy={busy}>
      <header class="player-head">
        <h1 class="player-name">{name || "Player"}</h1>
        {data && (
          <div class="player-controls">
            {data.profiles.length > 1 && (
              <label>
                <span>Profile</span>
                <select value={data.profile.id} disabled={busy} onChange={(e) => {
                  const p = data.profiles.find((x) => x.id === (e.target as HTMLSelectElement).value);
                  if (p) update({ profile: p.selected ? "" : p.name });
                }}>
                  {data.profiles.map((p) => <option value={p.id} key={p.id}>{profileLabel(p)}</option>)}
                </select>
              </label>
            )}
            {(
              <label>
                <span>Method</span>
                <select value={view === "hotm" ? q?.method || "MF_GEMS" : data.method} disabled={busy} onChange={(e) => update({ method: (e.target as HTMLSelectElement).value })}>
                  {data.methods.map((m) => <option value={m.id} key={m.id}>{m.label}</option>)}
                </select>
              </label>
            )}
            {prices && (
              <label>
                <span>Price</span>
                <select value={data.priceMode} disabled={busy} onChange={(e) => update({ price: (e.target as HTMLSelectElement).value })}>
                  {data.priceModes.map((m) => <option value={m.id} key={m.id} title={m.meaning}>{m.label}</option>)}
                </select>
              </label>
            )}
            {god && (
              <label class="check">
                <input type="checkbox" checked={data.godPotion} disabled={busy} onChange={(e) => update({ god: (e.target as HTMLInputElement).checked })} />
                <span>God Potion</span>
              </label>
            )}
          </div>
        )}
        {data && (
          <p class="player-age">
            {data.profiles.length === 1 && <>{profileLabel(data.profile)}. </>}
            Profile data from {age(data.fetchedAt)}{data.pricesAt ? <>, prices from {age(data.pricesAt)}</> : null}. Hypixel shows changes a few minutes after you make them.
          </p>
        )}
        <nav class="player-tabs" aria-label="Player pages">
          <ul>
            {VIEWS.map((v) => (
              <li key={v.id}><a href={tab(v.id)} aria-current={v.id === view ? "page" : undefined}>{v.label}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <div aria-live="polite">
        {error && (
          <div class="player-error" role="alert">
            <p><strong>{error.message}</strong></p>
            {error.retry && <p><button type="button" class="link-button" onClick={() => q && update({})}>Try again</button></p>}
            <p><a href="/player/">Look up another player</a></p>
          </div>
        )}
        {!error && !data && <p class="player-loading">Loading {q?.name ?? "the player"}…</p>}
      </div>

      {data && off.length === 0 && vaultOff && (
        <p class="muted small">The Personal Vault API is off, so items kept in the vault are not counted.</p>
      )}
      {data && off.length > 0 && (
        <div class="api-help">
          <p>
            <strong>Some API settings are off.</strong>{" "}
            The {joinList(off.map((k) => API_NAMES[k]!))} {off.length > 1 ? "are" : "is"} off for this profile, so what depends on it shows as unknown.
            {vaultOff && <> The Personal Vault API is off too, so items in the vault are not counted.</>}
          </p>
          <p>
            In game, open the <strong>SkyBlock Menu</strong>, then <strong>Settings</strong>, then <strong>API Settings</strong>, and switch each one on.
            Look again here after a few minutes.
          </p>
        </div>
      )}

      {data && <div class={busy ? "player-body stale" : "player-body"}>{children}</div>}
    </div>
  );
}

export function joinList(items: string[]): string {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}
