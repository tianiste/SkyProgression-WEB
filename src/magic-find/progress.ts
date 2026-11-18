// Bestiary tiers and pet levels from the profile, using trimmed NotEnoughUpdates-REPO tables (src/data).
import bestiary from "./bestiary.json";
import petData from "./pet-levels.json";

type Family = { cap: number; bracket: number; keys: string[] };
const FAMILIES = bestiary.families as Record<string, Family>;
const BRACKETS = bestiary.brackets as Record<string, number[]>;

/** Magic Find per Bestiary tier on that family. The Alpha wiki lists Bestiary as +3 to +75 (25 tiers). */
export const BESTIARY_MF_PER_TIER = 3;

/** Bestiary tier of a family: thresholds reached by the summed kills, capped at the family's max tier. */
export function bestiaryTier(family: string, kills: Record<string, number> | undefined): number | null {
  const f = FAMILIES[family];
  const bracket = f ? BRACKETS[String(f.bracket)] : undefined;
  if (!f || !bracket || !kills) return null;
  const total = f.keys.reduce((t, k) => t + (Number(kills[k]) || 0), 0);
  const maxTier = bracket.filter((t) => t <= f.cap).length;
  return Math.min(maxTier, bracket.filter((t) => total >= t).length);
}

export function bestiaryMaxTier(family: string): number {
  const f = FAMILIES[family];
  const bracket = f ? BRACKETS[String(f.bracket)] : undefined;
  return f && bracket ? bracket.filter((t) => t <= f.cap).length : 0;
}

const RARITIES = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"];

/** Pet level from exp: pet_levels holds per-level increments starting at the rarity's offset. Max 100. */
export function petLevel(exp: number, tier: string, heldItem?: string): number {
  let rarity = tier.toUpperCase();
  if (heldItem === "PET_ITEM_TIER_BOOST") rarity = RARITIES[Math.min(RARITIES.length - 1, RARITIES.indexOf(rarity) + 1)] ?? rarity;
  const offset = (petData.pet_rarity_offset as Record<string, number>)[rarity] ?? 0;
  const levels = (petData.pet_levels as number[]).slice(offset, offset + 99);
  let level = 1;
  let total = 0;
  for (const need of levels) {
    total += need;
    if (total > exp) break;
    level++;
  }
  return Math.min(100, level);
}

type Pet = { type?: string; tier?: string; exp?: number; heldItem?: string; active?: boolean };

/** Highest level among the player's pets of a type (Legendary or better when minRarity says so), or null if none. */
export function bestPetLevel(pets: unknown, type: string, minRarity = "COMMON"): number | null {
  if (!Array.isArray(pets)) return null;
  let best: number | null = null;
  for (const p of pets as Pet[]) {
    if (p?.type !== type || typeof p.exp !== "number" || typeof p.tier !== "string") continue;
    let rarity = p.tier.toUpperCase();
    if (p.heldItem === "PET_ITEM_TIER_BOOST") rarity = RARITIES[RARITIES.indexOf(rarity) + 1] ?? rarity;
    if (RARITIES.indexOf(rarity) < RARITIES.indexOf(minRarity)) continue;
    const lvl = petLevel(p.exp, p.tier, p.heldItem);
    if (best === null || lvl > best) best = lvl;
  }
  return best;
}

/** Every Bestiary family in the trimmed table. */
export const FAMILY_NAMES = Object.keys(FAMILIES);
