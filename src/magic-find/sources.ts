// Magic Find sources after the 0.27.3 rework (Release Candidate #2 values).
// References and dates: docs/MECHANICS.md in github.com/tianiste/mf-progression.

export type ActivityId = "all" | "slayer" | "diana" | "lava" | "shark" | "ghost";

export interface Activity {
  id: ActivityId;
  name: string;
  note: string;
}

export const ACTIVITIES: Activity[] = [
  { id: "all", name: "Anything", note: "" },
  { id: "slayer", name: "Slayer bosses", note: "Aatrox counts double on bosses." },
  { id: "diana", name: "Diana (Mythological)", note: "" },
  { id: "lava", name: "Lava fishing", note: "" },
  { id: "shark", name: "Sharks", note: "" },
  { id: "ghost", name: "Ghosts", note: "" },
];

export type ChipKind = "seasonal" | "event" | "no market yet" | "verify price" | "old estimate";

export interface Source {
  id: string;
  act: ActivityId;
  name: string;
  mf: number;
  /** Cost in coins. null = no known price, the user fills it in. */
  cost: number | null;
  note: string;
  /** id of the tier this one upgrades; it can never be bought before that tier. */
  need?: string;
  chip?: ChipKind;
  /**
   * Equipment slot it takes. Only one item per slot counts, so a helmet that gives less than the
   * helmet you already have adds nothing.
   */
  slot?: Slot;
  /** Which item the upgrade goes on, if that matters; per activity where it differs. */
  goesOn?: string | Partial<Record<ActivityId, string>>;
  /** Only counts against this mob type; listed only when the picked mob has it. */
  mobType?: string;
  /** Generic row shown only while no mob is picked. */
  onlyWithoutMob?: boolean;
  /** Does not work on these mob types. */
  notForTypes?: string[];
  /** Only counts on these mobs (shared/mobs.ts ids); listed only when one of them is picked. */
  mobIds?: string[];
}

export type Slot = "helmet" | "petItem";
export const SLOT_NAME: Record<Slot, string> = { helmet: "helmet", petItem: "pet item" };

const LOOTING_ON: Partial<Record<ActivityId, string>> = {
  all: "your main weapon",
  slayer: "your slayer weapon",
  diana: "your Daedalus Blade",
  lava: "whatever you kill with",
  shark: "whatever you kill with",
  ghost: "your main weapon",
};

/** Where a source goes for the chosen activity, or undefined when it doesn't matter. */
export function goesOn(s: Source, act: ActivityId): string | undefined {
  if (!s.goesOn) return undefined;
  return typeof s.goesOn === "string" ? s.goesOn : (s.goesOn[act] ?? s.goesOn.all);
}

export const SOURCES: Source[] = [
  { id: "loot5", act: "all", name: "Looting V", mf: 15, cost: 0, goesOn: LOOTING_ON, note: "Enchanting table." },
  {
    id: "loot6",
    act: "all",
    need: "loot5",
    name: "Looting VI",
    mf: 5,
    cost: 245_000,
    chip: "seasonal",
    goesOn: LOOTING_ON,
    note: "25 North Stars from Einary.",
  },
  { id: "loot7", act: "all", need: "loot6", name: "Looting VII", mf: 5, cost: null, chip: "no market yet", goesOn: LOOTING_ON, note: "Sphinx drop, 0.5%." },
  { id: "cinder", act: "all", name: "Cinderbat Shard 10", mf: 5, cost: 864_000, note: "24 shards." },
  {
    id: "stew",
    act: "all",
    notForTypes: ["Mythological", "Pest", "Timid", "Spooky"],
    name: "Witch stew",
    mf: 1,
    cost: 10_000,
    chip: "event",
    note: "Year of the Witch only.",
  },
  { id: "typeshard", act: "all", onlyWithoutMob: true, name: "Mob-type shard", mf: 5, cost: null, note: "Pick a mob to see which one." },
  { id: "dgift", act: "all", name: "Divine Gift ×5", mf: 5, cost: 125_000_000, chip: "verify price", note: "Max 5. Old book price, may change." },
  { id: "pulseR", act: "all", name: "Pulse Ring (Rare)", mf: 1, cost: 7_500_000, chip: "old estimate", note: "" },
  { id: "pulseE", act: "all", need: "pulseR", name: "Pulse Ring to Epic", mf: 0.5, cost: 36_500_000, chip: "old estimate", note: "17 Thunder in a Bottle." },
  {
    id: "pulseL",
    act: "all",
    need: "pulseE",
    name: "Pulse Ring to Legendary",
    mf: 0.5,
    cost: 156_000_000,
    chip: "old estimate",
    note: "80 Thunder in a Bottle.",
  },
  { id: "anguish", act: "all", name: "Anguish Artifact", mf: 1.5, cost: null, note: "" },
  { id: "shelf", act: "all", name: "Diana's Bookshelf", mf: 1, cost: 75_000_000, note: "Regalia Room, plus 6 Chimera I." },
  { id: "cake", act: "all", name: "Century Cake of the Next Dungeon Floor", mf: 1, cost: null, note: "Temporary." },
  { id: "beacon", act: "all", name: "Island Beacon, max", mf: 3, cost: null, note: "" },
  { id: "ladder", act: "all", name: "Necron's Ladder", mf: 1, cost: null, note: "3 Necron Handle drops." },
  { id: "clover", act: "all", name: "Clover Helmet", mf: 5, cost: null, slot: "helmet", note: "" },
  { id: "shuriken", act: "all", name: "Extremely Real Shuriken", mf: 5, cost: null, note: "Only on the tagged mob." },
  { id: "shard_undead", act: "all", mobType: "Undead", name: "Drowned Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_arthropod", act: "all", mobType: "Arthropod", name: "Black Widow Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_animal", act: "all", mobType: "Animal", name: "Wild Hog Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_elusive", act: "all", mobType: "Elusive", name: "Hideyho Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_airborne", act: "all", mobType: "Airborne", name: "Parakeet Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_frozen", act: "all", mobType: "Frozen", name: "Billygoat Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_subterranean", act: "all", mobType: "Subterranean", name: "Chuckwalla Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_cubic", act: "all", mobType: "Cubic", name: "Hivethief Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_construct", act: "all", mobType: "Construct", name: "Wiki Tiki Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_aquatic", act: "all", mobType: "Aquatic", name: "Giant Water Bug Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_critter", act: "all", mobType: "Critter", name: "Hewver Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_woodland", act: "all", mobType: "Woodland", name: "Hideonfloor Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "shard_arcane", act: "all", mobType: "Arcane", name: "Hideonwall Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "ribery", act: "all", mobType: "Animal", name: "PhD's Grimoire", mf: 4, cost: null, note: "Top of Researcher Ribery's line." },
  { id: "jar", act: "all", name: "Celestial Mason Jar", mf: 1, cost: null, note: "" },

  { id: "bracelet", act: "slayer", mobIds: ["tarantula"], name: "Shriveled Bracelet", mf: 5, cost: null, note: "Arachne, Broodmother and Tarantula only." },
  { id: "wolffur", act: "slayer", name: "Wolf Fur Mixin", mf: 5, cost: null, note: "Slayer bosses only." },
  { id: "haban", act: "slayer", name: "Habanero Tactics V", mf: 5, cost: null, goesOn: "your slayer weapon", note: "Slayer bosses only." },

  { id: "minoshard", act: "diana", mobType: "Mythological", name: "Minotaur Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "fish", act: "diana", name: "Four-Eyed Fish", mf: 5, cost: null, slot: "petItem", goesOn: "your Griffin", note: "Was +13." },
  { id: "greed", act: "diana", name: "Crown of Greed", mf: 5, cost: null, slot: "helmet", note: "Was +10." },
  { id: "avarice", act: "diana", need: "greed", name: "Crown of Avarice", mf: 5, cost: null, slot: "helmet", note: "Crafted from Greed. +10 at max counter." },
  { id: "fleece", act: "diana", name: "Golden Fleece", mf: 5, cost: null, note: "" },
  { id: "favor", act: "diana", name: "Diana's Favor", mf: 3, cost: null, note: "Carnival tickets." },

  { id: "lavashard", act: "lava", mobType: "Magmatic", name: "Lava Flame Shard 10", mf: 5, cost: null, note: "48 shards." },
  { id: "magma4", act: "lava", name: "Magma Lord 4/5", mf: 7.5, cost: null, note: "Chest, legs, boots, necklace." },
  { id: "magma5", act: "lava", need: "magma4", name: "Magma Lord Helmet", mf: 2.5, cost: null, slot: "helmet", note: "Clover Helmet is usually better here." },
  { id: "odger", act: "lava", name: "Odger's Diamond Tooth", mf: 4, cost: null, note: "" },
  { id: "bobbinL", act: "lava", name: "Bobbin' Time V", mf: 5, cost: null, goesOn: "your fishing rod", note: "+1 per bobber nearby, max 5." },

  { id: "sharktooth", act: "shark", name: "Shark Tooth Heirloom", mf: 5, cost: null, note: "" },
  { id: "denture", act: "shark", name: "Denture Collector", mf: 3, cost: null, note: "Carnival tickets." },
  { id: "bobbinS", act: "shark", name: "Bobbin' Time V", mf: 5, cost: null, goesOn: "your fishing rod", note: "+1 per bobber nearby, max 5." },

  { id: "sorrow", act: "ghost", name: "Sorrow Armor", mf: 10, cost: null, slot: "helmet", note: "Piece count per tier unconfirmed." },
];

export type BossId = "zombie" | "spider" | "wolf" | "enderman" | "blaze" | "vampire";

export const BOSSES: { id: BossId; name: string }[] = [
  { id: "zombie", name: "Revenant Horror" },
  { id: "spider", name: "Tarantula Broodfather" },
  { id: "wolf", name: "Sven Packmaster" },
  { id: "enderman", name: "Voidgloom Seraph" },
  { id: "blaze", name: "Inferno Demonlord" },
  { id: "vampire", name: "Riftstalker Bloodfiend (Rift)" },
];

export type ProgressId = "combat" | "pet" | "acct" | "best" | "codex" | "slv" | "griffin" | "myth" | "mega";

export interface ProgressStat {
  id: ProgressId;
  name: string;
  max: number;
  act: ActivityId;
  hint: string;
  /** Magic Find given at value v. `boss` is the selected slayer boss. */
  mf: (v: number, boss: BossId) => number;
}

export function combatMF(level: number): number {
  let t = 0;
  for (let i = 1; i <= level; i++) t += i <= 10 ? 0.1 : i <= 20 ? 0.2 : i <= 30 ? 0.3 : i <= 40 ? 0.4 : 0.5;
  return t;
}

const PET_SCORE_STEPS = [10, 25, 50, 75, 100, 130, 175, 225, 275, 325, 375, 450, 500];
export function petMF(score: number): number {
  return PET_SCORE_STEPS.filter((x) => score >= x).length;
}

export function slayerMF(level: number, boss: BossId): number {
  if (boss === "vampire") return level >= 5 ? 6 : level;
  return level >= 9 ? 10 : level;
}

export const PROGRESS: ProgressStat[] = [
  { id: "combat", name: "Combat level", max: 60, act: "all", mf: combatMF, hint: "+20 at 60" },
  { id: "pet", name: "Pet Score", max: 999, act: "all", mf: petMF, hint: "+13 at 500" },
  { id: "acct", name: "Account upgrade", max: 5, act: "all", mf: (v) => v, hint: "+1 per tier" },
  { id: "best", name: "Bestiary MF", max: 75, act: "all", mf: (v) => v, hint: "+3 per tier" },
  { id: "codex", name: "Beastslayer's Codex (0/1)", max: 1, act: "all", mf: (v) => v, hint: "Milestone 300" },
  { id: "slv", name: "Slayer level", max: 9, act: "slayer", mf: slayerMF, hint: "+10 at level 9" },
  { id: "griffin", name: "Griffin level", max: 100, act: "diana", mf: (v) => v * 0.1, hint: "Active pet only" },
  { id: "myth", name: "Mythological Bestiary tiers", max: 230, act: "diana", mf: (v) => v * 0.1, hint: "Daedalus Blade, x2 fragged" },
  { id: "mega", name: "Megalodon level", max: 100, act: "shark", mf: (v) => v * 0.1, hint: "Active pet only" },
];

export type ToggleId = "cookie" | "godpot" | "aatrox";

export const TOGGLES: { id: ToggleId; name: string; mf: (act: ActivityId) => number }[] = [
  { id: "cookie", name: "Booster Cookie (+10)", mf: () => 10 },
  { id: "godpot", name: "God Potion (+10)", mf: () => 10 },
  { id: "aatrox", name: "Aatrox mayor (+20)", mf: (a) => (a === "slayer" ? 40 : 20) },
];

export const MF_CAP = 500;
