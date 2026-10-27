import { Shell, usePlayer } from "../../player/Shell";
import { ItemIcon } from "../../player/ItemIcon";
import { Meter, UpgradeLine, MethodChart } from "../../player/parts";
import { PlayerModel } from "../../player/PlayerModel";
import { coins, num, pageUrl, type Overview } from "../../../lib/player";

/** The mod's Home tab: the method's stats against what this gear can reach, the rate now, the best next upgrade and coins / hour by method. */
export default function OverviewPage() {
  const state = usePlayer<Overview>("overview");
  const { data: d, q, update } = state;
  return (
    <Shell view="overview" state={state} prices god>
      {d && q && (
        <div class="grid-2">
          <section class="panel" aria-labelledby="stats-title">
            <h2 id="stats-title">Stats for {d.methodLabel}</h2>
            <p class="muted small">Each bar is the total now against the most this gear, tool, pet and HOTM tree can reach. {d.tool ? <>Tool: {d.tool}.</> : <>No mining tool found.</>}</p>
            {d.stats.map((s) => <Meter key={s.stat} ledger={s} sources={s.top} more={pageUrl({ ...q, view: "gear" })} />)}
          </section>

          <div class="stack">
            <section class="panel" aria-labelledby="model-title">
              <h2 id="model-title" class="visually-hidden">{d.player} in their armor</h2>
              <PlayerModel data={d} />
            </section>
            <section class="panel" aria-labelledby="rate-title">
              <h2 id="rate-title">Rate now</h2>
              {d.rate.perHour === null ? (
                <p class="muted">{d.rate.error ?? (d.rate.supported ? "The rate can't be worked out from these stats." : `${d.methodLabel} has no rate model yet.`)}</p>
              ) : (
                <>
                  <p class="big-number">
                    <strong>{d.rate.lowerBound ? "≥ " : ""}{num(d.rate.perHour, d.rate.perHour < 100 ? 2 : 0)}</strong> {d.rate.unit} per hour
                  </p>
                  <p>{d.rate.coinsPerHour === null ? <span class="muted">Coins per hour unknown: no price for {d.rate.unit}.</span> : <>About <strong class="coins">{coins(d.rate.coinsPerHour)}</strong> coins per hour at {num(d.rate.coinsEach, (d.rate.coinsEach ?? 0) >= 100 ? 0 : 2)} each.</>}</p>
                  <p class="muted small">{num(d.efficiency)}% efficiency, {d.rate.model}. {d.rate.window[0]?.toUpperCase()}{d.rate.window.slice(1)}. <a href={pageUrl({ ...q, view: "methods" })}>Rate details</a></p>
                </>
              )}
            </section>

            <section class="panel" aria-labelledby="next-title">
              <h2 id="next-title">Best next upgrade</h2>
              {!d.api.inventory ? (
                <p class="muted">Turn on the Inventory API for upgrade advice.</p>
              ) : d.next === null ? (
                <p class="muted">No priced upgrade found. That does not mean the account is maxed: upgrades without a price are skipped.</p>
              ) : (
                <>
                  <UpgradeLine u={d.next.upgrade} />
                  <p class="small"><a href={pageUrl({ ...q, view: "upgrades" })}>The whole plan</a></p>
                </>
              )}
            </section>
          </div>

          <section class="panel span-2" aria-labelledby="methods-title">
            <h2 id="methods-title">Coins per hour by method</h2>
            <p class="muted small">Each method with its best owned gear and tool in its usual zone{d.comparison.godPotion ? ", with a God Potion" : ""}. Pick a row to switch the method.</p>
            <MethodChart rows={d.comparison.rows} selected={d.method} onPick={(method) => update({ method })} />
          </section>

          {d.loadout.length > 0 && (
            <section class="panel span-2" aria-labelledby="loadout-title">
              <h2 id="loadout-title">Gear these numbers use</h2>
              <ul class="loadout">
                {d.loadout.map((p) => (
                  <li key={p.key}><ItemIcon id={p.id} /><span>{p.name}<span class="muted small"> {p.location}</span></span></li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </Shell>
  );
}
