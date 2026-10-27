import { ItemIcon } from "./ItemIcon";
import { amount, coins, num, signed, type LedgerHead, type MethodRow, type Source, type Upgrade } from "../../lib/player";

/** What a counted source adds to the total, as the mod shows it: additive % sources as their percentage. */
export function sourceValue(l: { percent: boolean }, s: Source): string {
  if (s.value === null) return "?";
  return s.additive ? `+${num(s.value)}%` : signed(s.value, l.percent);
}

export function maxOf(l: LedgerHead): number {
  return l.attainable ?? l.attainableKnown;
}

/**
 * One stat as an XP bar: the total now against the best attainable with this loadout. A full bar is maxed; the
 * top sources open below it (no information only on hover).
 */
export function Meter({ ledger: l, sources, more }: { ledger: LedgerHead; sources: Source[]; more?: string }) {
  const max = maxOf(l);
  const maxed = l.attainable !== null && l.total >= l.attainable - 1e-9;
  const fill = max > 0 ? Math.min(1, l.total / Math.max(l.total, max)) : 0;
  return (
    <details class={maxed ? "meter maxed" : "meter"}>
      <summary>
        <span class="meter-label">{l.label}</span>
        <span class="meter-value">
          {l.complete ? "" : "at least "}<strong>{amount(l.total, l.percent)}</strong>
          <span class="muted"> of {l.attainable === null ? "≥ " : ""}{amount(max, l.percent)}</span>
          {maxed && <span class="tick" aria-label="maxed"> ✔</span>}
        </span>
        <span class="xp" role="img" aria-label={`${Math.round(fill * 100)}% of attainable`}><span style={{ width: `${fill * 100}%` }} /></span>
      </summary>
      <ul class="sources">
        {sources.map((s, i) => (
          <li key={i}><span>{s.source}<span class="muted small"> {s.category}</span></span><span class="num">{sourceValue(l, s)}</span></li>
        ))}
        {sources.length === 0 && <li class="muted">No counted sources.</li>}
      </ul>
      {more && <p class="small"><a href={more}>Every source on Gear</a></p>}
    </details>
  );
}

export function changes(u: Upgrade): string {
  const parts = Object.entries(u.delta).map(([stat, v]) => `${signed(v)} ${stat}`);
  if (u.cooldownFactor !== 1) parts.push(`ability cooldown ×${num(u.cooldownFactor)}`);
  return parts.join(", ");
}

export function costText(u: Upgrade): string {
  if (u.owned) return u.item.group === "HOTM" ? "Covered by your powder" : "Owned";
  if (u.cost === null) return u.grind ? "Grinding" : "Price unknown";
  return u.cost === 0 ? "Free" : `${coins(u.cost)} coins`;
}

/** An upgrade: icon, name, what it replaces or changes, the gain and the cost; details open below. */
export function UpgradeLine({ u, rank, unit, focus }: { u: Upgrade; rank?: number; unit?: string; focus?: string }) {
  const icon = u.item.modification && u.current ? u.current.id : u.item.id;
  const sub = u.blocked || (u.current ? `${u.item.modification ? "On" : "Replaces"} ${u.current.name}` : changes(u));
  return (
    <details class={u.blocked ? "upgrade blocked" : "upgrade"}>
      <summary>
        <ItemIcon id={icon.startsWith("profile:") ? undefined : icon} />
        <span class="upgrade-name">
          <span>{rank !== undefined && <span class="muted">{rank}. </span>}{u.item.name}</span>
          <span class="muted small">{sub}</span>
        </span>
        <span class="upgrade-gain">{focus ?? `+${num(u.gain)}%`}</span>
        <span class={u.cost === null && !u.owned ? "upgrade-cost muted" : "upgrade-cost"}>{costText(u)}</span>
      </summary>
      <dl class="facts">
        {changes(u) && <><dt>Changes</dt><dd>{changes(u)}</dd></>}
        {u.rateBefore !== null && u.rateAfter !== null && <><dt>Rate</dt><dd>{num(u.rateBefore)} to {num(u.rateAfter)} {unit ?? "per hour"}</dd></>}
        {u.cost !== null && u.costPerUnit !== null && u.gain > 0 && <><dt>Cost per 1%</dt><dd>{coins(u.costPerUnit)} coins</dd></>}
        {u.bestGain !== undefined && u.bestGain !== null && <><dt>In your best method</dt><dd>{u.bestGain > 0 ? `+${num(u.bestGain * 100)}%` : "no rate change"}</dd></>}
        {u.blocked && <><dt>Blocked</dt><dd>{u.blocked}</dd></>}
        <dt>Price</dt><dd>{u.priceSource || u.item.source}</dd>
      </dl>
    </details>
  );
}

/** Coins / hour of every method as bars: the best is diamond blue, the selected one gold; picking a row selects it. */
export function MethodChart({ rows, selected, onPick }: { rows: MethodRow[]; selected: string; onPick: (method: string) => void }) {
  const known = rows.filter((r) => r.totalCoinsPerHour !== null);
  const top = Math.max(1, ...known.map((r) => r.totalCoinsPerHour!));
  const best = known[0]?.method;
  return (
    <ol class="chart">
      {rows.map((r) => {
        const v = r.totalCoinsPerHour;
        const cls = ["chart-row", r.method === best ? "best" : "", r.method === selected ? "selected" : ""].join(" ").trim();
        return (
          <li key={r.method} class={cls}>
            <button type="button" onClick={() => onPick(r.method)} aria-pressed={r.method === selected}>
              <span class="chart-label">{r.label}</span>
              <span class="chart-bar" aria-hidden="true"><span style={{ width: `${v === null ? 0 : (100 * v) / top}%` }} /></span>
              <span class="chart-value">{v === null ? "?" : coins(v)}</span>
            </button>
            <p class="chart-note muted small">
              {r.error ? `Rate unavailable: ${r.error}` : `${r.lowerBound ? "At least " : ""}${num(r.itemsPerHour, (r.itemsPerHour ?? 0) >= 100 ? 0 : 1)} ${r.item} per hour`}
              {r.method === best ? ", the best now" : ""}{r.statsComplete ? "" : "; some stat sources unknown, so a lower bound"}.
            </p>
          </li>
        );
      })}
    </ol>
  );
}
