import { Shell, usePlayer } from "../../player/Shell";
import { ItemIcon } from "../../player/ItemIcon";
import { Head, Meter, UpgradeLine, MethodChart } from "../../player/parts";
import { PlayerModel } from "../../player/PlayerModel";
import { coins, num, pageUrl, type Overview } from "../../../lib/player";

/** The mod's Home tab: the method's stats against what this gear can reach, the rate now, the best next upgrade and coins / hour by method. */
export default function OverviewPage() {
  const state = usePlayer<Overview>("overview");
  const { data: d, q, update } = state;
  return (
    <Shell view="overview" state={state} prices cost god>
      {d && q && (
        <div class="grid-2">
          <section class="panel" aria-labelledby="stats-title">
            <Head id="stats-title" info="Now vs. the most this gear, tool, pet and HOTM tree can reach.">{d.methodLabel} stats</Head>
            <p class="muted small">{d.tool ?? "No mining tool"}</p>
            {d.stats.map((s) => <Meter key={s.stat} ledger={s} sources={s.top} more={pageUrl({ ...q, view: "gear" })} />)}
          </section>

          <div class="stack">
            <section class="panel" aria-labelledby="model-title">
              <h2 id="model-title" class="visually-hidden">{d.player} in their armor</h2>
              <PlayerModel data={d} />
            </section>
            <section class="panel" aria-labelledby="rate-title">
              <Head id="rate-title" info={<>{num(d.efficiency)}% efficiency, {d.rate.model}. {d.rate.window[0]?.toUpperCase()}{d.rate.window.slice(1)}.</>}>Rate</Head>
              {d.rate.perHour === null ? (
                <p class="muted">{d.rate.error ?? (d.rate.supported ? "Can't compute from these stats." : "No rate model yet.")}</p>
              ) : (
                <>
                  <p class="big-number">
                    <strong>{d.rate.lowerBound ? "≥ " : ""}{num(d.rate.perHour, d.rate.perHour < 100 ? 2 : 0)}</strong> {d.rate.unit}/h
                  </p>
                  <p>{d.rate.coinsPerHour === null ? <span class="muted">No price for {d.rate.unit}</span> : <><strong class="coins">{coins(d.rate.coinsPerHour)}</strong> coins/h <span class="muted small">at {num(d.rate.coinsEach, (d.rate.coinsEach ?? 0) >= 100 ? 0 : 2)}</span></>}</p>
                  <p class="small"><a href={pageUrl({ ...q, view: "methods" })}>Details</a></p>
                </>
              )}
            </section>

            <section class="panel" aria-labelledby="next-title">
              <Head id="next-title">Next upgrade</Head>
              {!d.api.inventory ? (
                <p class="muted">Needs Inventory API.</p>
              ) : d.next === null ? (
                <p class="muted">No priced upgrade. Unpriced ones are skipped.</p>
              ) : (
                <>
                  <UpgradeLine u={d.next.upgrade} />
                  <p class="small"><a href={pageUrl({ ...q, view: "upgrades" })}>Full plan</a></p>
                </>
              )}
            </section>
          </div>

          <section class="panel span-2" aria-labelledby="methods-title">
            <Head id="methods-title" info={<>Each method with its best owned gear and tool in its usual zone{d.comparison.godPotion ? ", with a God Potion" : ""}. Pick a row to switch. ≥ means some stat sources are unknown.</>}>Coins/h by method</Head>
            <MethodChart rows={d.comparison.rows} selected={d.method} onPick={(method) => update({ method })} />
          </section>

          {d.loadout.length > 0 && (
            <section class="panel span-2" aria-labelledby="loadout-title">
              <h2 id="loadout-title">Gear used</h2>
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
