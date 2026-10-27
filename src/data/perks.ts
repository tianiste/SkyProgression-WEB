/**
 * Heart of the Mountain perks. Positions match the mod's tree layout (NEU hotmlayout.json): x 0..6 from the left,
 * y 0..9 from the top, tier = 10 - y. Max levels are the in-game maxima; abilities and Core of the Mountain are marked.
 */
export type PerkKind = "perk" | "ability" | "core";

export interface Perk {
  id: string;
  name: string;
  x: number;
  y: number;
  max: number;
  kind: PerkKind;
}

const rows: [string, string, number, number, number, PerkKind?][] = [
  ["mining_speed", "Mining Speed", 3, 9, 50],
  ["mining_speed_boost", "Mining Speed Boost", 1, 8, 3, "ability"],
  ["precision_mining", "Precision Mining", 2, 8, 1],
  ["mining_fortune", "Mining Fortune", 3, 8, 50],
  ["titanium_insanium", "Titanium Insanium", 4, 8, 50],
  ["pickobulus", "Pickobulus", 5, 8, 3, "ability"],
  ["luck_of_the_cave", "Luck of the Cave", 1, 7, 45],
  ["efficient_miner", "Efficient Miner", 3, 7, 100],
  ["quick_forge", "Quick Forge", 5, 7, 20],
  ["sky_mall", "Sky Mall", 0, 6, 1],
  ["old_school", "Old-School", 1, 6, 20],
  ["professional", "Professional", 2, 6, 140],
  ["mole", "Mole", 3, 6, 200],
  ["gem_lover", "Gem Lover", 4, 6, 20],
  ["seasoned_mineman", "Seasoned Mineman", 5, 6, 100],
  ["front_loaded", "Front Loaded", 6, 6, 1],
  ["daily_grind", "Daily Grind", 1, 5, 1],
  ["core_of_the_mountain", "Core of the Mountain", 3, 5, 10, "core"],
  ["daily_powder", "Daily Powder", 5, 5, 1],
  ["anomalous_desire", "Anomalous Desire", 0, 4, 3, "ability"],
  ["blockhead", "Blockhead", 1, 4, 20],
  ["subterranean_fisher", "Subterranean Fisher", 2, 4, 40],
  ["keep_it_cool", "Keep It Cool", 3, 4, 50],
  ["lonesome_miner", "Lonesome Miner", 4, 4, 45],
  ["great_explorer", "Great Explorer", 5, 4, 20],
  ["maniac_miner", "Maniac Miner", 6, 4, 3, "ability"],
  ["speedy_mineman", "Speedy Mineman", 1, 3, 50],
  ["powder_buff", "Powder Buff", 3, 3, 50],
  ["fortunate_mineman", "Fortunate Mineman", 5, 3, 50],
  ["miners_blessing", "Miner's Blessing", 0, 2, 1],
  ["no_stone_unturned", "No Stone Unturned", 1, 2, 50],
  ["strong_arm", "Strong Arm", 2, 2, 100],
  ["steady_hand", "Steady Hand", 3, 2, 100],
  ["warm_heart", "Warm Heart", 4, 2, 50],
  ["surveyor", "Surveyor", 5, 2, 20],
  ["mineshaft_mayhem", "Mineshaft Mayhem", 6, 2, 1],
  ["metal_head", "Metal Head", 1, 1, 20],
  ["rags_to_riches", "Rags to Riches", 3, 1, 50],
  ["eager_adventurer", "Eager Adventurer", 5, 1, 100],
  ["gemstone_infusion", "Gemstone Infusion", 0, 0, 3, "ability"],
  ["crystalline", "Crystalline", 1, 0, 50],
  ["gifts_from_the_departed", "Gifts from the Departed", 2, 0, 100],
  ["mining_master", "Mining Master", 3, 0, 10],
  ["dead_mans_chest", "Dead Man's Chest", 4, 0, 50],
  ["vanguard_seeker", "Vanguard Seeker", 5, 0, 50],
  ["sheer_force", "Sheer Force", 6, 0, 3, "ability"],
];

export const PERKS: Perk[] = rows.map(([id, name, x, y, max, kind]) => ({ id, name, x, y, max, kind: kind ?? "perk" }));
export const PERK_IDS = PERKS.map((p) => p.id) as [string, ...string[]];
export const perkById = new Map(PERKS.map((p) => [p.id, p]));
export const tierOf = (p: Perk) => 10 - p.y;
