import { useState } from "preact/hooks";
import { Shell, usePlayer } from "../../player/Shell";
import { ItemIcon } from "../../player/ItemIcon";
import { UpgradeLine } from "../../player/parts";
import { coins, num, type OtherEntry, type Upgrades } from "../../../lib/player";

/** The mod's Upgrades tab: the step-by-step plan, every upgrade ranked by value, and the Other view (guide stage, bonuses the API can't see, progress to grind). */
export default function UpgradesPage() {
  const state = usePlayer<Upgrades>("upgrades");
  const { data: d } = state;
  const [part, setPart] = useState<"buy" | "other">("buy");
  if (!d) return <Shell view="upgrades" state={state} prices god />;
  const unit = d.unit;
  const model = d.rated
    ? `Gains are the change in the ${d.methodLabel} rate (${unit}). Mining Speed counts only when it changes the ticks per block; the ability cooldown counts through uptime.`
    : d.rateModel ? "Gains are the drop multiplier (Fortune × Spread × Pristine): the rate can't be worked out from these stats." : `Gains are the drop multiplier: ${d.methodLabel} has no rate model yet.`;
  const last = d.plan.at(-1);
  return (
    <Shell view="upgrades" state={state} prices god>
      <div class="chips" role="group" aria-label="Upgrades to show">
        <button type="button" aria-pressed={part === "buy"} onClick={() => setPart("buy")}>Purchases</button>
        <button type="button" aria-pressed={part === "other"} onClick={() => setPart("other")}>Other and progress</button>
      </div>
      {part === "buy" ? (
        !d.api.inventory ? (
          <p class="muted">Gear advice needs the Inventory API. Turn it on, then look again after a few minutes.</p>
        ) : (
          <div class="grid-2">
            <section class="panel" aria-labelledby="plan-title">
              <h2 id="plan-title">Step-by-step plan</h2>
              <p class="muted small">Take the best value, apply it, work everything out again, repeat. Upgrades without a price and blocked ones are skipped. Owned materials are used first; costs are what you pay, without selling what an upgrade replaces.</p>
              {last ? (
                <p>All {d.plan.length} steps: <strong class="gain">+{num(last.totalGain)}%</strong> for <strong class="coins">{coins(last.totalCost)}</strong> coins{last.rate !== null && <>, ending at {num(last.rate)} {unit}</>}.</p>
              ) : <p class="muted">No priced upgrade to plan with. That does not mean the account is maxed.</p>}
              {d.bestMethod && <p class="muted small">{d.bestMethod.id === d.method ? `${d.methodLabel} is your best method by coins per hour.` : `Your best method by coins per hour is ${d.bestMethod.label}; each upgrade shows its value there too.`}</p>}
              {d.plan.map((s, i) => (
                <div key={i}>
                  <UpgradeLine u={s.upgrade} rank={i + 1} unit={unit} />
                  <p class="step-total muted small">Total so far +{num(s.totalGain)}% for {coins(s.totalCost)} coins{s.rate !== null ? `, ${num(s.rate)} ${unit}` : ""}.</p>
                </div>
              ))}
            </section>
            <section class="panel" aria-labelledby="ranked-title">
              <h2 id="ranked-title">All upgrades, best value first</h2>
              <p class="muted small">{model} Each one is compared with your current setup: they are alternatives, not a shopping list.</p>
              <p class="small">{d.ranked.length} found.</p>
              {d.ranked.map((u, i) => <UpgradeLine key={i} u={u} rank={i + 1} unit={unit} />)}
              {d.ranked.length === 0 && <p class="muted">No supported upgrades found. That does not mean the account is maxed.</p>}
            </section>
          </div>
        )
      ) : (
        <Other d={d} model={model} />
      )}
    </Shell>
  );
}

function Other({ d, model }: { d: Upgrades; model: string }) {
  const o = d.other;
  return (
    <div class="grid-2">
      <section class="panel span-2" aria-labelledby="stage-title">
        <h2 id="stage-title">Guide stage: {o.stage.name}</h2>
        <p>From {o.stage.because.join(", ")}. {o.stage.next}</p>
        <details class="hidden-sources">
          <summary class="small">Checklist items ({o.stage.nextItems.length})</summary>
          <ul class="small notes">{o.stage.nextItems.map((n, i) => <li key={i} class={n.endsWith("(you own one)") ? "owned" : ""}>{n}</li>)}</ul>
        </details>
        <p class="muted small">Placed on the community early, mid and end mining checklist by its stage headings only (HOTM tier, Divan armor, drill, Pendant). It is for orientation, not a fixed order.</p>
      </section>
      <section class="panel" aria-labelledby="unchecked-title">
        <h2 id="unchecked-title">Can't be checked: skip what you have</h2>
        <p class="muted small">Permanent bonuses the profile API never shows. A missing one is not proof you lack it. Price: the buy quote for the whole amount. {o.rated ? "" : model}</p>
        {o.unchecked.length === 0 && <p class="muted">No such bonus changes {d.methodLabel}.</p>}
        {o.hidden > 0 && <p class="muted small">{o.hidden} other bonus{o.hidden > 1 ? "es don't" : " doesn't"} change {d.methodLabel}.</p>}
        {o.unchecked.map((e) => <OtherLine key={e.id} e={e} right={e.cost === null ? "Price unknown" : `${coins(e.cost)} coins`} d={d} />)}
      </section>
      <section class="panel" aria-labelledby="grind-title">
        <h2 id="grind-title">Progress you grind for</h2>
        <p class="muted small">HOTM perks, tokens and tiers, Mining skill, collections, pet levels, Compact and forge-only items, ranked by the gain alone.</p>
        {!d.api.inventory && <p class="warn small">Inventory API off: Compact and forge-only items need your gear.</p>}
        {o.grinding.length === 0 && <p class="muted">Nothing to grind that changes {d.methodLabel}.</p>}
        {o.grinding.map((e, i) => <OtherLine key={e.id} e={e} rank={i + 1} right={e.distance} d={d} />)}
      </section>
    </div>
  );
}

function OtherLine({ e, right, rank, d }: { e: OtherEntry; right: string; rank?: number; d: Upgrades }) {
  const forge = e.id.startsWith("forge:");
  return (
    <details class="upgrade">
      <summary>
        <ItemIcon id={e.id} />
        <span class="upgrade-name">
          <span>{rank !== undefined && <span class="muted">{rank}. </span>}{e.name}</span>
          <span class="muted small">{e.effect}</span>
        </span>
        <span class="upgrade-gain">{e.gain === null ? <span class="muted">not modelled</span> : `+${num(e.gain)}%`}</span>
        <span class={right === "Ready" ? "upgrade-cost gain" : "upgrade-cost"}>{right}</span>
      </summary>
      <dl class="facts">
        <dt>Gain</dt><dd>{e.gain === null ? "not modelled" : `+${num(e.gain)}% in ${d.methodLabel}`}</dd>
        {e.requirement && <><dt>Needs</dt><dd>{e.requirement}</dd></>}
        {e.distance && <><dt>Now</dt><dd>{e.distance}</dd></>}
        {e.how && <><dt>How</dt><dd>{e.how}</dd></>}
        {(e.cost !== null || forge) && <><dt>{forge ? "Missing materials" : "Price"}</dt><dd>{e.cost === null ? "price unknown" : `${coins(e.cost)} coins`}</dd></>}
        {e.note && <><dt>Note</dt><dd>{e.note}</dd></>}
      </dl>
    </details>
  );
}
