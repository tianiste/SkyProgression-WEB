/**
 * Icon lookup. Textures come from the FurfSky Reborn pack (imported by scripts/import-icons.mjs); anything without a
 * texture gets one of the site's own pixel glyphs. Guide data never names icons: it is all keyed by IDs.
 */
import generated from "../data/icons.generated.json";
import map from "../data/icon-map.json";
import type { LeafRequirement, Modifier, Requirement } from "../schema/guide";
import { perkById } from "../data/perks";

export type Glyph = "item" | "pet" | "shard" | "book" | "note" | "skill" | "fortune" | "speed" | "pristine" | "spread" | "heat" | "cold" | "wisdom" | "pin" | "coin";

export type Icon =
  | { kind: "texture"; src: string; size: number; smooth?: boolean }
  | { kind: "swatch"; color: string }
  | { kind: "glyph"; glyph: Glyph; color?: string };

const items = generated.items as Record<string, { file: string; size: number; source?: string }>;
const hotm = generated.hotm as Record<string, string>;

export const FALLBACK: Icon = { kind: "glyph", glyph: "item" };

export function itemIcon(id: string | undefined, fallback: Icon = FALLBACK): Icon {
  const t = id ? items[id] : undefined;
  // Heads are rendered 3D cubes with smooth edges, not pixel art.
  return t ? { kind: "texture", src: `/icons/${t.file}`, size: t.size, smooth: t.source === "head" } : fallback;
}

/** An icon-map value: an item ID or a #hex colour. */
function mapped(value: string | undefined, fallback: Icon = FALLBACK): Icon {
  if (!value) return fallback;
  return value.startsWith("#") ? { kind: "swatch", color: value } : itemIcon(value, fallback);
}

export const guideIcon = (id: string) => mapped((map.guide as Record<string, string>)[id]);
export const categoryIcon = (id: string) => mapped((map.category as Record<string, string>)[id]);
export const powderIcon = (id: string) => mapped((map.powder as Record<string, string>)[id]);

export function groupIcon(group: string): Icon {
  if (group === "pet") return itemIcon("SCATHA", { kind: "glyph", glyph: "pet" });
  if (group === "attributes") return { kind: "glyph", glyph: "shard" };
  return mapped((map.group as Record<string, string>)[group]);
}

export const gemIcon = (gem: string, quality: string) => itemIcon(`${quality}_${gem}_GEM`);

export const RARITY_COLOR: Record<string, string> = {
  Common: "var(--r-common)",
  Uncommon: "var(--r-uncommon)",
  Rare: "var(--r-rare)",
  Epic: "var(--r-epic)",
  Legendary: "var(--r-legendary)",
};
export const shardIcon = (rarity?: string): Icon => ({ kind: "glyph", glyph: "shard", color: rarity ? RARITY_COLOR[rarity] : undefined });

export function modifierIcon(m: Modifier): Icon {
  switch (m.kind) {
    case "recomb":
      return itemIcon(map.applied.recomb);
    case "reforge":
      return mapped((map.reforgeStone as Record<string, string>)[m.id]);
    case "gem":
      return gemIcon(m.gem, m.quality);
    case "enchant":
      return { kind: "glyph", glyph: "book" };
    case "drill_part":
    case "applied":
      return itemIcon(m.item);
    case "note":
      return { kind: "glyph", glyph: "note" };
  }
}

/**
 * FurfSky's own tile for a HOTM perk in a state ("maxed", "unlocked|maxed" to try in order). Only perks the pack draws
 * as a node have one (abilities, Core of the Mountain and a few key perks); the rest are connector lines in the pack.
 */
export function hotmPiece(perkId: string, state: string): string | undefined {
  const p = perkById.get(perkId);
  if (!p) return undefined;
  const at = `${10 - p.y}_${p.x + 1}`;
  for (const s of state.split("|")) {
    const file = hotm[`${at}_${s}`];
    if (file && /hotm_(\d+_\d+|core)_/.test(file)) return `/icons/${file}`;
  }
  return undefined;
}

export function requirementIcon(r: Requirement | LeafRequirement, rarityOf?: (attribute: string) => string | undefined): Icon {
  switch (r.kind) {
    case "item":
    case "accessory":
    case "consumable":
      return itemIcon(r.item);
    case "pet":
      return itemIcon(r.pet.type, { kind: "glyph", glyph: "pet" });
    case "attribute":
      return shardIcon(rarityOf?.(r.attribute));
    case "hotm": {
      const src = hotmPiece(r.perk, "maxed");
      return src ? { kind: "texture", src, size: 32 } : { kind: "glyph", glyph: "skill" };
    }
    case "collection":
      return itemIcon(r.collection);
    case "powder":
      return powderIcon(r.powder);
    case "essence":
    case "skill":
      return { kind: "glyph", glyph: "skill" };
    case "any_of":
      return r.options.map((o) => requirementIcon(o, rarityOf)).find((i) => i.kind === "texture") ?? FALLBACK;
    case "manual":
      return { kind: "glyph", glyph: "note" };
  }
}

/** Stat symbol for a stat source section. */
export const STAT_GLYPHS: Record<string, Glyph[]> = {
  "fortune-speed": ["fortune", "speed"],
  "mining-spread": ["spread"],
  "heat-resistance": ["heat"],
  "cold-resistance": ["cold"],
  "mining-wisdom": ["wisdom"],
  pristine: ["pristine"],
  gemstone: ["fortune", "speed"],
  "gemstone-spread": ["spread"],
  block: ["fortune"],
  "dwarven-metal": ["fortune", "speed"],
  ore: ["fortune", "speed"],
  max: ["fortune", "speed"],
};
