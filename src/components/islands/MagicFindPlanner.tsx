import { useEffect, useReducer, useState } from "preact/hooks";
import { emptyLive, load, save } from "../../magic-find/state";
import type { Live, State } from "../../magic-find/state";
import { plan } from "../../magic-find/planner";
import { loadPrices } from "../../magic-find/prices";
import { mobById, mobValue } from "../../magic-find/payback";
import { age } from "../../lib/player";
import { FarmingPanel, ProfilePanel, StatsPanel } from "../magic-find/Setup";
import { BuyList, MaxPanel, NextBuy } from "../magic-find/Plan";
import { Icons } from "../magic-find/MfIcon";
import type { IconTable } from "../../magic-find/icons";

/** The Magic Find planner: setup on the left, the next buy, buy order and max on the right (next buy first on phones). */
export default function MagicFindPlanner({ icons }: { icons: IconTable }) {
  // One mutable settings object; every edit goes through update(), which saves it and re-renders.
  const [s] = useState<State>(load);
  const [, rerender] = useReducer((n: number) => n + 1, 0);
  const update = (change: (st: State) => void) => {
    change(s);
    save(s);
    rerender(0);
  };

  const [live, setLive] = useState<Live>(emptyLive);
  // Prices refresh on load and every five minutes while the page is open.
  useEffect(() => {
    const refresh = () => void loadPrices().then(setLive);
    refresh();
    const timer = setInterval(refresh, 5 * 60_000);
    return () => clearInterval(timer);
  }, []);

  const result = plan(s, live.cost);
  const mob = s.mob ? mobById(s.mob) : undefined;
  const value = mob ? mobValue(mob, live.quotes, s.kph[mob.id] ?? mob.killsPerHour) : null;

  const priceLine = live.error
    ? `Prices didn't load (${live.error}); using estimates.`
    : !live.origin
      ? "Loading prices…"
      : live.origin === "bazaar"
        ? `Bazaar prices ${age(live.updatedAt)}. No Auction House prices right now.`
        : `Prices ${age(live.updatedAt)}.`;

  return (
    <Icons.Provider value={icons}>
      <div class="mf">
        <div class="mf-layout">
          <aside class="mf-setup" aria-label="Your setup">
            <ProfilePanel s={s} update={update} />
            <FarmingPanel s={s} update={update} value={value} />
            <StatsPanel s={s} update={update} />
          </aside>
          <NextBuy s={s} plan={result} value={value} />
          <div class="mf-main">
            <BuyList s={s} live={live} plan={result} value={value} update={update} />
            <MaxPanel s={s} />
            <p class="mf-note mf-prices" aria-live="polite">
              {priceLine}
              {live.origin === "api" && (
                <>
                  {" "}
                  Auction House prices: <a href="https://sky.coflnet.com">SkyCofl</a>.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </Icons.Provider>
  );
}
