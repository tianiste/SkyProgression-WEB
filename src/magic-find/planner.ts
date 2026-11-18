import type { ActivityId, Slot, Source } from "./sources";
import { MF_CAP, PROGRESS, SOURCES, TOGGLES } from "./sources";
import type { State } from "./state";
import { MOBS } from "./mobs";

type Filterable = { act: ActivityId; mobType?: string; onlyWithoutMob?: boolean; notForTypes?: string[]; mobIds?: string[] };

/**
 * Which sources and stats count for the chosen activity and mob: the activity's own plus the "all" ones; mob-type
 * shards only for a picked mob of that type (activity shards like Minotaur show without a mob); the generic shard row
 * only while no mob is picked; nothing that does not work on the mob's types.
 */
export function appliesTo(state: { act: ActivityId; mob?: string }) {
  const mob = state.mob ? MOBS.find((m) => m.id === state.mob) : undefined;
  return (x: Filterable): boolean => {
    if (x.act !== "all" && x.act !== state.act) return false;
    if (x.onlyWithoutMob && mob) return false;
    if (x.mobIds) return !!mob && x.mobIds.includes(mob.id);
    if (x.mobType) return mob ? mob.types.includes(x.mobType) : x.act !== "all";
    if (x.notForTypes && mob && mob.types.some((t) => x.notForTypes!.includes(t))) return false;
    return true;
  };
}

const byId = new Map(SOURCES.map((s) => [s.id, s]));

/** Price of a source in coins: user override, then live price, then default. null = unknown. */
export function costOf(s: Source, state: State, liveCost: Record<string, number>): number | null {
  const p = state.price[s.id];
  if (p !== undefined) return p * 1e6;
  return liveCost[s.id] ?? s.cost;
}

/** What a slotted item is worth in its slot: its own MF plus the tiers below it in the same slot. */
function slotValue(s: Source): number {
  const below = s.need ? byId.get(s.need) : undefined;
  return s.mf + (below && below.slot === s.slot ? slotValue(below) : 0);
}

/** The item that fills each slot (the most MF among the set) and the slot's MF. */
function bestPerSlot(set: Iterable<Source>): Map<Slot, { source: Source; mf: number }> {
  const best = new Map<Slot, { source: Source; mf: number }>();
  for (const s of set) {
    if (!s.slot) continue;
    const v = slotValue(s);
    const cur = best.get(s.slot);
    if (!cur || v > cur.mf) best.set(s.slot, { source: s, mf: v });
  }
  return best;
}

/** MF from a set of sources: unslotted ones add up, each slot counts only its best item. */
function setMF(set: Set<Source>): number {
  let t = 0;
  for (const s of set) if (!s.slot) t += s.mf;
  for (const { mf } of bestPerSlot(set).values()) t += mf;
  return t;
}

/** MF from progress and toggles (no coin price). */
function progressMF(state: State): number {
  let t = 0;
  for (const p of PROGRESS.filter(appliesTo(state))) t += p.mf(Math.min(p.max, state.prog[p.id] ?? 0), state.boss);
  for (const g of TOGGLES) if (state.tog[g.id]) t += g.mf(state.act);
  return t;
}

const ownedSet = (state: State) => new Set(SOURCES.filter((s) => appliesTo(state)(s) && state.own[s.id]));

/** Magic Find the player already has for the chosen activity. */
export function baseMF(state: State): number {
  return progressMF(state) + setMF(ownedSet(state));
}

export interface PlanRow {
  source: Source;
  /** MF this purchase adds after what is already owned or bought above it (slot-aware). */
  gain: number;
  /** The item it replaces in its slot, if any. */
  replaces?: Source;
  /** Set when this row adds nothing by itself but is the tier an upgrade below it needs. */
  neededFor?: Source;
  cost: number | null;
  coinsPerMF: number | null;
  /** Running MF after buying this row (capped), null when unpriced. */
  runningMF: number | null;
  runningCost: number | null;
  inBudget: boolean;
}

export interface Plan {
  now: number;
  rows: PlanRow[];
  /** Sources that would add nothing: a better item already fills their slot. */
  noGain: { source: Source; blockedBy: Source }[];
  budgetMF: number;
  budgetCost: number;
  everything: number;
}

/**
 * Buy order, greedy by coins per Magic Find actually gained. Each step looks at every source together with the
 * lower tiers it needs (Crown of Greed for the Crown of Avarice), values it by what it adds over what is owned or
 * already chosen (a helmet only adds its difference over the helmet you wear), and takes the cheapest point.
 * Unpriced sources follow; sources that can never add anything are listed apart.
 */
export function plan(state: State, liveCost: Record<string, number>): Plan {
  const pool = SOURCES.filter(appliesTo(state));
  const have = ownedSet(state);
  const progress = progressMF(state);
  const now = progress + setMF(have);
  const cost = (s: Source) => costOf(s, state, liveCost);

  /** s and the lower tiers it needs that are not owned yet, lowest first. */
  const chainTo = (s: Source): Source[] => {
    const out: Source[] = [];
    for (let x: Source | undefined = s; x && !have.has(x); x = x.need ? byId.get(x.need) : undefined) out.unshift(x);
    return out;
  };
  const gainOf = (items: Source[]) => setMF(new Set([...have, ...items])) - setMF(have);
  const replacing = (s: Source) => {
    if (!s.slot) return undefined;
    const cur = bestPerSlot(have).get(s.slot)?.source;
    if (!cur || cur === s) return undefined;
    // Its own lower tier is upgraded, not replaced.
    for (let x = s.need ? byId.get(s.need) : undefined; x; x = x.need ? byId.get(x.need) : undefined) if (x === cur) return undefined;
    return cur;
  };

  const rows: PlanRow[] = [];
  /** Adds a chain as rows, one per item, each with what it adds at that point. */
  const take = (chain: Source[], priced: boolean) => {
    const target = chain[chain.length - 1]!;
    for (const s of chain) {
      const gain = gainOf([s]);
      const replaces = replacing(s);
      have.add(s);
      const c = cost(s);
      rows.push({
        source: s,
        gain,
        replaces,
        neededFor: s !== target && gain <= 0 ? target : undefined,
        cost: c,
        coinsPerMF: c !== null && gain > 0 ? c / gain : null,
        runningMF: priced ? Math.min(MF_CAP, progress + setMF(have)) : null,
        runningCost: null,
        inBudget: false,
      });
    }
  };

  // Priced chains, cheapest gained point first.
  for (;;) {
    let pick: { chain: Source[]; ratio: number } | null = null;
    for (const s of pool) {
      if (have.has(s)) continue;
      const chain = chainTo(s);
      const costs = chain.map(cost);
      if (costs.some((c) => c === null)) continue;
      const gain = gainOf(chain);
      if (gain <= 0) continue;
      const ratio = (costs as number[]).reduce((a, b) => a + b, 0) / gain;
      if (!pick || ratio < pick.ratio) pick = { chain, ratio };
    }
    if (!pick) break;
    take(pick.chain, true);
  }

  // Running totals and budget over the priced rows, in order.
  const budget = state.budget * 1e6;
  let spent = 0;
  let budgetMF = now;
  let budgetCost = 0;
  let stopped = false;
  for (const r of rows) {
    spent += r.cost ?? 0;
    r.runningCost = spent;
    if (!stopped && spent <= budget) {
      r.inBudget = true;
      budgetMF = r.runningMF ?? budgetMF;
      budgetCost = spent;
    } else stopped = true;
  }

  // Unpriced chains (list order), valued as if added next; slotted items that can never help are set apart.
  const noGain: Plan["noGain"] = [];
  for (const s of pool) {
    if (have.has(s)) continue;
    const chain = chainTo(s);
    if (gainOf(chain) > 0) take(chain, false);
  }
  for (const s of pool) {
    if (have.has(s) || !s.slot) continue;
    const blockedBy = bestPerSlot(have).get(s.slot)?.source;
    if (blockedBy) noGain.push({ source: s, blockedBy });
  }

  return { now, rows, noGain, budgetMF, budgetCost, everything: progress + setMF(new Set(pool)) };
}

export interface BreakdownLine {
  label: string;
  now: number;
  max: number;
  /** How you raise it: free grind, coins, or a time-limited boost. */
  kind: "grind" | "buy" | "boost";
  hint?: string;
}

export interface Breakdown {
  lines: BreakdownLine[];
  now: number;
  max: number;
}

/** Where the player's Magic Find comes from now, and the most each part can give for this activity. */
export function breakdown(state: State): Breakdown {
  const on = appliesTo(state);
  const lines: BreakdownLine[] = [];
  for (const p of PROGRESS.filter(on)) {
    const max = p.mf(p.max, state.boss);
    lines.push({ label: p.name, now: p.mf(Math.min(p.max, state.prog[p.id] ?? 0), state.boss), max, kind: "grind", hint: p.hint });
  }
  for (const g of TOGGLES) {
    lines.push({ label: g.name.replace(/ \(.*\)$/, ""), now: state.tog[g.id] ? g.mf(state.act) : 0, max: g.mf(state.act), kind: "boost" });
  }
  const pool = SOURCES.filter(on);
  lines.push({
    label: "Items",
    now: setMF(ownedSet(state)),
    max: setMF(new Set(pool)),
    kind: "buy",
  });
  const now = lines.reduce((t, l) => t + l.now, 0);
  const max = lines.reduce((t, l) => t + l.max, 0);
  return { lines, now, max };
}
