import { useState } from "preact/hooks";
import { Shell, usePlayer } from "../../player/Shell";
import { ItemIcon } from "../../player/ItemIcon";
import { maxOf, sourceValue } from "../../player/parts";
import { abilityText, amount, num, type Gear, type Ledger, type Source } from "../../../lib/player";

/** Where a source's category goes in the stat bar (the mod's buckets). */
function bucket(category: string): string {
  switch (category) {
    case "Armor": case "Equipment": case "Tool": case "Accessory": case "Gear": case "Gemstone": return "Gear";
    case "HOTM": case "Powder": return "HOTM";
    case "Skill": return "Skill";
    case "Pet": return "Pet";
    default: return "Other";
  }
}
const BUCKETS = ["Gear", "HOTM", "Skill", "Pet", "Other"];
const STATE: Record<Source["state"], string> = {
  COUNTED: "counted",
  SITUATIONAL: "situational",
  MISSING: "missing",
  TEMPORARY: "temporary",
  UNTRACKABLE: "not in the API",
};

/** The mod's Gear tab: every stat itemized by source, the total now against what this loadout can reach. */
export default function GearPage() {
  const state = usePlayer<Gear>("gear");
  const { data: d, update } = state;
  const [group, setGroup] = useState("Method");
  if (!d) return <Shell view="gear" state={state} god />;
  const groups = ["Method", ...Object.keys(d.groups), "All"];
  const shown = group === "All" ? d.ledgers : d.ledgers.filter((l) => (group === "Method" ? d.relevant : d.groups[group] ?? []).includes(l.stat));
  return (
    <Shell view="gear" state={state} god>
      <div class="grid-2">
        <section class="panel" aria-labelledby="loadout-title">
          <h2 id="loadout-title">{d.bestGear ? "Best gear you own" : "Gear worn now"}</h2>
          <div class="chips" role="group" aria-label="Gear to count">
            <button type="button" aria-pressed={d.bestGear} onClick={() => update({ gear: "" })}>Best owned</button>
            <button type="button" aria-pressed={!d.bestGear} onClick={() => update({ gear: "equipped" })}>Worn now</button>
          </div>
          <ul class="loadout">
            {d.loadout.map((p) => (
              <li key={p.key}><ItemIcon id={p.id} /><span>{p.name}<span class="muted small"> {p.location}</span></span></li>
            ))}
          </ul>
          <p class="muted small">
            {d.accessories} accessories from the accessory bag, one per family. {d.hotmTree}{d.hotmTrees > 1 ? ` of ${d.hotmTrees} (Loadouts), the best for ${d.methodLabel}; the API does not say which is active` : ""}.
            Pickaxe ability: {abilityText(d.ability)}.
            {d.bestGear && " Picked from all readable storage: equip these to reach the totals."}
          </p>
        </section>
        <section class="panel" aria-labelledby="how-title">
          <h2 id="how-title">How to read this</h2>
          <p class="small">Each stat shows the total now and the most this gear, tool, pet and HOTM tree can reach, with every source at its own maximum plus missing attributes, essence perks, collections and consumables. It is not a maxed account.</p>
          <p class="small">Sources that do not count right now (another zone, a temporary buff, something not unlocked, or data the API never sends) are listed under each stat but left out of the total.</p>
          <ul class="legend small">
            {BUCKETS.map((b) => <li key={b}><span class={`swatch b-${b.toLowerCase()}`} aria-hidden="true" />{b}</li>)}
          </ul>
        </section>
      </div>

      <div class="chips" role="group" aria-label="Stats to show">
        {groups.map((g) => (
          <button type="button" key={g} aria-pressed={group === g} onClick={() => setGroup(g)}>{g === "Method" ? d.methodLabel : g}</button>
        ))}
      </div>
      <div class="ledgers">
        {shown.map((l) => <StatCard key={l.stat} l={l} d={d} />)}
        {shown.length === 0 && <p class="muted">No stats in this group.</p>}
      </div>
    </Shell>
  );
}

function StatCard({ l, d }: { l: Ledger; d: Gear }) {
  const max = maxOf(l);
  const maxed = l.attainable !== null && l.total >= l.attainable - 1e-9;
  const counted = l.sources.filter((s) => s.state === "COUNTED" && s.value !== null).sort((a, b) => Math.abs(b.share ?? 0) - Math.abs(a.share ?? 0));
  const unknown = l.sources.filter((s) => s.state === "COUNTED" && s.value === null);
  const hidden = l.sources.filter((s) => s.state !== "COUNTED");
  // Segments: what each bucket adds; the cooldown's multiplicative parts are scaled to its total.
  const sums = new Map<string, number>(BUCKETS.map((b) => [b, 0]));
  let sum = 0;
  for (const s of counted) { sums.set(bucket(s.category), sums.get(bucket(s.category))! + (s.share ?? 0)); sum += s.share ?? 0; }
  const factor = l.stat === "PICKAXE_ABILITY_COOLDOWN" && sum > 0 ? l.total / sum : 1;
  const scale = Math.max(l.total, max, 1e-9);
  const hiddenCounts = new Map<string, number>();
  for (const s of hidden) hiddenCounts.set(STATE[s.state], (hiddenCounts.get(STATE[s.state]) ?? 0) + 1);
  const relevant = d.relevant.includes(l.stat);
  return (
    <article class={relevant ? "panel stat-card relevant" : "panel stat-card"} aria-labelledby={`stat-${l.stat}`}>
      <header class="stat-head">
        <h3 id={`stat-${l.stat}`}>{l.label}</h3>
        <p class="meter-value">
          {l.complete ? "" : "at least "}<strong>{amount(l.total, l.percent)}</strong>
          <span class="muted"> of {l.attainable === null ? "≥ " : ""}{amount(max, l.percent)}</span>
          {maxed && <span class="tick"> ✔</span>}
        </p>
      </header>
      <div class="split" role="img" aria-label={BUCKETS.filter((b) => Math.abs(sums.get(b)!) > 1e-9).map((b) => `${b} ${amount(sums.get(b)! * factor, l.percent)}`).join(", ") || "No counted sources"}>
        {BUCKETS.map((b) => {
          const v = sums.get(b)! * factor;
          return v > 1e-9 ? <span key={b} class={`b-${b.toLowerCase()}`} style={{ width: `${(100 * v) / scale}%` }} /> : null;
        })}
      </div>
      <p class="muted small">
        {l.stat === "PICKAXE_ABILITY_COOLDOWN" ? <>Reductions multiply. Sum of the parts: {amount(l.flat, true)}.</> : <>Flat {amount(l.flat, l.percent)}{l.multiplier !== 1 && <>, ×{num(l.multiplier, 3)} from additive % sources</>}.</>}
        {d.bestGear && l.equipped !== null && <> Wearing now: {amount(l.equipped, l.percent)}.</>}
        {!d.bestGear && l.bestOwned !== null && <> With the best owned gear: {amount(l.bestOwned, l.percent)}.</>}
        {l.attainable === null && l.unknownMaxima > 0 && <> {l.unknownMaxima} counted source{l.unknownMaxima === 1 ? " has" : "s have"} no known maximum.</>}
      </p>
      {!l.complete && <p class="warn small">A lower bound: some counted sources have unknown values.</p>}
      {l.stat === "BREAKING_POWER" && d.breakingPower !== null && l.total < d.breakingPower && <p class="warn small">{d.methodLabel} needs Breaking Power {d.breakingPower}: not met with this tool.</p>}
      <ul class="sources">
        {counted.map((s, i) => <SourceRow key={i} l={l} s={s} />)}
        {unknown.map((s, i) => (
          <li key={`u${i}`}><span>{s.source}<span class="muted small"> {s.category}{s.note ? `. ${s.note}` : ""}</span></span><span class="num warn">?</span></li>
        ))}
      </ul>
      {hidden.length > 0 && (
        <details class="hidden-sources">
          <summary class="small">{[...hiddenCounts].map(([k, n]) => `${n} ${k}`).join(", ")}, not in the total</summary>
          <ul class="sources">
            {hidden.map((s, i) => (
              <li key={i} class={`state-${s.state.toLowerCase()}`}>
                <span>{s.source}<span class="muted small"> {STATE[s.state]}, {s.category}{s.condition ? `. ${s.condition}` : ""}{s.note ? `. ${s.note}` : ""}</span></span>
                <span class="num">{s.value === null ? "?" : sourceValue(l, s)}{s.maximum !== null && <span class="muted"> / {s.additive ? `${num(s.maximum)}%` : amount(s.maximum, l.percent)}</span>}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
      {l.notes.length > 0 && (
        <details class="hidden-sources">
          <summary class="small">Notes ({l.notes.length})</summary>
          <ul class="small notes">{l.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
        </details>
      )}
    </article>
  );
}

function SourceRow({ l, s }: { l: Ledger; s: Source }) {
  const known = s.maximum !== null;
  const maxed = known && s.maximum! > 0 && (s.value ?? 0) >= s.maximum! - 1e-9;
  const max = !known ? "" : s.additive ? `${num(s.maximum)}%` : amount(s.maximum, l.percent);
  return (
    <li>
      <span>
        <span class={`dot b-${bucket(s.category).toLowerCase()}`} aria-hidden="true" />
        {s.source}
        <span class="muted small"> {s.category}{s.confidence === "MANUAL" ? " (assumed)" : ""}{s.condition ? `. ${s.condition}` : ""}</span>
      </span>
      <span class={maxed ? "num maxed" : "num"}>
        {sourceValue(l, s)}
        {maxed ? " ✔" : known && s.maximum! > (s.value ?? 0) + 1e-9 ? <span class="muted"> / {max}</span> : null}
      </span>
    </li>
  );
}
