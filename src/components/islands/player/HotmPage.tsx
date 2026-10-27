import { useState } from "preact/hooks";
import { Shell, usePlayer } from "../../player/Shell";
import generated from "../../../data/icons.generated.json";
import { PERKS, perkById, tierOf, type Perk } from "../../../data/perks";
import { formatPowder } from "../../../lib/format";
import { num, type Hotm } from "../../../lib/player";

export interface GuideTree {
  id: string;
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

type Mark = "done" | "short" | "extra" | "";

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
              <div class="hotm-grid" role="group" aria-label="Perk grid">
                {PERKS.map((p) => {
                  const level = have(p.id);
                  const states = p.kind === "core" ? [WORDS[Math.min(10, level)] ?? "locked"] : level >= p.max ? ["maxed", "unlocked"] : level > 0 ? ["unlocked", "maxed"] : ["locked"];
                  const src = piece(p, states);
                  const m = mark(p);
                  const want = p.kind === "core" ? guide?.cotm : guide?.levels[p.id];
                  const off = tree?.off.includes(p.id);
                  return (
                    <span
                      key={p.id}
                      class={`hcell ${m}${level > 0 ? " taken" : ""}${off ? " off" : ""}`}
                      style={{ gridColumn: p.x + 1, gridRow: p.y + 1 }}
                      title={`${p.name}: ${level} / ${p.max}${want ? `, guide ${want}` : ""}`}
                    >
                      {src ? <img class="pixelated" src={src} width="32" height="32" alt="" loading="lazy" /> : <span class={`glyph ${p.kind}${level >= p.max ? " max" : level > 0 ? " part" : ""}`} aria-hidden="true" />}
                    </span>
                  );
                })}
              </div>
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
        </div>
      )}
    </Shell>
  );
}
