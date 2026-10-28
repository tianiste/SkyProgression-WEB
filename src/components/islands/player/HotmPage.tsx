import { useState } from "preact/hooks";
import { Shell, usePlayer } from "../../player/Shell";
import generated from "../../../data/icons.generated.json";
import { PERKS, perkById, tierOf, type Perk } from "../../../data/perks";
import { formatPowder } from "../../../lib/format";
import { num, signed, type Hotm, type HotmPlan, type PowderMap } from "../../../lib/player";

export interface GuideTree {
  id: string;
  /** Tree file id, as the planner's community trees name them. */
  tree: string;
  label: string;
  guide: string;
  slug: string;
  methods: string[];
  ability: string | null;
  cotm: number | null;
  tier: number;
  powder: { mithril?: number; gemstone?: number; glacite?: number };
  levels: Record<string, number>;
  disabled: string[];
}

const pieces = generated.hotm as Record<string, string>;
/** FurfSky HOTM piece for a perk in a state ("maxed", "unlocked", "locked"; Core of the Mountain by level word). */
function piece(p: Perk, states: string[]): string | undefined {
  const at = `${10 - p.y}_${p.x + 1}`;
  for (const s of states) {
    const file = pieces[`${at}_${s}`];
    if (file && /hotm_(\d+_\d+|core)_/.test(file)) return `/icons/${file}`;
  }
  return undefined;
}
const WORDS = ["locked", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

type Mark = "done" | "short" | "extra" | "raise" | "lower" | "";

/** A HOTM tree as a grid of pieces, each cell ringed by mark(). */
function TreeGrid({ levels, off = [], mark, title, label }: {
  levels: (id: string) => number;
  off?: string[];
  mark: (p: Perk) => Mark;
  title: (p: Perk, level: number) => string;
  label: string;
}) {
  return (
    <div class="hotm-grid" role="group" aria-label={label}>
      {PERKS.map((p) => {
        const level = levels(p.id);
        const states = p.kind === "core" ? [WORDS[Math.min(10, level)] ?? "locked"] : level >= p.max ? ["maxed", "unlocked"] : level > 0 ? ["unlocked", "maxed"] : ["locked"];
        const src = piece(p, states);
        return (
          <span
            key={p.id}
            class={`hcell ${mark(p)}${level > 0 ? " taken" : ""}${off.includes(p.id) ? " off" : ""}`}
            style={{ gridColumn: p.x + 1, gridRow: p.y + 1 }}
            title={title(p, level)}
          >
            {src ? <img class="pixelated" src={src} width="32" height="32" alt="" loading="lazy" /> : <span class={`glyph ${p.kind}${level >= p.max ? " max" : level > 0 ? " part" : ""}`} aria-hidden="true" />}
          </span>
        );
      })}
    </div>
  );
}

const POWDER = ["MITHRIL", "GEMSTONE", "GLACITE"] as const;
const powderName = (k: string) => k[0]! + k.slice(1).toLowerCase();
const rate = (n: number | null | undefined) => num(n, n !== null && n !== undefined && Math.abs(n) >= 1000 ? 0 : 1);
const pct = (a: number | null | undefined, b: number | null | undefined) => (a == null || b == null || b <= 0 ? null : (a / b - 1) * 100);
const powderText = (m: PowderMap) => POWDER.filter((k) => (m[k] ?? 0) > 0).map((k) => `${formatPowder(m[k]!)} ${powderName(k)}`).join(", ");

/** Their HOTM tree (each Loadouts tree) against the guide's recommended tree for the method. */
export default function HotmPage({ trees }: { trees: GuideTree[] }) {
  const state = usePlayer<Hotm>("hotm");
  const { data: d, q } = state;
  const [mine, setMine] = useState(0);
  const [pick, setPick] = useState("");
  if (!d || !q) return <Shell view="hotm" state={state} />;
  const method = q.method || "MF_GEMS";
  const label = d.methods.find((m) => m.id === method)?.label ?? method;
  const options = trees.filter((t) => t.methods.includes(method));
  const guide = options.find((t) => t.id === pick) ?? options[0];
  const tree = d.trees[Math.min(mine, d.trees.length - 1)];
  const have = (id: string) => tree?.levels[id] ?? 0;

  const mark = (p: Perk): Mark => {
    if (!guide || p.kind === "ability") return "";
    const want = p.kind === "core" ? (guide.cotm ?? 0) : (guide.levels[p.id] ?? 0);
    if (want > 0) return have(p.id) >= want ? "done" : "short";
    return have(p.id) > 0 && p.kind !== "core" ? "extra" : "";
  };
  const short = guide ? PERKS.filter((p) => mark(p) === "short") : [];
  const done = guide ? PERKS.filter((p) => mark(p) === "done").length : 0;
  const wanted = guide ? PERKS.filter((p) => mark(p) === "done" || mark(p) === "short").length : 0;
  const extra = guide ? PERKS.filter((p) => mark(p) === "extra") : [];

  return (
    <Shell view="hotm" state={state}>
      {d.trees.length === 0 ? (
        <p class="muted">No HOTM tree in the API response for this profile.</p>
      ) : (
        <div class="grid-2">
          <section class="panel" aria-labelledby="tree-title">
            <h2 id="tree-title">Their tree{guide ? ` against ${guide.label}` : ""}</h2>
            {d.trees.length > 1 && (
              <div class="chips" role="group" aria-label="Loadouts tree">
                {d.trees.map((t, i) => <button type="button" key={t.label} aria-pressed={i === mine} onClick={() => setMine(i)}>{t.label}</button>)}
              </div>
            )}
            {options.length > 1 && (
              <div class="chips" role="group" aria-label="Recommended tree">
                {options.map((t) => <button type="button" key={t.id} aria-pressed={t === guide} onClick={() => setPick(t.id)}>{t.label}</button>)}
              </div>
            )}
            <figure class="hotm-compare">
              <TreeGrid
                label="Perk grid"
                levels={have}
                off={tree?.off}
                mark={mark}
                title={(p, level) => {
                  const want = p.kind === "core" ? guide?.cotm : guide?.levels[p.id];
                  return `${p.name}: ${level} / ${p.max}${want ? `, guide ${want}` : ""}`;
                }}
              />
              <figcaption>
                <ul class="legend small">
                  <li><span class="ring done" aria-hidden="true" />Matches the guide</li>
                  <li><span class="ring short" aria-hidden="true" />Below the guide</li>
                  <li><span class="ring extra" aria-hidden="true" />Not in the guide's tree</li>
                </ul>
              </figcaption>
            </figure>
          </section>

          <section class="panel" aria-labelledby="todo-title">
            <h2 id="todo-title">What's left</h2>
            {!guide ? (
              <p class="muted">No confirmed HOTM tree for {label} yet. The guides publish a tree once the picture's perk mapping is confirmed.</p>
            ) : (
              <>
                <p><strong>{done} of {wanted}</strong> perks at the guide's level. From <a href={`/guides/${guide.slug}/`}>{guide.guide}</a>, {guide.label}.</p>
                <span class="xp" aria-hidden="true"><span style={{ width: `${(100 * done) / Math.max(1, wanted)}%` }} /></span>
                {short.length === 0 ? <p class="gain">Every perk the guide uses is at its level.</p> : (
                  <ul class="sources">
                    {short.map((p) => {
                      const want = p.kind === "core" ? guide.cotm ?? 0 : guide.levels[p.id] ?? 0;
                      return <li key={p.id}><span>{p.name}<span class="muted small"> tier {tierOf(p)}</span></span><span class="num">{have(p.id)} → {want}</span></li>;
                    })}
                  </ul>
                )}
                {guide.ability && <p class="small">Ability: {perkById.get(guide.ability)?.name}{have(guide.ability) > 0 ? ` (unlocked, level ${have(guide.ability)})` : " (not unlocked)"}. The API does not say which ability is selected.</p>}
                {extra.length > 0 && <p class="muted small">Also taken, not in this tree: {extra.map((p) => p.name).join(", ")}.</p>}
              </>
            )}
            <h3>Powder</h3>
            <table class="table compact">
              <thead><tr><th>Powder</th><th class="num">Earned</th><th class="num">Unspent</th>{guide && <th class="num">Guide total</th>}</tr></thead>
              <tbody>
                {(["mithril", "gemstone", "glacite"] as const).map((k) => {
                  const p = d.powder[k];
                  const need = guide?.powder[k];
                  if (!p && !need) return null;
                  const earned = p ? p.spent + p.unspent : null;
                  return (
                    <tr key={k}>
                      <td>{k[0]!.toUpperCase() + k.slice(1)}</td>
                      <td class="num" data-label="Earned">{earned === null ? "?" : formatPowder(earned)}</td>
                      <td class="num" data-label="Unspent">{p ? formatPowder(p.unspent) : "?"}</td>
                      {guide && <td class={`num${need && earned !== null && earned >= need ? " gain" : ""}`} data-label="Guide total">{need ? formatPowder(need) : "–"}</td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p class="muted small">HOTM tier {d.tier}{guide ? ` (the guide's tree needs ${guide.tier})` : ""}{d.tokensSpent >= 0 ? `, ${num(d.tokensSpent, 0)} tokens spent` : ""}. Earned is spent plus unspent, which is what a tree costs in total.</p>
          </section>

          <Planner plan={d.planner} label={label} method={method} have={have} trees={trees} />
        </div>
      )}
    </Shell>
  );
}

/** The mod's HOTM planner: the best tree for the method next to the current one, and the method's community tree. */
function Planner({ plan, label, method, have, trees }: { plan: HotmPlan | null; label: string; method: string; have: (id: string) => number; trees: GuideTree[] }) {
  const [pick, setPick] = useState("");
  if (!plan) {
    return (
      <section class="panel span-2" aria-labelledby="plan-title">
        <h2 id="plan-title">Best tree for {label}</h2>
        <p class="muted">No plan for {label}: the planner needs the HOTM tree and HOTM XP in the API and a rate model for the method.</p>
      </section>
    );
  }
  const shown = plan.now ?? plan.target;
  // The planner's current tree: a changed node's old level, else the planned level (unchanged). Core of the Mountain stays.
  const from = new Map(plan.changes.map((c) => [c.id, c.from]));
  const current = (id: string) => (id === "core_of_the_mountain" ? have(id) : from.get(id) ?? shown.levels[id] ?? 0);
  const planned = (id: string) => (id === "core_of_the_mountain" ? have(id) : shown.levels[id] ?? 0);
  const gain = pct(shown.rate, plan.before);
  const targetGain = pct(plan.target.rate, plan.before);
  const community = plan.community
    .map((c) => ({ c, drawn: trees.find((t) => t.tree === c.id && t.methods.includes(method)) ?? trees.find((t) => t.tree === c.id) }))
    .sort((a, b) => (b.c.rate ?? -1) - (a.c.rate ?? -1));
  const ref = community.find((x) => x.c.id === pick) ?? community[0];
  const missingTarget = POWDER.some((k) => (plan.missing[k] ?? 0) > 0);
  const unknown = POWDER.some((k) => k in plan.missing && plan.missing[k] === null);
  const otherGain = plan.other && shown.rate !== null ? pct(plan.other.rate, shown.rate) : null;
  const refGain = ref ? pct(ref.c.rate, shown.rate) : null;
  const rows = POWDER.filter((k) => k in plan.need || k in plan.missing);
  return (
    <section class="panel span-2" aria-labelledby="plan-title">
      <h2 id="plan-title">Best tree for {label}</h2>
      <p>
        <strong>{rate(plan.before)} → {rate(shown.rate)}</strong> {plan.unit}
        {gain !== null && <span class={gain > 0.005 ? "gain" : "muted"}> ({signed(gain, true)})</span>}
      </p>
      {plan.now && plan.target.rate !== null && shown.rate !== null && plan.target.rate > shown.rate * (1 + 1e-6) && (
        <p class="muted small">With the powder for the whole tree: {rate(plan.target.rate)} ({targetGain === null ? "?" : signed(targetGain, true)}).</p>
      )}
      <dl class="facts">
        <dt>Ability</dt>
        <dd>
          {shown.ability || "none rated"}
          {plan.other && otherGain !== null && <span class="muted"> ({plan.other.ability} rates {signed(otherGain, true)})</span>}
        </dd>
        <dt>Respec</dt>
        <dd>{plan.reset ? "Reset the tree and rebuild it. A reset is free and returns all powder and tokens; Core of the Mountain keeps its level." : "Not needed: the plan only adds levels from unspent powder."}</dd>
        <dt>Tokens</dt>
        <dd>{shown.tokens} of {plan.tokens}</dd>
      </dl>

      <div class="plan-trees">
        <figure class="hotm-compare">
          <figcaption class="small"><strong>Planned tree</strong></figcaption>
          <TreeGrid
            label="Planned tree"
            levels={planned}
            mark={(p) => (p.kind === "core" ? "" : planned(p.id) > current(p.id) ? "raise" : planned(p.id) < current(p.id) ? "lower" : "")}
            title={(p, level) => `${p.name}: ${level} / ${p.max}${level !== current(p.id) ? `, now ${current(p.id)}` : ""}`}
          />
          <figcaption>
            <ul class="legend small">
              <li><span class="ring raise" aria-hidden="true" />Raised or added</li>
              <li><span class="ring lower" aria-hidden="true" />Lowered or removed</li>
            </ul>
          </figcaption>
        </figure>
        {ref && (
          <figure class="hotm-compare">
            <figcaption class="small"><strong>Community tree: {ref.c.title}</strong></figcaption>
            {community.length > 1 && (
              <div class="chips" role="group" aria-label="Community tree">
                {community.map((x) => <button type="button" key={x.c.id} aria-pressed={x === ref} onClick={() => setPick(x.c.id)}>{x.c.title}</button>)}
              </div>
            )}
            {ref.drawn && (
              <TreeGrid
                label={`${ref.c.title} community tree`}
                levels={(id) => (id === "core_of_the_mountain" ? ref.drawn!.cotm ?? 0 : ref.drawn!.levels[id] ?? 0)}
                off={ref.drawn.disabled}
                mark={() => ""}
                title={(p, level) => `${p.name}: ${level >= p.max ? "maxed" : level > 0 ? "unlocked" : "not taken"}`}
              />
            )}
            <p class="small">
              {ref.c.rate === null ? "Not rated (its ability has no rate model). " : <>{rate(ref.c.rate)} {plan.unit}{refGain !== null && <> ({signed(refGain, true)} against the plan)</>}. </>}
              {ref.c.ability || "No ability"}{ref.c.ability && !shown.ability && " (rated without it: no ability on your tool)"}, {ref.c.tokens} tokens, HOTM {ref.c.tier}{!ref.c.fits && ", more than your tier or tokens allow"}.
              {POWDER.some((k) => (ref.c.missing[k] ?? 0) > 0) && <> Needs {powderText(ref.c.missing)} more powder than you have.</>}
            </p>
            <p class="muted small">
              Rated with your stats: maxed perks at their maximum, unlocked ones at level 1 (the picture shows no levels).
              {ref.drawn && <> From the <a href={`/guides/${ref.drawn.slug}/`}>{ref.drawn.guide}</a> guide.</>}
            </p>
          </figure>
        )}
      </div>

      {plan.changes.length > 0 && (
        <details class="plan-changes" open={plan.changes.length <= 8}>
          <summary>{plan.changes.length} change{plan.changes.length === 1 ? "" : "s"}</summary>
          <ul class="sources">
            {plan.changes.map((c) => {
              const p = perkById.get(c.id);
              return (
                <li key={c.id}>
                  <span>{p?.name ?? c.name}{p && <span class="muted small"> tier {tierOf(p)}</span>}</span>
                  <span class="num">{c.from} → {c.to}{c.disabled ? ", turn on" : ""}</span>
                </li>
              );
            })}
          </ul>
        </details>
      )}

      {rows.length > 0 && <>
      <h3>Powder</h3>
      <table class="table compact">
        <thead><tr><th>Powder</th><th class="num">Plan uses</th><th class="num">{plan.reset ? "After a reset" : "Unspent"}</th><th class="num">Missing for the whole tree</th></tr></thead>
        <tbody>
          {rows.map((k) => {
            const h = plan.have[k];
            const miss = plan.missing[k];
            return (
              <tr key={k}>
                <td>{powderName(k)}</td>
                <td class="num" data-label="Plan uses">{formatPowder(plan.need[k] ?? 0)}</td>
                <td class="num" data-label={plan.reset ? "After a reset" : "Unspent"}>{h == null ? "?" : formatPowder(h)}</td>
                <td class={`num${miss === 0 ? " gain" : ""}`} data-label="Missing">{miss === undefined ? "–" : miss === null ? "?" : miss === 0 ? "none" : formatPowder(miss)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </>}
      {(missingTarget || unknown) && <p class="muted small">{unknown ? "A powder type is not in the API, so what is missing is unknown." : "The planned tree is what your powder covers; the rest is needed for the whole tree."}</p>}
      {plan.notes.length > 0 && <ul class="muted small plan-notes">{plan.notes.map((n) => <li key={n}>{n}</li>)}</ul>}
      <p class="muted small">
        The mod's HOTM planner: the tree with the best rate within your HOTM tier, tokens and powder, rated like the
        Upgrades page. It counts only perks the rate model knows; the others are bridges.
      </p>
    </section>
  );
}
