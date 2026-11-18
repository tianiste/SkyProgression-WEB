// What one Magic Find point is worth on a mob, and how long an upgrade takes to pay for itself.
import type { Mob } from "./mobs";
import { MOBS } from "./mobs";
import type { Quote } from "./price-spec";

export interface MobValue {
  mob: Mob;
  /** Coins one extra Magic Find point adds per kill (instant-sell value is not used; this is the buy price). */
  perPointPerKill: number;
  killsPerHour: number;
  /** Coins one extra Magic Find point adds per hour. */
  perPointPerHour: number;
  priced: number;
  total: number;
  /** Drops with no price right now (left out of the value). */
  missing: string[];
}

export const mobById = (id: string) => MOBS.find((m) => m.id === id);

/**
 * Magic Find scales every drop chance linearly: drops = base × (1 + MF/100). Past 100% the extra becomes a chance to
 * double, which keeps the expected count linear. So each point adds 1% of each drop's base expected value.
 * Prices are the current instant-buy prices; what you can actually sell for is usually a little lower.
 */
export function mobValue(mob: Mob, quotes: Record<string, Quote>, kph: number): MobValue {
  let perKill = 0;
  let priced = 0;
  const missing: string[] = [];
  for (const d of mob.drops) {
    const price = d.market === "coins" ? 1 : (quotes[d.id]?.buy ?? 0);
    if (price <= 0) {
      missing.push(d.id);
      continue;
    }
    priced++;
    perKill += (d.chance / 100) * d.qty * price;
  }
  const perPointPerKill = perKill / 100;
  return { mob, perPointPerKill, killsPerHour: kph, perPointPerHour: perPointPerKill * kph, priced, total: mob.drops.length, missing };
}

/** Hours until an upgrade that adds `gain` Magic Find and costs `cost` coins has earned its price back. */
export function paybackHours(cost: number, gain: number, v: MobValue | null): number | null {
  if (!v || v.perPointPerHour <= 0 || gain <= 0) return null;
  return cost / (gain * v.perPointPerHour);
}

/** "45 min", "3.2 h", "4 days", "11 weeks". */
export function formatHours(h: number): string {
  if (h < 1) return `${Math.max(1, Math.round(h * 60))} min`;
  if (h < 48) return `${h < 10 ? h.toFixed(1) : Math.round(h)} h`;
  const d = h / 24;
  if (d < 21) return `${Math.round(d)} days`;
  return `${Math.round(d / 7)} weeks`;
}
