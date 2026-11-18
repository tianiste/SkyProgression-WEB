// Reads the Magic Find gear a player owns from their profile inventories.
// The inventory field names follow the Hypixel API v2 profile member layout (member.inventory.*), checked against a
// live profile on 2026-11-18; wardrobe_contents was absent there, so every step tolerates missing fields.
import type { Nbt } from "./nbt";
import { decodeNbt } from "./nbt";

export interface GearItem {
  id: string;
  name: string;
  where: string;
  rarity?: string;
  enchants: Record<string, number>;
}

export interface GearScan {
  /** False when the profile has no inventory data (Inventory API off). */
  inventoryApi: boolean;
  items: GearItem[];
  /** Source ids the player owns, from the items found. */
  owned: Set<string>;
  /** Weapons and tools with Looting, best first. */
  looting: { name: string; level: number; where: string }[];
}

const PLACES: [string, (inv: any) => string | undefined][] = [
  ["inventory", (i) => i?.inv_contents?.data],
  ["armor", (i) => i?.inv_armor?.data],
  ["equipment", (i) => i?.equipment_contents?.data],
  ["wardrobe", (i) => i?.wardrobe_contents?.data],
  ["ender chest", (i) => i?.ender_chest_contents?.data],
  ["accessory bag", (i) => i?.bag_contents?.talisman_bag?.data],
  ["personal vault", (i) => i?.personal_vault_contents?.data],
];

const RARITIES = ["COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY", "MYTHIC", "DIVINE", "SPECIAL"];
const strip = (s: string) => s.replace(/§./g, "");
const obj = (v: Nbt | undefined): Record<string, Nbt> | undefined =>
  v && typeof v === "object" && !Array.isArray(v) && !ArrayBuffer.isView(v) ? (v as Record<string, Nbt>) : undefined;

function readItems(root: Nbt, where: string): GearItem[] {
  const list = obj(root)?.i;
  if (!Array.isArray(list)) return [];
  const out: GearItem[] = [];
  for (const raw of list) {
    const tag = obj(obj(raw)?.tag);
    const extra = obj(tag?.ExtraAttributes);
    const id = extra?.id;
    if (typeof id !== "string") continue;
    const display = obj(tag?.display);
    const lore = Array.isArray(display?.Lore) ? (display!.Lore as Nbt[]).map((l) => strip(String(l))) : [];
    const last = lore[lore.length - 1] ?? "";
    const rarity = RARITIES.find((r) => last.includes(r));
    const enchants: Record<string, number> = {};
    for (const [k, v] of Object.entries(obj(extra?.enchantments) ?? {})) if (typeof v === "number") enchants[k] = v;
    out.push({ id, name: strip(String(display?.Name ?? id)), where, rarity, enchants });
  }
  return out;
}

const SIMPLE: Record<string, string> = {
  CLOVER_HELMET: "clover",
  CROWN_OF_GREED: "greed",
  CROWN_OF_AVARICE: "avarice",
  NECRONS_LADDER: "ladder",
  ANGUISH_ARTIFACT: "anguish",
  CELESTIAL_MASON_JAR: "jar",
  GOLDEN_FLEECE: "fleece",
  ODGERS_DIAMOND_TOOTH: "odger",
  RAZOR_SHARP_SHARK_TOOTH_NECKLACE: "sharktooth",
  PHD_GRIMOIRE: "ribery",
  SHRIVELED_BRACELET: "bracelet",
};

/** Scans every readable inventory of a profile member. Pets come from pets_data. */
export async function scanGear(member: any): Promise<GearScan> {
  const inv = member?.inventory;
  const items: GearItem[] = [];
  let any = false;
  for (const [where, pick] of PLACES) {
    const data = pick(inv);
    if (typeof data !== "string" || !data) continue;
    any = true;
    try {
      items.push(...readItems(await decodeNbt(data), where));
    } catch {
      // one unreadable inventory should not hide the others
    }
  }
  // Backpacks: one entry per backpack slot, each with its own NBT.
  const packs = inv?.backpack_contents;
  if (packs && typeof packs === "object") {
    for (const [slot, pack] of Object.entries(packs as Record<string, { data?: unknown }>)) {
      if (typeof pack?.data !== "string" || !pack.data) continue;
      any = true;
      try {
        items.push(...readItems(await decodeNbt(pack.data), `backpack ${Number(slot) + 1}`));
      } catch {
        // as above
      }
    }
  }

  const ids = new Set(items.map((i) => i.id));
  const owned = new Set<string>();
  for (const [id, source] of Object.entries(SIMPLE)) if (ids.has(id)) owned.add(source);
  if (["SORROW_HELMET", "SORROW_CHESTPLATE", "SORROW_LEGGINGS", "SORROW_BOOTS"].every((i) => ids.has(i))) owned.add("sorrow");
  if (["MAGMA_LORD_CHESTPLATE", "MAGMA_LORD_LEGGINGS", "MAGMA_LORD_BOOTS", "MAGMA_LORD_GAUNTLET"].every((i) => ids.has(i))) {
    owned.add("magma4");
    if (ids.has("MAGMA_LORD_HELMET")) owned.add("magma5");
  }
  const ringRank = Math.max(-1, ...items.filter((i) => i.id === "PULSE_RING").map((i) => RARITIES.indexOf(i.rarity ?? "")));
  if (ringRank >= 2) owned.add("pulseR");
  if (ringRank >= 3) owned.add("pulseE");
  if (ringRank >= 4) owned.add("pulseL");

  const looting = items
    .filter((i) => (i.enchants.looting ?? 0) > 0)
    .map((i) => ({ name: i.name, level: i.enchants.looting!, where: i.where }))
    .sort((a, b) => b.level - a.level);
  const best = looting[0]?.level ?? 0;
  if (best >= 5) owned.add("loot5");
  if (best >= 6) owned.add("loot6");
  if (best >= 7) owned.add("loot7");
  if (items.some((i) => (i.enchants.ultimate_habanero_tactics ?? 0) >= 5)) owned.add("haban");
  if (items.some((i) => (i.enchants.ultimate_bobbin_time ?? 0) >= 5)) {
    owned.add("bobbinL");
    owned.add("bobbinS");
  }

  const pets: any[] = Array.isArray(member?.pets_data?.pets) ? member.pets_data.pets : [];
  if (pets.some((p) => p?.type === "GRIFFIN" && p?.heldItem === "FOUR_EYED_FISH")) owned.add("fish");

  return { inventoryApi: any, items, owned, looting };
}
