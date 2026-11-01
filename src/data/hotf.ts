/**
 * Heart of the Forest perks. IDs, positions and max levels come from NEU's hotflayout.json: x 0..6 from the left,
 * y 0..7 from the top, tier = 8 - y. Effects are the in-game text, shortened.
 */
export type HotfKind = "perk" | "ability" | "center";

export interface HotfPerk {
  id: string;
  name: string;
  x: number;
  y: number;
  max: number;
  kind: HotfKind;
  whispers: "forest" | "desert";
  effect: string;
}

const rows: [string, string, number, number, number, "forest" | "desert", string, HotfKind?][] = [
  ["monster_hunter", "Monster Hunter", 0, 0, 1, "desert", "Hunting a Critter grants 25 Forest Whispers."],
  ["forest_speed", "Forest Speed", 1, 0, 50, "desert", "A share of your Speed becomes Foraging Fortune and Sweep (Speed capped at 500)."],
  ["essence_fortune", "Essence Fortune", 2, 0, 50, "desert", "Chance for Forest Essence to double."],
  ["timber", "Timber", 3, 0, 10, "desert", "Grants Timber."],
  ["two_for_one", "Two For One", 4, 0, 100, "desert", "Chance to fell the entire tree when cutting it."],
  ["forest_strength", "Forest Strength", 5, 0, 50, "desert", "A share of your Strength becomes Foraging Fortune and Sweep (Strength capped at 1,000)."],
  ["beekeeper", "Beekeeper", 6, 0, 1, "desert", "A random honey-related buff every SkyBlock day."],
  ["half_empty", "Half Empty", 1, 1, 25, "desert", "Foraging Fortune and Sweep for each player on your island. Cannot be taken with Half Full."],
  ["ricochet", "Ricochet", 3, 1, 10, "desert", "Chance for a thrown axe to bounce to a nearby tree."],
  ["half_full", "Half Full", 5, 1, 25, "desert", "Foraging Fortune and Sweep for each player on your island. Cannot be taken with Half Empty."],
  ["homing_axe", "Homing Axe", 0, 2, 1, "desert", "Thrown axes home in on trees on Galatea."],
  ["forest_fisher", "Forest Fisher", 1, 2, 40, "desert", "Fishing Speed and Sea Creature Chance on Foraging Islands."],
  ["strength_boost", "Strength Boost", 2, 2, 50, "desert", "Strength on Foraging Islands."],
  ["starlyn_supreme", "Starlyn Supreme", 3, 2, 100, "desert", "More points in Starlyn Contests."],
  ["speed_boost", "Speed Boost", 4, 2, 50, "desert", "Speed on Foraging Islands."],
  ["efficient_forager", "Efficient Forager", 5, 2, 100, "desert", "Grants Foraging Wisdom."],
  ["maniac_slicer", "Maniac Slicer", 6, 2, 1, "desert", "Axe ability: throwing your axe spends all your mana for Sweep.", "ability"],
  ["tree_whisperer", "Tree Whisperer", 1, 3, 1, "desert", "Fig and Mangrove Tree Gifts give 200 Forest Whispers; Helix Tree Gifts give Desert Whispers."],
  ["center_of_the_forest", "Center of the Forest", 3, 3, 5, "forest", "Levels 1 to 3 cost Forest Whispers, levels 4 and 5 Desert Whispers. See the table in the guide.", "center"],
  ["free_trial", "Free Trial", 5, 3, 1, "desert", "The first Tree Gift each day contains a Basic Safari Ticket."],
  ["lottery", "Lottery", 0, 4, 1, "desert", "A random effect every SkyBlock day, such as Fig, Mangrove or Helix Fortune or Sweep."],
  ["foraging_madness", "Foraging Madness", 1, 4, 1, "desert", "+10 Sweep and +50 Foraging Fortune."],
  ["iron_lungs", "Iron Lungs", 2, 4, 50, "desert", "Grants Respiration."],
  ["250_gifts", "250 Gifts", 3, 4, 40, "desert", "Your first 250 Tree Gifts of the day give more loot and extra whispers."],
  ["daily_wishes", "Daily Wishes", 4, 4, 100, "desert", "Whispers from the first type of log you cut on Galatea each day."],
  ["early_bird", "Early Bird", 5, 4, 1, "desert", "+20 Sweep and +100 Foraging Fortune for the first 250 trees of the day."],
  ["precision_cutting", "Precision Cutting", 6, 4, 1, "desert", "Cutting the marked log on a tree grants a Sweep bonus."],
  ["deep_waters", "Deep Waters", 1, 5, 50, "forest", "Grants Pressure Resistance."],
  ["hunters_luck", "Hunters Luck", 3, 5, 50, "forest", "Grants Hunting Fortune."],
  ["galateas_might", "Galatea's Might", 5, 5, 50, "forest", "Combat stats on Galatea."],
  ["damage_boost", "Damage Boost", 1, 6, 1, "forest", "Axe ability: your axe deals double damage to creatures on Galatea.", "ability"],
  ["luck_of_the_forest", "Luck of the Forest", 2, 6, 40, "forest", "Tree Gifts grant more loot."],
  ["foraging_fortune", "Foraging Fortune", 3, 6, 50, "forest", "Grants Foraging Fortune."],
  ["collector", "Collector", 4, 6, 50, "forest", "Chance for berries and island resources to drop double."],
  ["axe_toss", "Axe Toss", 5, 6, 1, "forest", "Axe ability: throwing your axe has no Sweep penalty for 10 seconds.", "ability"],
  ["sweep", "Sweep", 3, 7, 50, "forest", "Grants Sweep."],
];

export const HOTF_PERKS: HotfPerk[] = rows.map(([id, name, x, y, max, whispers, effect, kind]) => ({ id, name, x, y, max, whispers, effect, kind: kind ?? "perk" }));
export const HOTF_PERK_IDS = HOTF_PERKS.map((p) => p.id) as [string, ...string[]];
export const hotfPerkById = new Map(HOTF_PERKS.map((p) => [p.id, p]));
export const hotfTierOf = (p: HotfPerk) => 8 - p.y;
