import { Shell, usePlayer } from "../../player/Shell";
import { MethodChart } from "../../player/parts";
import { abilityText, coins, num, type DropValue, type Methods } from "../../../lib/player";

const ticks = (t: number) => (t === 1 ? "instamine" : `${t} ticks`);

/** The mod's Methods tab (without the session tracker, which needs the game): coins / hour of every method and the selected method's rate in detail. */
export default function MethodsPage() {
  const state = usePlayer<Methods>("methods");
  const { data: d, update } = state;
  if (!d) return <Shell view="methods" state={state} prices god />;
  const x = d.detail;
  const mode = d.priceModes.find((m) => m.id === d.priceMode);
  return (
    <Shell view="methods" state={state} prices god>
      <div class="grid-2">
        <section class="panel" aria-labelledby="rate-title">
          <h2 id="rate-title">{d.methodLabel}: rate</h2>
          {!x.supported ? <p class="muted">No rate model for this method yet.</p> : x.error ? <p class="warn">{x.error}</p> : x.kind === "gem" && x.gem ? (
            <>
              <p class="big-number"><strong>{num(x.gem.flawlessPerHour)}</strong> {x.gem.gem.name.split(" ")[0]} Flawless per hour</p>
              <Coins d={d} />
              <dl class="facts">
                <dt>Efficiency</dt><dd>{num(d.efficiency)}%</dd>
                <dt>Blocks per hour</dt><dd>{num(x.gem.blocksPerHour, 0)}</dd>
                <dt>Rough per block</dt><dd>{num(x.gem.roughPerBlock)}</dd>
                <dt>Mining Speed</dt><dd>{num(x.gem.speed)}: {ticks(x.gem.ticks)}{x.gem.uptime > 0 && <>; {ticks(x.gem.boostedTicks)} during the ability ({num(x.gem.uptime * 100, 1)}% uptime)</>}</dd>
                {x.nextTick !== null && x.nextTick !== undefined && <><dt>Next tick</dt><dd>{num(x.nextTick)} Mining Speed ({ticks(x.nextTicks ?? 0)}); speed between thresholds adds nothing</dd></>}
                <dt>Tool</dt><dd>{x.tool || "none readable"}</dd>
                <dt>Zone</dt><dd>{x.zone || "none"}</dd>
                <dt>Ability</dt><dd>{abilityText(x.ability)}</dd>
                {x.gem.kept < 1 && <><dt>Heat or Cold</dt><dd>{num(x.gem.kept * 100, 1)}% of the rate kept</dd></>}
                <dt>Block</dt><dd>{x.gem.gem.name}, strength {num(x.gem.gem.strength)}</dd>
                <dt>Guide reference</dt><dd>{num(x.gem.gem.guideFlawlessPerHour)} Flawless per hour ({x.gem.gem.guideNote}, {num(x.gem.gem.guideEfficiency)}% efficiency)</dd>
              </dl>
              <Secondary drops={x.secondary ?? []} />
              <Assumptions list={x.gem.assumptions} />
            </>
          ) : x.block ? (
            <>
              <p class="big-number"><strong>{coins(x.perWindow ?? x.block.perHour)}</strong> {x.block.block.unit} per {x.block.windowHours === 1 ? "hour" : x.block.block.abilityCycle ? `ability cycle (${num(x.block.windowHours * 3600, 0)} s)` : x.block.block.window}</p>
              {x.block.windowHours !== 1 && <p>{num(x.block.perHour, 0)} per hour.</p>}
              <Coins d={d} />
              <dl class="facts">
                <dt>Efficiency</dt><dd>{num(d.efficiency)}%</dd>
                <dt>Blocks per hour</dt><dd>{num(x.block.blocksPerHour, 0)}</dd>
                <dt>{x.block.block.unit} per block</dt><dd>{num(x.block.dropsPerBlock)}</dd>
                <dt>Mining Speed</dt><dd>{num(x.block.speed)}: {ticks(x.block.groundTicks)} on the ground, {ticks(x.block.airTicks)} airborne{x.block.uptime > 0 && <>; {ticks(x.block.boostedGroundTicks)} / {ticks(x.block.boostedAirTicks)} during the ability ({num(x.block.uptime * 100, 1)}% uptime)</>}</dd>
                {x.nextGround !== null && x.nextGround !== undefined && <><dt>Next threshold</dt><dd>{num(x.nextGround)} on the ground; speed between thresholds adds nothing</dd></>}
                {(x.nextGround === null || x.nextGround === undefined) && x.nextAir !== undefined && <><dt>Next threshold</dt><dd>{num(x.nextAir)} airborne</dd></>}
                {x.instamineInAbility !== undefined && <><dt>Instamine in the ability</dt><dd>{num(x.instamineInAbility)} Mining Speed</dd></>}
                <dt>Tool</dt><dd>{x.tool || "none readable"}</dd>
                <dt>Zone</dt><dd>{x.zone || "none"}</dd>
                <dt>Ability</dt><dd>{abilityText(x.ability)}</dd>
                {x.block.kept < 1 && <><dt>Heat or Cold</dt><dd>{num(x.block.kept * 100, 1)}% of the rate kept</dd></>}
                <dt>Block</dt><dd>{x.block.block.name}{x.block.block.strength > 0 ? `, strength ${num(x.block.block.strength)}` : ", strength not listed (assumed instamined)"}</dd>
                <dt>Guide reference</dt><dd>{x.block.block.guideNote}</dd>
              </dl>
              <Secondary drops={x.secondary ?? []} />
              <Assumptions list={x.block.assumptions} />
            </>
          ) : null}
        </section>

        <section class="panel" aria-labelledby="same-title">
          <h2 id="same-title">Same change, different value</h2>
          <p class="muted small">What +50 Mining Fortune and +100 Mining Speed are worth on each method's own stats.</p>
          <table class="table compact">
            <thead><tr><th>Method</th><th class="num">+50 Fortune</th><th class="num">+100 Speed</th></tr></thead>
            <tbody>
              {d.sameChange.map((s) => (
                <tr key={s.method} class={s.method === d.method ? "current" : ""}>
                  <td>{s.label}</td>
                  <td class="num" data-label="+50 Fortune">{gain(s.fortune, s.coinsPerHour)}</td>
                  <td class="num" data-label="+100 Speed">{gain(s.speed, s.coinsPerHour)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section class="panel span-2" aria-labelledby="chart-title">
          <h2 id="chart-title">Coins per hour by method</h2>
          <p class="muted small">
            At the {mode?.label} price ({mode?.meaning}). Each method uses its best owned gear and tool in its usual zone at its default efficiency.
            A missing price stays unknown and sorts last. Bazaar figures are before tax. Not counted: Hard Stone, the grotto's other gems, mineshaft loot, crafting into enchanted items.
          </p>
          <MethodChart rows={d.comparison.rows} selected={d.method} onPick={(method) => update({ method })} />
        </section>
      </div>
      <p class="muted small">The session tracker (measured rate while you mine) is in the mod only: it reads your inventory and chat live.</p>
    </Shell>
  );
}

function gain(g: number | null, perHour: number | null): string {
  if (g === null) return "?";
  if (g <= 0) return "+0%";
  return `+${num(g * 100)}%${perHour === null ? "" : ` (${coins(g * perHour)}/h)`}`;
}

function Coins({ d }: { d: Methods }) {
  return (
    <ul class="sources">
      {(d.detail.coins ?? []).map((c) => (
        <li key={c.mode} class={c.mode === d.priceMode ? "current" : ""}>
          <span>Coins per hour, {c.label}<span class="muted small">{c.each === null ? "" : ` ${num(c.each, c.each >= 100 ? 0 : 2)} each. ${c.source}`}</span></span>
          <span class="num">{c.perHour === null ? "unknown" : coins(c.perHour)}</span>
        </li>
      ))}
    </ul>
  );
}

function Secondary({ drops }: { drops: DropValue[] }) {
  if (drops.length === 0) return null;
  return (
    <>
      <h3>Other drops</h3>
      <ul class="sources">
        {drops.map((v, i) => (
          <li key={i}>
            <span>{v.drop.name}<span class="muted small"> {v.drop.perHour === null ? "amount unknown" : `${num(v.drop.perHour, 1)} ${v.drop.unit} per hour`}. {v.drop.source}{v.note ? ` ${v.note}` : ""}</span></span>
            <span class="num">{v.coinsPerHour === null ? (v.drop.perHour === null ? "not counted" : "coins unknown") : `${v.atLeast ? "≥ " : ""}${coins(v.coinsPerHour)}/h`}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Assumptions({ list }: { list: string[] }) {
  if (list.length === 0) return null;
  return (
    <details class="hidden-sources">
      <summary class="small">Assumptions ({list.length})</summary>
      <ul class="small notes">{list.map((a, i) => <li key={i}>{a}</li>)}</ul>
    </details>
  );
}
