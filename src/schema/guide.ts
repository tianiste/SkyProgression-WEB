import { z } from "astro/zod";
import { PERK_IDS } from "../data/perks";
import { HOTF_PERK_IDS } from "../data/hotf";
import { PEOPLE_IDS } from "../data/people";

/**
 * Guide data model. Requirements use the IDs the Hypixel API and the SkyProgression engine use (item IDs, pet types,
 * HOTM perk IDs, attribute IDs), so the same file can be checked against a player's profile later.
 * The JSON Schema served at /schema/guide.json is generated from this file.
 * Objects are strict: an unquoted comma in a `{ note: a, b }` flow mapping turns "b" into a key, which would otherwise
 * be dropped silently and leave the shown text cut off.
 */

const slug = z.string().regex(/^[a-z0-9-]+$/, "lowercase letters, digits and dashes");
const snake = z.string().regex(/^[a-z0-9_]+$/, "lowercase snake_case ID");
const hypixelId = z.string().regex(/^[A-Z0-9_:]+$/, "Hypixel ID in UPPER_SNAKE_CASE");

/** A credit: a key in src/data/people.ts plus what they made. */
export const person = z.strictObject({
  id: z.enum(PEOPLE_IDS),
  role: z.string().optional(),
});

export const tier = z.enum(["budget", "max"]).describe("Missing means the entry applies to both tiers.");
export const priority = z.enum(["required", "recommended", "optional"]);
export const group = z.enum([
  "drill",
  "axe",
  "rod",
  "tools",
  "armor",
  "equipment",
  "pet",
  "accessories",
  "attributes",
  "consumables",
  "hotm",
  "progress",
  "other",
]);
export const gemType = z.enum(["RUBY", "AMBER", "SAPPHIRE", "JADE", "AMETHYST", "TOPAZ", "JASPER", "OPAL", "ONYX", "AQUAMARINE", "CITRINE", "PERIDOT"]);
export const gemQuality = z.enum(["ROUGH", "FLAWED", "FINE", "FLAWLESS", "PERFECT"]);
export const rarity = z.enum(["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC"]);
export const powderType = z.enum(["mithril", "gemstone", "glacite"]);

export const modifier = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("recomb") }),
  z.strictObject({ kind: z.literal("reforge"), id: snake, stone: z.string().optional() }),
  z.strictObject({ kind: z.literal("gem"), gem: gemType, quality: gemQuality, count: z.number().int().min(1).default(1) }),
  z.strictObject({ kind: z.literal("enchant"), id: snake, level: z.number().int().min(1) }),
  z.strictObject({ kind: z.literal("drill_part"), slot: z.enum(["engine", "tank", "module"]), item: hypixelId }),
  z.strictObject({ kind: z.literal("applied"), item: hypixelId, count: z.number().int().min(1).default(1) }),
  z.strictObject({ kind: z.literal("note"), text: z.string() }),
]);

const base = {
  id: slug,
  /** Shown text. Optional for kinds whose name comes from the ID, required for manual entries. */
  label: z.string().optional(),
  tier: tier.optional(),
  group,
  priority: priority.optional(),
  note: z.string().optional(),
  /** IDs of entries in this guide that should be done first. */
  prerequisites: z.array(slug).optional(),
  /** The entry in the guide's stages this belongs to; staged entries show in order under that stage. */
  stage: slug.optional(),
};

const leaf = [
  z.strictObject({ ...base, kind: z.literal("item"), item: hypixelId, count: z.number().int().min(1).default(1), modifiers: z.array(modifier).default([]) }),
  z.strictObject({
    ...base,
    kind: z.literal("pet"),
    pet: z.strictObject({
      type: hypixelId,
      minTier: rarity,
      level: z.number().int().min(1).max(200).default(100),
      item: hypixelId.optional(),
    }),
  }),
  z.strictObject({ ...base, kind: z.literal("hotm"), perk: z.enum(PERK_IDS), level: z.union([z.number().int().min(1), z.literal("max")]) }),
  z.strictObject({ ...base, kind: z.literal("hotf"), perk: z.enum(HOTF_PERK_IDS), level: z.union([z.number().int().min(1), z.literal("max")]) }),
  z.strictObject({ ...base, kind: z.literal("powder"), powder: powderType, amount: z.number().int().min(0) }),
  z.strictObject({ ...base, kind: z.literal("attribute"), attribute: snake, level: z.number().int().min(1).max(10).default(10) }),
  z.strictObject({ ...base, kind: z.literal("essence"), essence: z.enum(["GOLD", "DIAMOND", "FOSSIL", "ICE", "CRIMSON", "WITHER"]), perk: snake, level: z.number().int().min(1) }),
  z.strictObject({ ...base, kind: z.literal("accessory"), item: hypixelId, modifiers: z.array(modifier).default([]) }),
  z.strictObject({ ...base, kind: z.literal("collection"), collection: hypixelId, level: z.number().int().min(1) }),
  z.strictObject({ ...base, kind: z.literal("skill"), skill: z.enum(["MINING", "HOTM"]), level: z.number().int().min(1) }),
  z.strictObject({ ...base, kind: z.literal("consumable"), item: hypixelId, count: z.number().int().min(1).default(1) }),
  z.strictObject({ ...base, kind: z.literal("manual"), label: z.string() }),
] as const;

export const leafRequirement = z.discriminatedUnion("kind", [...leaf]);

export const requirement = z.discriminatedUnion("kind", [
  ...leafRequirement.options,
  z.strictObject({
    ...base,
    kind: z.literal("any_of"),
    label: z.string(),
    /** Alternatives: any one of them completes the entry. */
    options: z.array(leafRequirement).min(2),
  }),
]);

export const hotmPreset = z.strictObject({
  label: z.string(),
  hotm: z.number().int().min(1).max(10),
  tokens: z.number().int().min(1).optional(),
  cotm: z.number().int().min(0).max(10).optional(),
  powder: z.strictObject({ mithril: z.number().int().optional(), gemstone: z.number().int().optional(), glacite: z.number().int().optional() }),
  /** Tree in the HOTM tree collection, when a confirmed picture exists. */
  tree: slug.optional(),
  note: z.string().optional(),
});

export const guideSchema = z.strictObject({
  title: z.string(),
  /** Matches the mod's MiningMethod names when the mod covers the method. */
  method: z.array(z.enum(["COAL", "GOLD", "GROTTO", "UMBER", "SHAFTING", "OBSIDIAN", "TUNGSTEN", "MF_GEMS", "MF_RUBY", "MF_TOPAZ", "RED_SAND", "MYCELIUM", "END_STONE", "COBBLESTONE"])).default([]),
  category: z.enum(["gemstones", "dwarven-metals", "ores", "blocks", "foraging", "fishing-basics", "fishing-methods", "other"]),
  summary: z.string(),
  authors: z.array(person).min(1),
  contributors: z.array(person).default([]),
  source: z.strictObject({ name: z.string(), posted: z.coerce.date().optional() }),
  updated: z.coerce.date(),
  where: z.string(),
  blocks: z.array(z.string()).default([]),
  rates: z.array(z.strictObject({ label: z.string(), value: z.string(), note: z.string().optional() })).default([]),
  ratesMeasured: z.string().optional(),
  /**
   * Dated notices shown at the top: "outdated" when the author marked the source thread outdated, "stale" when a later
   * game change makes part of the advice wrong and the text has not been corrected yet. Corrected advice drops the
   * notice and is listed under the guide's "Updates since the guide" section instead.
   */
  notices: z.array(z.strictObject({
    status: z.enum(["outdated", "stale"]),
    date: z.coerce.date(),
    text: z.string(),
    source: z.strictObject({ label: z.string(), url: z.url() }).optional(),
  })).default([]),
  hotm: z.array(hotmPreset).default([]),
  /** Trees in the HotF collection shown on this guide. */
  hotf: z.array(slug).default([]),
  /** Ordered upgrade stages. Requirements point at one with `stage`; the page lists them in this order. */
  stages: z.array(z.strictObject({ id: slug, title: z.string(), summary: z.string() })).default([]),
  videos: z.array(z.strictObject({ title: z.string(), url: z.url(), by: z.string().optional() })).default([]),
  requirements: z.array(requirement),
});

export type Guide = z.infer<typeof guideSchema>;
export type Requirement = z.infer<typeof requirement>;
export type LeafRequirement = z.infer<typeof leafRequirement>;
export type Modifier = z.infer<typeof modifier>;
