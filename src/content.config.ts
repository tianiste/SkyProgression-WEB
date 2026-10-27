import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";
import { guideSchema, person } from "./schema/guide";
import { PERK_IDS } from "./data/perks";

const guides = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/guides" }),
  schema: guideSchema,
});

/** HOTM trees: perk ID to level ("max", or a number; 1 means unlocked only to reach other perks). */
const trees = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/trees" }),
  schema: z.object({
    title: z.string(),
    method: z.string(),
    status: z.enum(["published", "coming-soon"]),
    order: z.number().default(100),
    author: person.optional(),
    hotm: z.number().int().min(1).max(10).optional(),
    ability: z.enum(["mining_speed_boost", "maniac_miner", "pickobulus", "anomalous_desire", "gemstone_infusion", "sheer_force"]).optional(),
    perks: z.partialRecord(z.enum(PERK_IDS), z.union([z.literal("max"), z.number().int().min(1)])).default({}),
    disabled: z.array(z.enum(PERK_IDS)).default([]),
    note: z.string().optional(),
  }),
});

const attributes = defineCollection({
  loader: file("./src/content/attributes.yaml"),
  schema: z.object({
    name: z.string(),
    shard: z.string(),
    rarity: z.enum(["Common", "Uncommon", "Rare", "Epic", "Legendary"]),
    family: z.enum(["stat", "misc", "intelligence"]),
    effect: z.string(),
    note: z.string().optional(),
  }),
});

const stats = defineCollection({
  loader: file("./src/content/stats.yaml"),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    summary: z.string().optional(),
    totals: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    sources: z.array(
      z.object({
        group: z.string(),
        source: z.string(),
        value: z.string(),
        note: z.string().optional(),
      }),
    ),
  }),
});

export const collections = { guides, trees, attributes, stats };
