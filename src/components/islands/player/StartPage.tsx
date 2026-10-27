import { Shell, usePlayer } from "../../player/Shell";
import { ItemIcon } from "../../player/ItemIcon";
import { abilityText, coins, num, signed, type Start } from "../../../lib/player";

const SLOTS = ["Helmet", "Chestplate", "Leggings", "Boots", "Necklace", "Cloak", "Belt", "Gloves", "Bracelet"];
const order = (slot: string) => { const n = SLOTS.indexOf(slot); return n >= 0 ? n : slot === "Pet" ? SLOTS.length + 1 : slot === "Accessory" ? SLOTS.length + 2 : SLOTS.length; };

function percent(before: number | null, after: number | null): string {
  if (before === null || after === null || before <= 0) return "?";
  return `${after >= before ? "+" : "−"}${num(Math.abs((after / before - 1) * 100))}%`;
}

/** The mod's Start with view: the best gear the player owns for the method, where each piece is stored, and the swaps from what is worn. */
export default function StartPage() {
  const state = usePlayer<Start>("start");
  const { data: d } = state;
  if (!d) return <Shell view="start" state={state} prices god />;
  const before = d.current?.rate ?? null, after = d.bestOwned?.rate ?? null;
  const rate = (r: number | null) => r === null ? "rate unavailable" : `${d.lowerBound ? "at least " : ""}${num(r)} ${d.unit} per hour${d.coinsEach === null ? "" : `, ${coins(r * d.coinsEach)} coins`}`;
  const pieces = [...d.best].sort((a, b) => order(a.slot) - order(b.slot));
  return (
    <Shell view="start" state={state} prices god>
      <div class="grid-2">
        <section class="panel" aria-labelledby="best-title">
          <h2 id="best-title">Use this for {d.methodLabel}</h2>
          {d.swaps.length === 0
            ? <p class="gain"><strong>{d.inventoryKnown ? "You already wear the best you own." : "No swaps found in the readable data."}</strong></p>
            : <p><strong>{d.swaps.length} swap{d.swaps.length === 1 ? "" : "s"}</strong> from what you wear: <strong class="gain">{percent(before, after)}</strong> rate.</p>}
          <dl class="facts">
            <dt>Now</dt><dd>{rate(before)}</dd>
            <dt>Best owned</dt><dd>{rate(after)}</dd>
          </dl>
          {!d.inventoryKnown && <p class="warn small">Inventory API off: only the pet can be compared.</p>}
          {!d.petsKnown && <p class="warn small">No pet data in the API response.</p>}
          {(d.current && !d.current.complete) || (d.bestOwned && !d.bestOwned.complete) ? <p class="muted small">Some stat sources are unknown, so these rates are lower bounds.</p> : null}
          <ul class="pieces">
            {pieces.map((p) => (
              <li key={p.key} class={p.worn ? "worn" : "fetch"}>
                <ItemIcon id={p.id} />
                <span>
                  <span>{p.name}</span>
                  <span class="muted small">{p.slot}{p.detail ? `, ${p.detail}` : ""}. {p.worn ? "Wearing it." : `Stored: ${p.location}.`}</span>
                </span>
              </li>
            ))}
            {pieces.length === 0 && <li class="muted">{d.inventoryKnown ? "No readable mining gear." : "Ownership unknown."}</li>}
          </ul>
          <p class="muted small">
            One copy per slot from all readable storage, one tool, one pet, one accessory per family.
            {d.otherAccessories > 0 && ` ${d.otherAccessories} other accessories add no ${d.methodLabel} stats.`}
            {` ${d.hotmTree}`}{d.hotmTrees > 1 ? ` of ${d.hotmTrees} in Loadouts is the best here; the API does not say which is active.` : "."}
          </p>
        </section>

        <section class="panel" aria-labelledby="swaps-title">
          <h2 id="swaps-title">Swaps, biggest gain first</h2>
          <p class="muted small">Each swap is rated alone on what you wear now; together they give the total above, which can differ from the sum.</p>
          {d.swaps.length === 0 && <p class="muted">Nothing to swap.</p>}
          {d.swaps.map((s, i) => (
            <details class="upgrade" key={i}>
              <summary>
                <ItemIcon id={s.to.id} />
                <span class="upgrade-name">
                  <span>{s.slot}: {s.to.name}</span>
                  <span class="muted small">{s.slot === "HOTM tree" ? "Switch to it in Loadouts" : `From ${s.to.location}`}</span>
                </span>
                <span class="upgrade-gain">{percent(before, s.rate)}</span>
                <span class="upgrade-cost muted">{s.from ? `was ${s.from.name}` : "empty slot"}</span>
              </summary>
              <dl class="facts">
                {Object.keys(s.delta).length > 0 && <><dt>Changes</dt><dd>{Object.entries(s.delta).map(([k, v]) => `${signed(v)} ${k}`).join(", ")}</dd></>}
                {s.ability && <><dt>Tool ability</dt><dd>{abilityText(s.ability)}</dd></>}
                <dt>Rate after</dt><dd>{rate(s.rate)}</dd>
                {s.slot === "Accessory" && <><dt>How</dt><dd>Put it in your accessory bag{s.from ? `, in place of ${s.from.name} (same family)` : ""}.</dd></>}
              </dl>
            </details>
          ))}
          <h3>Best method with what you wear</h3>
          <p>{d.wornBest ? <>{d.wornBest.label}, about <strong class="coins">{coins(d.wornBest.coinsPerHour)}</strong> coins per hour.</> : <span class="muted">No method has a known price.</span>}</p>
          {d.notes.length > 0 && (
            <details class="hidden-sources">
              <summary class="small">Notes ({d.notes.length})</summary>
              <ul class="small notes">{d.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
            </details>
          )}
        </section>
      </div>
    </Shell>
  );
}
