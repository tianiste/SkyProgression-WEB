import { dropQuotes } from "./mobs";

// How each Magic Find source is priced from market data. Shared by the price list in
// SkyProgression-API (src/magic-find-ids.json, which ids to fetch)
// and the page (how to turn the price bundle into a cost per source). Item ids were checked against
// the live Hypixel items resource and Bazaar on 2026-11-16.

export type Market = "bazaar" | "ah";

export interface Part {
  /** SkyBlock item id. */
  id: string;
  qty: number;
  market: Market;
  /** Auction House only: price this rarity (lowest BIN with a Rarity filter). */
  rarity?: string;
}

export interface PriceSpec {
  parts: Part[];
  /**
   * The quantity needed is not known (for example attribute shards to max at an unknown rarity).
   * The page shows the unit price but leaves the cost to the user.
   */
  qtyUnknown?: boolean;
  /** Short description of what is priced, shown next to the price. */
  label: string;
}

const bz = (id: string, qty = 1): Part => ({ id, qty, market: "bazaar" });
const ah = (id: string, qty = 1, rarity?: string): Part => ({ id, qty, market: "ah", ...(rarity ? { rarity } : {}) });

/** Sources without an entry (event shops, Carnival tickets, island upgrades, NPC prices) keep their fixed price. */
export const PRICE_SPECS: Record<string, PriceSpec> = {
  loot6: { parts: [bz("ENCHANTMENT_LOOTING_6")], label: "Looting VI book" },
  loot7: { parts: [bz("ENCHANTMENT_LOOTING_7")], label: "Looting VII book" },
  // Legendary shards need 1+1+1+2+2+2+3+3+4+5 = 24 to reach level 10.
  cinder: { parts: [bz("SHARD_CINDER_BAT", 24)], label: "24 Cinderbat Shards" },
  dgift: { parts: [bz("ENCHANTMENT_DIVINE_GIFT_1", 5)], label: "5 × the old Divine Gift I book" },
  pulseR: { parts: [ah("PULSE_RING", 1, "RARE")], label: "Rare Pulse Ring" },
  pulseE: { parts: [ah("THUNDER_IN_A_BOTTLE", 17)], label: "17 Thunder in a Bottle" },
  pulseL: { parts: [ah("THUNDER_IN_A_BOTTLE", 80)], label: "80 Thunder in a Bottle" },
  anguish: { parts: [ah("ANGUISH_ARTIFACT")], label: "Anguish Artifact" },
  cake: { parts: [ah("EPOCH_CAKE_BLACK")], label: "Century Cake" },
  ladder: { parts: [ah("NECRONS_LADDER")], label: "Necron's Ladder" },
  clover: { parts: [ah("CLOVER_HELMET")], label: "Clover Helmet" },
  shuriken: { parts: [bz("FAKE_SHURIKEN")], label: "Extremely Real Shuriken" },
  jar: { parts: [bz("CELESTIAL_MASON_JAR")], label: "Celestial Mason Jar" },
  wolffur: { parts: [ah("WOLF_FUR_MIXIN")], label: "Wolf Fur Mixin" },
  haban: { parts: [bz("ENCHANTMENT_ULTIMATE_HABANERO_TACTICS_5")], label: "Habanero Tactics V book" },
  // Rare shards need 1+2+3+3+4+4+5+6+8+12 = 48 to reach level 10 (NotEnoughUpdates-REPO attribute_shards.json).
  minoshard: { parts: [bz("SHARD_MINOTAUR", 48)], label: "48 Minotaur Shards" },
  fish: { parts: [ah("FOUR_EYED_FISH")], label: "Four-Eyed Fish" },
  greed: { parts: [ah("CROWN_OF_GREED")], label: "Crown of Greed" },
  avarice: { parts: [ah("CROWN_OF_AVARICE")], label: "Crown of Avarice (counter not included)" },
  fleece: { parts: [ah("GOLDEN_FLEECE")], label: "Golden Fleece" },
  lavashard: { parts: [bz("SHARD_LAVA_FLAME", 48)], label: "48 Lava Flame Shards" },
  magma4: {
    parts: [ah("MAGMA_LORD_CHESTPLATE"), ah("MAGMA_LORD_LEGGINGS"), ah("MAGMA_LORD_BOOTS"), ah("MAGMA_LORD_GAUNTLET")],
    label: "Magma Lord chestplate, leggings, boots and necklace",
  },
  magma5: { parts: [ah("MAGMA_LORD_HELMET")], label: "Magma Lord Helmet" },
  sharktooth: { parts: [ah("RAZOR_SHARP_SHARK_TOOTH_NECKLACE")], label: "Shark Tooth Heirloom" },
  ribery: { parts: [ah("PHD_GRIMOIRE")], label: "PhD's Grimoire" },
  bracelet: { parts: [ah("SHRIVELED_BRACELET")], label: "Shriveled Bracelet" },
  odger: { parts: [ah("ODGERS_DIAMOND_TOOTH")], label: "Odger's Diamond Tooth" },
  bobbinL: { parts: [bz("ENCHANTMENT_ULTIMATE_BOBBIN_TIME_5")], label: "Bobbin' Time V book" },
  bobbinS: { parts: [bz("ENCHANTMENT_ULTIMATE_BOBBIN_TIME_5")], label: "Bobbin' Time V book" },
  // Mob-type shards: all Rare, 48 to reach level 10.
  shard_undead: { parts: [bz("SHARD_DROWNED", 48)], label: "48 Drowned Shards" },
  shard_arthropod: { parts: [bz("SHARD_BLACK_WIDOW", 48)], label: "48 Black Widow Shards" },
  shard_animal: { parts: [bz("SHARD_WILD_HOG", 48)], label: "48 Wild Hog Shards" },
  shard_elusive: { parts: [bz("SHARD_HIDEYHO", 48)], label: "48 Hideyho Shards" },
  shard_airborne: { parts: [bz("SHARD_PARAKEET", 48)], label: "48 Parakeet Shards" },
  shard_frozen: { parts: [bz("SHARD_BILLYGOAT", 48)], label: "48 Billygoat Shards" },
  shard_subterranean: { parts: [bz("SHARD_CHUCKWALLA", 48)], label: "48 Chuckwalla Shards" },
  shard_cubic: { parts: [bz("SHARD_HIVETHIEF", 48)], label: "48 Hivethief Shards" },
  shard_construct: { parts: [bz("SHARD_WIKI_TIKI", 48)], label: "48 Wiki Tiki Shards" },
  shard_aquatic: { parts: [bz("SHARD_GIANT_WATER_BUG", 48)], label: "48 Giant Water Bug Shards" },
  shard_critter: { parts: [bz("SHARD_HEWVER", 48)], label: "48 Hewver Shards" },
  shard_woodland: { parts: [bz("SHARD_HIDEONFLOOR", 48)], label: "48 Hideonfloor Shards" },
  shard_arcane: { parts: [bz("SHARD_HIDEONWALL", 48)], label: "48 Hideonwall Shards" },
  sorrow: {
    parts: [ah("SORROW_HELMET"), ah("SORROW_CHESTPLATE"), ah("SORROW_LEGGINGS"), ah("SORROW_BOOTS")],
    label: "4 Sorrow Armor pieces",
  },
};

/** Key of one quote in the bundle: the item id, plus ";RARITY" for a rarity-filtered Auction House quote (SkyProgression-API's key). */
export const quoteKey = (p: Pick<Part, "id" | "rarity">): string => (p.rarity ? `${p.id};${p.rarity}` : p.id);

/** Every quote the page needs, by market (SkyProgression-API src/magic-find-ids.json lists the same ids). */
export function wantedQuotes(): { bazaar: string[]; ah: Part[] } {
  const bazaar = new Set<string>();
  const ahParts = new Map<string, Part>();
  for (const spec of Object.values(PRICE_SPECS)) {
    for (const p of spec.parts) {
      if (p.market === "bazaar") bazaar.add(p.id);
      else ahParts.set(quoteKey(p), p);
    }
  }
  for (const d of dropQuotes()) {
    if (d.market === "bazaar") bazaar.add(d.id);
    else ahParts.set(d.id, { id: d.id, qty: 1, market: "ah" });
  }
  return { bazaar: [...bazaar], ah: [...ahParts.values()] };
}

export interface Quote {
  /** Instant-buy price per unit in coins; 0 when nobody is selling. */
  buy: number;
  market: Market;
  /** ISO time the quote was taken. */
  at: string;
}

export interface PriceBundle {
  version: 1;
  updatedAt: string;
  bazaarAt: string;
  quotes: Record<string, Quote>;
}
