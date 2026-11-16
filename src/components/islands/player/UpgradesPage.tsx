import { useState } from "preact/hooks";
import { Shell, usePlayer } from "../../player/Shell";
import { ItemIcon } from "../../player/ItemIcon";
import { Head, UpgradeLine } from "../../player/parts";
import { coins, num, type OtherEntry, type Upgrades } from "../../../lib/player";

/** The mod's Upgrades tab: the step-by-step plan, every upgrade ranked by value, and the Other view (guide stage, bonuses the API can't see, progress to grind). */
export default function UpgradesPage() {
  const state = usePlayer<Upgrades>("upgrades");
  const { data: d } = state;
  const [part, setPart] = useState<"buy" | "other">("buy");
  if (!d) return <Shell view="upgrades" state={state} prices cost god />;
  const unit = d.unit;
  const model = d.rated
    ? `Gain = change in the ${d.methodLabel} rate (${unit}). Mining Speed counts only when it changes ticks per block; cooldown counts through uptime.`
    : d.rateModel ? "Gain = drop multiplier (Fortune × Spread × Pristine); no rate from these stats." : `Gain = drop multiplier; no rate model for ${d.methodLabel} yet.`;
  const last = d.plan.at(-1);
  return (
    <Shell view="upgrades" state={state} prices cost god>
      <div class="chips" role="group" aria-label="Upgrades to show">
        <button type="button" aria-pressed={part === "buy"} onClick={() => setPart("buy")}>Purchases</button>
        <button type="button" aria-pressed={part === "other"} onClick={() => setPart("other")}>Other</button>
      </div>
      {part === "buy" ? (
        !d.api.inventory ? (
          <p class="muted">Needs Inventory API.</p>
        ) : (
          <div class="grid-2">
            <section class="panel" aria-labelledby="plan-title">
              <Head id="plan-title" info="Best value first, then recompute and repeat. Unpriced and blocked upgrades are skipped. Owned materials are used first; costs don't subtract selling what gets replaced.">Plan</Head>
              {last ? (
                <p>{d.plan.length} steps: <strong class="gain">+{num(last.totalGain)}%</strong> for <strong class="coins">{coins(last.totalCost)}</strong>{last.rate !== null && <> → {num(last.rate)} {unit}</>}</p>
              ) : <p class="muted">No priced upgrade.</p>}
              {d.bestMethod && d.bestMethod.id !== d.method && <p class="muted small">Best method: {d.bestMethod.label}</p>}
              {d.plan.map((s, i) => (
                <div key={i}>
                  <UpgradeLine u={s.upgrade} rank={i + 1} unit={unit} />
                  <p class="step-total muted small">Σ +{num(s.totalGain)}% · {coins(s.totalCost)}{s.rate !== null ? ` · ${num(s.rate)} ${unit}` : ""}</p>
                </div>
              ))}
            </section>
            <section class="panel" aria-labelledby="ranked-title">
              <Head id="ranked-title" info={`${model} Each is compared with your current setup: alternatives, not a shopping list.`}>All upgrades <span class="count">{d.ranked.length}</span></Head>
              {d.ranked.map((u, i) => <UpgradeLine key={i} u={u} rank={i + 1} unit={unit} />)}
              {d.ranked.length === 0 && <p class="muted">None found.</p>}
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
        <Head id="stage-title" info="Placed on the community early/mid/end mining checklist by its stage headings only (HOTM tier, Divan armor, drill, Pendant). For orientation, not a fixed order.">Stage: {o.stage.name}</Head>
        <p>From {o.stage.because.join(", ")}. {o.stage.next}</p>
        <details class="hidden-sources">
          <summary class="small">Checklist items ({o.stage.nextItems.length})</summary>
          <ul class="small notes">{o.stage.nextItems.map((n, i) => <li key={i} class={n.endsWith("(you own one)") ? "owned" : ""}>{n}</li>)}</ul>
        </details>
      </section>
      <section class="panel" aria-labelledby="unchecked-title">
        <Head id="unchecked-title" info={`Permanent bonuses the API never shows; skip what you have. Price: buy quote for the whole amount. ${o.rated ? "" : model}`}>Not in the API</Head>
        {o.unchecked.length === 0 && <p class="muted">None for {d.methodLabel}.</p>}
        {o.hidden > 0 && <p class="muted small">+{o.hidden} not affecting {d.methodLabel}</p>}
        {o.unchecked.map((e) => <OtherLine key={e.id} e={e} right={e.cost === null ? "Price unknown" : `${coins(e.cost)} coins`} d={d} />)}
      </section>
      <section class="panel" aria-labelledby="grind-title">
        <Head id="grind-title" info="HOTM perks, tokens and tiers, Mining skill, collections, pet levels, Compact and forge-only items, ranked by gain alone.">Grind</Head>
        {!d.api.inventory && <p class="warn small">Inventory API off: Compact and forge items skipped.</p>}
        {o.grinding.length === 0 && <p class="muted">Nothing for {d.methodLabel}.</p>}
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
        <ItemIcon id={d.otherIcons?.[e.id] || e.id} />
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
