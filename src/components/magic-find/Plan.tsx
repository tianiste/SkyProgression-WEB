import type { Source } from "../../magic-find/sources";
import { MF_CAP, SOURCES, goesOn } from "../../magic-find/sources";
import type { Plan, PlanRow } from "../../magic-find/planner";
import { appliesTo, breakdown } from "../../magic-find/planner";
import type { MobValue } from "../../magic-find/payback";
import { formatHours, paybackHours } from "../../magic-find/payback";
import { coins } from "../../lib/player";
import type { Live, State } from "../../magic-find/state";
import { setOwned } from "../../magic-find/state";
import { MfIcon } from "./MfIcon";
import { r1, type Update } from "./Setup";

const cap = (x: number) => Math.min(MF_CAP, x);
const mult = (x: number) => `×${(1 + cap(x) / 100).toFixed(2)}`;

export function NextBuy({ s, plan, value }: { s: State; plan: Plan; value: MobValue | null }) {
  const next = plan.rows[0];
  const after = plan.rows.slice(1, 3);
  const pay = next?.cost ? paybackHours(next.cost, next.gain, value) : null;
  const on = next ? goesOn(next.source, s.act) : undefined;
  return (
    <section class="mf-next" aria-live="polite" aria-label="Next buy">
      {next ? (
        <>
          <p class="mf-kicker">Next buy</p>
          <div class="mf-next-item">
            <MfIcon source={next.source.id} size="lg" />
            <p class="mf-next-name">{next.source.name}</p>
          </div>
          <p class="mf-mf mf-strong">✯ Magic Find +{r1(next.gain)}</p>
          {next.cost === null ? (
            <p class="muted">No price yet</p>
          ) : next.cost === 0 ? (
            <p class="mf-coin mf-strong">Free</p>
          ) : (
            <p class="mf-coin mf-strong">
              {coins(next.cost)} ({coins(next.coinsPerMF ?? 0)} per ✯)
            </p>
          )}
          {pay !== null && <p class="mf-pay">Pays off in {formatHours(pay)}</p>}
          {on && <p class="mf-on">On {on}</p>}
          {next.source.note && <p class="muted mf-small">{next.source.note}</p>}
          {after.length > 0 && <p class="muted mf-small">Then {after.map((r) => r.source.name).join(", ")}</p>}
        </>
      ) : (
        <>
          <p class="mf-kicker">All done</p>
          <p class="mf-next-name">Nothing left to buy</p>
        </>
      )}
      <dl class="mf-readout">
        <div>
          <dt>Now</dt>
          <dd>
            <span class="mf-big">{r1(cap(plan.now))}</span> ✯ <span class="mf-sub">{mult(plan.now)}</span>
          </dd>
        </div>
        <div>
          <dt>{s.budget > 0 ? coins(s.budget * 1e6) : "No"} budget</dt>
          <dd>
            <span class="mf-big">{r1(cap(plan.budgetMF))}</span> ✯ <span class="mf-sub">{coins(plan.budgetCost)}</span>
          </dd>
        </div>
        <div>
          <dt>Max</dt>
          <dd>
            <span class="mf-big">{r1(cap(plan.everything))}</span> ✯ <span class="mf-sub">{mult(plan.everything)}</span>
          </dd>
        </div>
      </dl>
    </section>
  );
}

const MARKET = { bazaar: "BZ", ah: "AH" } as const;

/** A live price replaces the "old estimate" style warning chips; time-limited chips stay. */
function chipOf(s: Source, live: Live): { text: string; kind: string } | null {
  const m = live.market[s.id];
  if (m && s.chip !== "seasonal" && s.chip !== "event") return { text: MARKET[m], kind: "live" };
  if (!s.chip) return null;
  return { text: s.chip, kind: s.chip === "seasonal" || s.chip === "event" ? "time" : "warn" };
}

/** One short line per row: what it needs or replaces, where it goes, else its note. */
function lineOf(r: PlanRow, s: State): string {
  const bits: string[] = [];
  if (r.neededFor) bits.push(`Needed for ${r.neededFor.name}`);
  else if (r.replaces) bits.push(`Replaces ${r.replaces.name}`);
  const on = goesOn(r.source, s.act);
  if (on) bits.push(`On ${on}`);
  if (r.source.note) bits.push(r.source.note.replace(/\.$/, ""));
  return bits.join(". ");
}

export function BuyList({ s, live, plan, value, update }: { s: State; live: Live; plan: Plan; value: MobValue | null; update: Update }) {
  const owned = SOURCES.filter((x) => appliesTo(s)(x) && s.own[x.id]);
  let lastInBudget = -1;
  plan.rows.forEach((r, i) => {
    if (r.inBudget) lastInBudget = i;
  });
  const budgetText = s.budget > 0 ? `${coins(s.budget * 1e6)} budget` : "No budget set";

  /** Price shown in the input, in millions: the override, else the live/default price, else blank. */
  const priceValue = (x: Source) => {
    const p = s.price[x.id];
    if (p !== undefined) return String(p);
    const c = live.cost[x.id] ?? x.cost;
    return c === null ? "" : String(+(c / 1e6).toFixed(3));
  };
  const setPrice = (x: Source, raw: string) =>
    update((st) => {
      const n = Number(raw.trim());
      if (raw.trim() === "" || !Number.isFinite(n) || n < 0) delete st.price[x.id];
      else st.price[x.id] = n;
    });

  return (
    <section class="mf-ledger" aria-labelledby="mf-order">
      <div class="mf-ledger-head">
        <div>
          <h2 id="mf-order">Buy order</h2>
          <p class="mf-note">Prices in millions. Clear one to reset it.</p>
        </div>
        <label class="mf-field mf-budget">
          <span>Budget (M)</span>
          <input
            type="number"
            min="0"
            step="1"
            value={s.budget}
            onChange={(e) =>
              update((st) => {
                const n = Number((e.currentTarget as HTMLInputElement).value);
                st.budget = Number.isFinite(n) && n >= 0 ? n : 0;
              })
            }
          />
        </label>
      </div>
      <div class="mf-cols" aria-hidden="true">
        <span>Own</span>
        <span>Item</span>
        <span class="mf-r">MF</span>
        <span class="mf-r">Price (M)</span>
        <span class="mf-r">Per ✯</span>
        <span class="mf-r">Total</span>
      </div>
      <ol class="mf-rows">
        {lastInBudget === -1 && plan.rows.length > 0 && (
          <li class="mf-cut" role="presentation">
            {budgetText}
          </li>
        )}
        {plan.rows.map((r, i) => {
          const chip = chipOf(r.source, live);
          const line = lineOf(r, s);
          const pay = value && r.cost ? paybackHours(r.cost, r.gain, value) : null;
          return [
            <li key={r.source.id} class={`mf-row${r.inBudget ? " in" : ""}${r.cost === null ? " unpriced" : ""}`}>
              <span class="mf-rank">{i + 1}</span>
              <input
                class="mf-own"
                type="checkbox"
                checked={false}
                aria-label={`I own ${r.source.name}`}
                onChange={() => update((st) => setOwned(st, r.source.id, true))}
              />
              <div class="mf-what">
                <MfIcon source={r.source.id} />
                <div>
                  <p class="mf-name">
                    {r.source.name}
                    {chip && <span class={`tag ${chip.kind}`}>{chip.text}</span>}
                  </p>
                  {line && <p class="mf-note">{line}</p>}
                  {pay !== null && value && (
                    <p class="mf-note mf-pay">
                      +{coins(r.gain * value.perPointPerHour)}/h, pays off in {formatHours(pay)}
                    </p>
                  )}
                </div>
              </div>
              <span class="mf-gives mf-mf">+{r1(r.gain)} ✯</span>
              <input
                class="mf-price"
                type="number"
                min="0"
                step="0.01"
                value={priceValue(r.source)}
                placeholder="price"
                aria-label={`Price of ${r.source.name} in millions`}
                onChange={(e) => setPrice(r.source, (e.currentTarget as HTMLInputElement).value)}
              />
              <span class="mf-per">{r.coinsPerMF === null ? "–" : <span class="mf-coin">{r.coinsPerMF === 0 ? "free" : coins(r.coinsPerMF)}</span>}</span>
              <span class="mf-run">
                {r.runningMF !== null && (
                  <>
                    <span class="mf-mf">{r1(r.runningMF)} ✯</span>
                    <span class="mf-spent">{coins(r.runningCost ?? 0)}</span>
                  </>
                )}
              </span>
            </li>,
            i === lastInBudget ? (
              <li key={`${r.source.id}-cut`} class="mf-cut" role="presentation">
                {budgetText}
              </li>
            ) : null,
          ];
        })}
      </ol>
      {plan.noGain.length > 0 && (
        <>
          <h3>Won't help</h3>
          <ul class="mf-owned">
            {plan.noGain.map((n) => (
              <li key={n.source.id}>
                <span class="mf-check">
                  <MfIcon source={n.source.id} />
                  <span>{n.source.name}</span>
                </span>
                <span class="mf-small">{n.blockedBy.name} is better</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {owned.length > 0 && (
        <>
          <h3>Owned</h3>
          <ul class="mf-owned">
            {owned.map((x) => (
              <li key={x.id}>
                <label class="mf-check">
                  <input type="checkbox" checked onChange={() => update((st) => setOwned(st, x.id, false))} />
                  <MfIcon source={x.id} />
                  <span>{x.name}</span>
                </label>
                <span class="mf-mf">+{r1(x.mf)} ✯</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

const KIND = { grind: "grind", buy: "coins", boost: "boost" } as const;

export function MaxPanel({ s }: { s: State }) {
  const b = breakdown(s);
  const left = { grind: 0, buy: 0, boost: 0 };
  for (const l of b.lines) left[l.kind] += Math.max(0, l.max - l.now);
  const pct = (now: number, max: number) => (max > 0 ? Math.min(100, (now / max) * 100) : 0);
  return (
    <section class="mf-max" aria-labelledby="mf-max">
      <h2 id="mf-max">Max Magic Find</h2>
      <p class="mf-note">
        <strong class="mf-mf">{r1(b.now)}</strong> of <strong class="mf-mf">{r1(cap(b.max))}</strong>. Left: +{r1(left.grind)} grind, +{r1(left.buy)} coins, +
        {r1(left.boost)} boosts.
      </p>
      <ul class="mf-lines">
        {b.lines.map((l) => (
          <li key={l.label}>
            <div class="mf-line-top">
              <span class="mf-line-label">{l.label}</span>
              <span class="mf-small muted">{KIND[l.kind]}</span>
              <span class="mf-line-val">
                <span class="mf-mf">{r1(l.now)}</span> / {r1(l.max)}
              </span>
            </div>
            <div class="mf-bar" role="img" aria-label={`${r1(l.now)} of ${r1(l.max)}`}>
              <span style={{ width: `${pct(l.now, l.max)}%` }} class={l.max > 0 && l.now >= l.max ? "full" : ""} />
            </div>
          </li>
        ))}
      </ul>
      <p class="mf-note">Leaves out Jerry (+10%), big Bobbin' parties and fragged Daedalus.</p>
    </section>
  );
}
