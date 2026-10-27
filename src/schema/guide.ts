import { z } from "astro/zod";
import { PERK_IDS } from "../data/perks";
import { PEOPLE_IDS } from "../data/people";

/**
 * Guide data model. Requirements use the IDs the Hypixel API and the SkyProgression engine use (item IDs, pet types,
 * HOTM perk IDs, attribute IDs), so the same file can be checked against a player's profile later.
 * The JSON Schema served at /schema/guide.json is generated from this file.
 */

const slug = z.string().regex(/^[a-z0-9-]+$/, "lowercase letters, digits and dashes");
const snake = z.string().regex(/^[a-z0-9_]+$/, "lowercase snake_case ID");
const hypixelId = z.string().regex(/^[A-Z0-9_:]+$/, "Hypixel ID in UPPER_SNAKE_CASE");

/** A credit: a key in src/data/people.ts plus what they made. */
export const person = z.object({
  id: z.enum(PEOPLE_IDS),
  role: z.string().optional(),
});

export const tier = z.enum(["budget", "max"]).describe("Missing means the entry applies to both tiers.");
export const priority = z.enum(["required", "recommended", "optional"]);
export const group = z.enum([
  "drill",
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
  z.object({ kind: z.literal("recomb") }),
  z.object({ kind: z.literal("reforge"), id: snake, stone: z.string().optional() }),
  z.object({ kind: z.literal("gem"), gem: gemType, quality: gemQuality, count: z.number().int().min(1).default(1) }),
  z.object({ kind: z.literal("enchant"), id: snake, level: z.number().int().min(1) }),
  z.object({ kind: z.literal("drill_part"), slot: z.enum(["engine", "tank", "module"]), item: hypixelId }),
  z.object({ kind: z.literal("applied"), item: hypixelId, count: z.number().int().min(1).default(1) }),
  z.object({ kind: z.literal("note"), text: z.string() }),
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
};

const leaf = [
  z.object({ ...base, kind: z.literal("item"), item: hypixelId, count: z.number().int().min(1).default(1), modifiers: z.array(modifier).default([]) }),
  z.object({
    ...base,
    kind: z.literal("pet"),
    pet: z.object({
      type: hypixelId,
      minTier: rarity,
      level: z.number().int().min(1).max(200).default(100),
      item: hypixelId.optional(),
    }),
  }),
  z.object({ ...base, kind: z.literal("hotm"), perk: z.enum(PERK_IDS), level: z.union([z.number().int().min(1), z.literal("max")]) }),
  z.object({ ...base, kind: z.literal("powder"), powder: powderType, amount: z.number().int().min(0) }),
  z.object({ ...base, kind: z.literal("attribute"), attribute: snake, level: z.number().int().min(1).max(10).default(10) }),
  z.object({ ...base, kind: z.literal("essence"), essence: z.enum(["GOLD", "DIAMOND", "FOSSIL", "ICE", "CRIMSON", "WITHER"]), perk: snake, level: z.number().int().min(1) }),
  z.object({ ...base, kind: z.literal("accessory"), item: hypixelId, modifiers: z.array(modifier).default([]) }),
  z.object({ ...base, kind: z.literal("collection"), collection: hypixelId, level: z.number().int().min(1) }),
  z.object({ ...base, kind: z.literal("skill"), skill: z.enum(["MINING", "HOTM"]), level: z.number().int().min(1) }),
  z.object({ ...base, kind: z.literal("consumable"), item: hypixelId, count: z.number().int().min(1).default(1) }),
  z.object({ ...base, kind: z.literal("manual"), label: z.string() }),
] as const;

export const leafRequirement = z.discriminatedUnion("kind", [...leaf]);

export const requirement = z.discriminatedUnion("kind", [
  ...leafRequirement.options,
  z.object({
    ...base,
    kind: z.literal("any_of"),
    label: z.string(),
    /** Alternatives: any one of them completes the entry. */
    options: z.array(leafRequirement).min(2),
  }),
]);

export const hotmPreset = z.object({
  label: z.string(),
  hotm: z.number().int().min(1).max(10),
  tokens: z.number().int().min(1).optional(),
  cotm: z.number().int().min(0).max(10).optional(),
  powder: z.object({ mithril: z.number().int().optional(), gemstone: z.number().int().optional(), glacite: z.number().int().optional() }),
  /** Tree in the HOTM tree collection, when a confirmed picture exists. */
  tree: slug.optional(),
  note: z.string().optional(),
});

export const guideSchema = z.object({
  title: z.string(),
  /** Matches the mod's MiningMethod names when the mod covers the method. */
  method: z.array(z.enum(["COAL", "GOLD", "GROTTO", "UMBER", "SHAFTING", "OBSIDIAN", "TUNGSTEN", "MF_GEMS", "MF_RUBY", "MF_TOPAZ", "RED_SAND", "MYCELIUM", "END_STONE", "COBBLESTONE"])).default([]),
  category: z.enum(["gemstones", "dwarven-metals", "ores", "blocks", "other"]),
  summary: z.string(),
  authors: z.array(person).min(1),
  contributors: z.array(person).default([]),
  source: z.object({ name: z.string(), posted: z.coerce.date().optional() }),
  updated: z.coerce.date(),
  where: z.string(),
  blocks: z.array(z.string()).default([]),
  rates: z.array(z.object({ label: z.string(), value: z.string(), note: z.string().optional() })).default([]),
  ratesMeasured: z.string().optional(),
  hotm: z.array(hotmPreset).default([]),
  videos: z.array(z.object({ title: z.string(), url: z.url(), by: z.string().optional() })).default([]),
  requirements: z.array(requirement),
});

export type Guide = z.infer<typeof guideSchema>;
export type Requirement = z.infer<typeof requirement>;
export type LeafRequirement = z.infer<typeof leafRequirement>;
export type Modifier = z.infer<typeof modifier>;
