/** Display names for the Hypixel item, pet and collection IDs used in guides. Unknown IDs fall back to a readable form. */
const NAMES: Record<string, string> = {
  // Drills and tools
  JUNGLE_PICKAXE: "Jungle Pickaxe",
  MITHRIL_DRILL_1: "Mithril Drill SX-R226",
  MITHRIL_DRILL_2: "Mithril Drill SX-R326",
  TITANIUM_DRILL_1: "Titanium Drill DR-X355",
  TITANIUM_DRILL_2: "Titanium Drill DR-X455",
  TITANIUM_DRILL_3: "Titanium Drill DR-X555",
  TITANIUM_DRILL_4: "Titanium Drill DR-X655",
  GEMSTONE_DRILL_4: "Jasper Drill X",
  DIVAN_DRILL: "Divan's Drill",
  FLINT_SHOVEL: "Flint Shovel",
  PROMISING_SPADE: "Promising Shovel",
  ROGUE_SWORD: "Rogue Sword",
  WEIRDER_TUBA: "Weirder Tuba",
  GLOOMLOCK_GRIMOIRE: "Gloomlock Grimoire",
  ASPECT_OF_THE_VOID: "Aspect of the Void",
  GEMSTONE_GAUNTLET: "Gemstone Gauntlet",
  WILL_O_WISP: "Will-o'-wisp",
  GLACITE_LANTERN: "Glacite Lantern",
  // Drill parts and applied upgrades
  AMBER_POLISHED_DRILL_ENGINE: "Amber-Polished Drill Engine",
  SAPPHIRE_POLISHED_DRILL_ENGINE: "Sapphire-Polished Drill Engine",
  RUBY_POLISHED_DRILL_ENGINE: "Ruby-Polished Drill Engine",
  TITANIUM_DRILL_ENGINE: "Titanium-Plated Drill Engine",
  PERFECTLY_CUT_FUEL_TANK: "Perfectly-Cut Fuel Tank",
  GEMSTONE_FUEL_TANK: "Gemstone Fuel Tank",
  TITANIUM_FUEL_TANK: "Titanium-Infused Fuel Tank",
  GOBLIN_OMELETTE_BLUE_CHEESE: "Blue Cheese Goblin Omelette",
  GOBLIN_OMELETTE_SUNNY_SIDE: "Sunny Side Goblin Omelette",
  DIVAN_POWDER_COATING: "Divan's Powder Coating",
  POLARVOID_BOOK: "Polarvoid Book",
  AMBER_POWER_SCROLL: "Amber Power Scroll",
  MANA_DISINTEGRATOR: "Mana Disintegrator",
  // Armor
  DIVAN_HELMET: "Helmet of Divan",
  DIVAN_CHESTPLATE: "Chestplate of Divan",
  DIVAN_LEGGINGS: "Leggings of Divan",
  DIVAN_BOOTS: "Boots of Divan",
  MINERAL_HELMET: "Mineral Helmet",
  MINERAL_CHESTPLATE: "Mineral Chestplate",
  MINERAL_LEGGINGS: "Mineral Leggings",
  MINERAL_BOOTS: "Mineral Boots",
  GLOSSY_MINERAL_HELMET: "Glossy Mineral Helmet",
  GLOSSY_MINERAL_CHESTPLATE: "Glossy Mineral Chestplate",
  GLOSSY_MINERAL_LEGGINGS: "Glossy Mineral Leggings",
  GLOSSY_MINERAL_BOOTS: "Glossy Mineral Boots",
  // Equipment
  DIVAN_PENDANT: "Pendant of Divan",
  DWARVEN_HANDWARMERS: "Dwarven Handwarmers",
  SAPPHIRE_CLOAK: "Sapphire Cloak",
  JADE_BELT: "Jade Belt",
  AMETHYST_GAUNTLET: "Amethyst Gauntlet",
  DRAGONFADE_CLOAK: "Dragonfade Cloak",
  ANCIENT_CLOAK: "Ancient Cloak",
  TITANIUM_NECKLACE: "Titanium Necklace",
  TITANIUM_CLOAK: "Titanium Cloak",
  TITANIUM_BELT: "Titanium Belt",
  TITANIUM_GAUNTLET: "Titanium Gauntlet",
  // Accessories
  POWER_RELIC: "Relic of Power",
  POWER_ARTIFACT: "Artifact of Power",
  MINERAL_TALISMAN: "Mineral Talisman",
  GLOSSY_MINERAL_TALISMAN: "Glossy Mineral Talisman",
  TITANIUM_RELIC: "Titanium Relic",
  HASTE_ARTIFACT: "Haste Artifact",
  SPEED_RELIC: "Speed Relic",
  JUNGLE_AMULET: "Jungle Amulet",
  MAGIC_8_BALL: "Magic 8 Ball",
  DWARVEN_METAL: "Dwarven Metal Talisman",
  PERSONAL_COMPACTOR_7000: "Personal Compactor 7000",
  FRIED_FROZEN_CHICKEN: "Fried Frozen Chicken",
  // Pets and pet items
  SCATHA: "Scatha",
  GOBLIN: "Goblin",
  BAL: "Bal",
  GLACITE_GOLEM: "Glacite Golem",
  BLACK_CAT: "Black Cat",
  ENDERMITE: "Endermite",
  SNAIL: "Snail",
  KUUDRA: "Kuudra",
  MAMMOTH: "Mammoth",
  CROW: "Crow",
  PET_ITEM_QUICK_CLAW: "Quick Claw",
  HEPHAESTUS_RELIC: "Hephaestus Relic",
  BEJEWELED_COLLAR: "Bejeweled Collar",
  MINOS_RELIC: "Minos Relic",
  UNALLOYED_SPEED: "Unalloyed Speed",
  DWARF_TURTLE_SHELMET: "Dwarf Turtle Shelmet",
  // Consumables
  DWARVEN_OS_ORE_OATS: "Dwarven O's Ore Oats",
  DWARVEN_OS_BLOCK_BRAN: "Dwarven O's Block Bran",
  DWARVEN_OS_METALLIC_MINIS: "Dwarven O's Metallic Minis",
  DWARVEN_OS_GEMSTONE_GRAHAMS: "Dwarven O's Gemstone Grahams",
  FILET_O_FORTUNE: "Filet O' Fortune",
  REAPER_PEPPER: "Reaper Pepper",
  // Collections
  GLACITE: "Glacite",
  UMBER: "Umber",
  TUNGSTEN: "Tungsten",
  OBSIDIAN: "Obsidian",
  // Essence shop perks
  eager_miner: "Eager Miner",
  rhinestone_infusion: "Rhinestone Infusion",
  dwarven_expertise: "Dwarven Expertise",
  frozen_skin: "Frozen Skin",
  eager_adventurer: "Eager Adventurer",
  fungus_fortuna: "Fungus Fortuna",
  harena_fortuna: "Harena Fortuna",
  forbidden_speed: "Forbidden Speed",
};

const REFORGE_STONES: Record<string, string> = {
  lustrous: "Gleaming Crystal",
  stellar: "Petrified Starfall",
  auspicious: "Dwarven Geode",
  heated: "Scorched Topaz",
  glacial: "Frigid Husk",
  fleet: "Diamonite",
  ambered: "Amber Material",
  jaded: "Jaderald",
  blazing: "Blazen Sphere",
  royal: "Dwarven Treasure",
  heroic: "",
};

export function itemName(id: string): string {
  return NAMES[id] ?? titleCase(id);
}

export function reforgeStone(id: string, stone?: string): string | undefined {
  return stone ?? (REFORGE_STONES[id] || undefined);
}

export function titleCase(id: string): string {
  return id
    .toLowerCase()
    .split(/[_-]/)
    .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export const KNOWN_IDS = new Set(Object.keys(NAMES));
