// Farming mobs: mob types (for attribute shards and Witch stews), Bestiary family, and drop tables for payback time.
// SkyProgression-API prices the drop items (its src/magic-find-ids.json lists them).
//
// Drop chances are percent per kill before Magic Find, from the 0.27.3 release (17 Nov 2026): the patch notes'
// drop tables and Hypixel's published per-boss slayer spreadsheets (top tier), checked 2026-11-18.
//   REL = release notes / official spreadsheets, W = wiki (only where the release does not list the drop).
// Runes, dyes, potions and skins are left out (no tradeable item id in the items resource); attribute shard drops are
// priced as one shard.

import type { Market } from "./price-spec";

export type MobActivity = "slayer" | "diana" | "lava" | "shark" | "ghost";
export type SlayerBoss = "zombie" | "spider" | "wolf" | "enderman" | "blaze" | "vampire";

export interface Drop {
  /** SkyBlock item id, or COINS for a coin drop (priced at qty coins). */
  id: string;
  qty: number;
  /** Percent per kill, before Magic Find. */
  chance: number;
  market: Market | "coins";
  /** Where the number comes from. */
  src: "REL" | "W";
  /** Set when sources disagree. */
  conflict?: string;
}

export interface Mob {
  id: string;
  name: string;
  act: MobActivity;
  /** Slayer boss this mob is, so the slayer level and boss picker follow it. */
  boss?: SlayerBoss;
  types: string[];
  /** Family name in src/data/bestiary.json, if the mob has a Bestiary. */
  bestiary?: string;
  /** A starting guess for kills per hour; every player should set their own. */
  killsPerHour: number;
  drops: Drop[];
  /** Shown with the payback numbers. */
  dataNote: string;
}

const bz = (id: string, qty: number, chance: number, src: Drop["src"] = "REL", conflict?: string): Drop => ({
  id,
  qty,
  chance,
  market: "bazaar",
  src,
  ...(conflict ? { conflict } : {}),
});
const ah = (id: string, qty: number, chance: number, src: Drop["src"] = "REL", conflict?: string): Drop => ({
  id,
  qty,
  chance,
  market: "ah",
  src,
  ...(conflict ? { conflict } : {}),
});

export const MOBS: Mob[] = [
  {
    id: "revenant",
    name: "Revenant Horror V",
    act: "slayer",
    boss: "zombie",
    types: ["Undead"],
    killsPerHour: 30,
    drops: [
      bz("REVENANT_FLESH", 64, 100),
      bz("FOUL_FLESH", 3, 10),
      bz("UNDEAD_CATALYST", 1, 1),
      bz("REVENANT_CATALYST", 1, 0.5),
      bz("SHARD_REVENANT", 1, 1),
      bz("ENCHANTMENT_SMITE_6", 1, 0.25),
      ah("BEHEADED_HORROR", 1, 0.1),
      bz("SHARD_PARAGON", 1, 1),
      bz("FESTERING_MAGGOT", 1, 0.1),
      bz("REVENANT_VISCERA", 1, 10),
      ah("SCYTHE_BLADE", 1, 0.2),
      ah("SHARD_OF_THE_SHREDDED", 1, 0.1),
      bz("SEVERED_HAND", 1, 0.075),
      ah("WARDEN_HEART", 1, 0.02),
    ],
    dataNote: "",
  },
  {
    id: "tarantula",
    name: "Tarantula Broodfather V",
    act: "slayer",
    boss: "spider",
    types: ["Arthropod"],
    killsPerHour: 30,
    drops: [
      bz("TARANTULA_WEB", 48, 100),
      bz("TOXIC_ARROW_POISON", 64, 5),
      bz("SPIDER_CATALYST", 1, 1),
      bz("TARANTULA_CATALYST", 1, 0.5),
      bz("ENCHANTMENT_BANE_OF_ARTHROPODS_6", 1, 0.25),
      bz("FLY_SWATTER", 1, 0.25),
      ah("TARANTULA_TALISMAN", 1, 0.25),
      bz("VIAL_OF_VENOM", 1, 0.1),
      ah("DIGESTED_MOSQUITO", 1, 0.1),
      bz("SHARD_PARAGON", 1, 0.2),
      bz("SHARD_PRIMORDIAL", 1, 1),
      ah("SHRIVELED_WASP", 1, 0.2),
      bz("ENSNARED_SNAIL", 1, 0.075),
      bz("TARANTULA_SILK", 1, 5),
      ah("PRIMORDIAL_EYE", 1, 0.02),
    ],
    dataNote: "",
  },
  {
    id: "sven",
    name: "Sven Packmaster IV",
    act: "slayer",
    boss: "wolf",
    types: ["Animal"],
    killsPerHour: 40,
    drops: [
      bz("WOLF_TOOTH", 24, 100),
      bz("HAMSTER_WHEEL", 3, 5),
      bz("FURBALL", 1, 1),
      bz("ENCHANTMENT_CRITICAL_6", 1, 0.5),
      ah("RED_CLAW_EGG", 1, 0.2),
      bz("SHARD_PARAGON", 1, 0.1),
      ah("GRIZZLY_BAIT", 1, 0.1),
      ah("OVERFLUX_CAPACITOR", 1, 0.075),
    ],
    dataNote: "",
  },
  {
    id: "voidgloom",
    name: "Voidgloom Seraph IV",
    act: "slayer",
    boss: "enderman",
    types: ["Ender"],
    killsPerHour: 25,
    drops: [
      bz("NULL_SPHERE", 48, 100),
      bz("TWILIGHT_ARROW_POISON", 64, 5),
      bz("SUMMONING_EYE", 1, 1),
      bz("ENCHANTMENT_MANA_STEAL_1", 1, 2.5),
      bz("TRANSMISSION_TUNER", 1, 2.5),
      bz("HAZMAT_ENDERMAN", 1, 1),
      bz("NULL_ATOM", 1, 5),
      bz("SHARD_PARAGON", 1, 0.1),
      bz("ENCHANTMENT_SMARTY_PANTS_1", 1, 2),
      ah("SINFUL_DICE", 1, 0.25),
      ah("ETHERWARP_MERGER", 1, 0.5),
      ah("POCKET_ESPRESSO_MACHINE", 1, 0.5),
      ah("HANDY_BLOOD_CHALICE", 1, 0.25),
      ah("EXCEEDINGLY_RARE_ENDER_ARTIFACT_UPGRADER", 1, 0.05),
      bz("ENDSTONE_IDOL", 1, 0.075),
      ah("JUDGEMENT_CORE", 1, 0.075),
    ],
    dataNote: "",
  },
  {
    id: "inferno",
    name: "Inferno Demonlord IV",
    act: "slayer",
    boss: "blaze",
    types: ["Infernal"],
    killsPerHour: 15,
    drops: [
      bz("DERELICT_ASHE", 80, 100),
      bz("ENCHANTED_BLAZE_POWDER", 16, 5),
      bz("ARROW_BUNDLE_MAGMA", 1, 5),
      bz("MANA_DISINTEGRATOR", 1, 2.5),
      bz("SCORCHED_BOOKS", 1, 1),
      bz("KELVIN_INVERTER", 1, 2.5),
      bz("CRUDE_GABAGOOL_DISTILLATE", 32, 5),
      bz("SCORCHED_POWER_CRYSTAL", 1, 2.5),
      ah("ARCHFIEND_DICE", 1, 1),
      bz("ENCHANTMENT_SMOLDERING_6", 1, 0.25),
      bz("SHARD_PARAGON", 1, 0.1),
      bz("FINE_OPAL_GEM", 1.5, 2.5),
      bz("ENCHANTMENT_ULTIMATE_REITERATE_1", 1, 2),
      ah("HIGH_CLASS_ARCHFIEND_DICE", 1, 0.25),
      ah("WILSON_ENGINEERING_PLANS", 1, 0.1),
      bz("SUBZERO_INVERTER", 1, 0.1),
    ],
    dataNote: "",
  },
  {
    id: "inquisitor",
    name: "Minos Inquisitor",
    act: "diana",
    types: ["Mythological", "Humanoid", "Elusive"],
    bestiary: "Minos Inquisitor",
    killsPerHour: 4,
    drops: [bz("ANCIENT_CLAW", 32, 100), bz("ENCHANTED_GOLD", 32, 50), bz("ENCHANTED_ANCIENT_CLAW", 2, 50), bz("ENCHANTMENT_ULTIMATE_CHIMERA_1", 1, 2.5)],
    dataNote: "Mythic Inquisitor.",
  },
  {
    id: "champion",
    name: "Minos Champion",
    act: "diana",
    types: ["Mythological", "Humanoid"],
    bestiary: "Minos Champion",
    killsPerHour: 10,
    drops: [bz("ANCIENT_CLAW", 14, 100), bz("ENCHANTED_GOLD", 14, 50), ah("MINOS_RELIC", 1, 0.15)],
    dataNote: "Mythic Champion.",
  },
  {
    id: "thunder",
    name: "Thunder",
    act: "lava",
    types: ["Magmatic", "Arcane", "Elusive"],
    bestiary: "Thunder",
    killsPerHour: 4,
    drops: [bz("MAGMA_FISH_SILVER", 4, 100), bz("SHARD_THUNDER", 1, 50), bz("ENCHANTMENT_ULTIMATE_FLASH_1", 1, 4)],
    dataNote: "",
  },
  {
    id: "jawbus",
    name: "Lord Jawbus",
    act: "lava",
    types: ["Magmatic", "Construct", "Elusive"],
    bestiary: "Lord Jawbus",
    killsPerHour: 1,
    drops: [bz("MAGMA_FISH_SILVER", 16, 100), bz("MAGMA_LORD_FRAGMENT", 1, 50), bz("BOBBIN_SCRIPTURES", 1, 2.5), bz("RADIOACTIVE_VIAL", 1, 1.25)],
    dataNote: "",
  },
  {
    id: "gws",
    name: "Great White Shark",
    act: "shark",
    types: ["Aquatic", "Animal", "Elusive"],
    bestiary: "Great White Shark",
    killsPerHour: 10,
    drops: [bz("SHARK_FIN", 16, 100), bz("GREAT_WHITE_SHARK_TOOTH", 1, 7.5), ah("CARNIVAL_TICKET", 1, 5), bz("ENCHANTED_SHARK_FIN", 1, 5)],
    dataNote: "Megalodon pet drop not priced.",
  },
  {
    id: "ghost",
    name: "Ghost",
    act: "ghost",
    types: ["Arcane", "Subterranean"],
    bestiary: "Ghost",
    killsPerHour: 300,
    drops: [
      bz("VOLTA", 1, 1),
      bz("SORROW", 1, 0.4),
      bz("PLASMA", 1, 0.4),
      ah("GHOST_BOOTS", 1, 0.02),
      { id: "COINS", qty: 1_000_000, chance: 0.01, market: "coins", src: "W" },
    ],
    dataNote: "",
  },
];

/** Mob type -> the attribute shard that gives +5 Magic Find against it (NEU-REPO attribute_shards.json). */
export const TYPE_SHARD: Record<string, string> = {
  Undead: "SHARD_DROWNED",
  Arthropod: "SHARD_BLACK_WIDOW",
  Animal: "SHARD_WILD_HOG",
  Elusive: "SHARD_HIDEYHO",
  Airborne: "SHARD_PARAKEET",
  Frozen: "SHARD_BILLYGOAT",
  Subterranean: "SHARD_CHUCKWALLA",
  Cubic: "SHARD_HIVETHIEF",
  Construct: "SHARD_WIKI_TIKI",
  Aquatic: "SHARD_GIANT_WATER_BUG",
  Critter: "SHARD_HEWVER",
  Woodland: "SHARD_HIDEONFLOOR",
  Arcane: "SHARD_HIDEONWALL",
  Magmatic: "SHARD_LAVA_FLAME",
  Mythological: "SHARD_MINOTAUR",
};

/** Every drop item that needs a price. */
export function dropQuotes(): { id: string; market: Market }[] {
  const seen = new Map<string, Market>();
  for (const m of MOBS) for (const d of m.drops) if (d.market !== "coins") seen.set(d.id, d.market);
  return [...seen].map(([id, market]) => ({ id, market }));
}
