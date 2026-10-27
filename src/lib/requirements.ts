import type { LeafRequirement, Modifier, Requirement } from "../schema/guide";
import { itemName, reforgeStone, titleCase } from "../data/items";
import { perkById } from "../data/perks";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const rarity = (r: string) => r[0] + r.slice(1).toLowerCase();
const quality = (q: string) => q[0] + q.slice(1).toLowerCase();

export const GROUP_LABELS: Record<string, string> = {
  drill: "Drill",
  tools: "Tools",
  armor: "Armor",
  equipment: "Equipment",
  pet: "Pets",
  accessories: "Accessories",
  consumables: "Consumables",
  progress: "Collections, skills and shops",
  other: "Other",
  attributes: "Attributes",
  hotm: "Heart of the Mountain",
};

/** Order of the gear groups on a guide page. Attributes and HOTM have their own sections. */
export const GEAR_GROUPS = ["drill", "tools", "armor", "equipment", "pet", "accessories", "consumables", "progress", "other"];

export function attributeName(id: string, names: Map<string, string>): string {
  return names.get(id) ?? titleCase(id);
}

/** The main text of a requirement. */
export function title(r: Requirement | LeafRequirement, attributeNames = new Map<string, string>()): string {
  if (r.label) return r.label;
  switch (r.kind) {
    case "item":
      return (r.count > 1 ? `${r.count}x ` : "") + itemName(r.item);
    case "accessory":
      return itemName(r.item);
    case "consumable":
      return (r.count > 1 ? `${r.count}x ` : "") + itemName(r.item);
    case "pet":
      return `${rarity(r.pet.minTier)} ${itemName(r.pet.type)}, level ${r.pet.level}`;
    case "hotm": {
      const perk = perkById.get(r.perk);
      return `${perk?.name ?? titleCase(r.perk)} ${r.level === "max" ? "maxed" : `level ${r.level}`}`;
    }
    case "powder":
      return `${r.amount.toLocaleString("en-US")} ${titleCase(r.powder)} Powder`;
    case "attribute":
      return `${attributeName(r.attribute, attributeNames)} ${ROMAN[r.level] ?? r.level}`;
    case "essence":
      return `${itemName(r.perk)} ${r.level} (${titleCase(r.essence)} Essence shop)`;
    case "collection":
      return `${itemName(r.collection)} collection ${r.level}`;
    case "skill":
      return `${r.skill === "MINING" ? "Mining" : "Heart of the Mountain"} ${r.level}`;
    default:
      return r.id;
  }
}

/** Pet item and other short details shown under the title. */
export function subtitle(r: Requirement | LeafRequirement): string | undefined {
  if (r.kind === "pet" && r.pet.item) return `with ${itemName(r.pet.item)}`;
  return undefined;
}

export interface ModifierLine {
  label: string;
  values: string[];
}

/** Item upgrades grouped into short labelled lines. */
export function modifierLines(mods: Modifier[]): ModifierLine[] {
  const lines: Record<string, string[]> = { Upgrades: [], Gemstones: [], Parts: [], Enchants: [], Notes: [] };
  for (const m of mods) {
    switch (m.kind) {
      case "recomb":
        lines.Upgrades!.push("Recombobulated");
        break;
      case "reforge": {
        const stone = reforgeStone(m.id, m.stone);
        lines.Upgrades!.push(`${titleCase(m.id)} reforge${stone ? ` (${stone})` : ""}`);
        break;
      }
      case "applied":
        lines.Upgrades!.push((m.count > 1 ? `${m.count}x ` : "") + itemName(m.item));
        break;
      case "gem":
        lines.Gemstones!.push(`${m.count > 1 ? `${m.count} ` : ""}${quality(m.quality)} ${quality(m.gem)}`);
        break;
      case "drill_part":
        lines.Parts!.push(itemName(m.item));
        break;
      case "enchant":
        lines.Enchants!.push(`${titleCase(m.id)} ${ROMAN[m.level] ?? m.level}`);
        break;
      case "note":
        lines.Notes!.push(m.text);
        break;
    }
  }
  return Object.entries(lines)
    .filter(([, v]) => v.length)
    .map(([label, values]) => ({ label, values }));
}

export function modifiersOf(r: Requirement | LeafRequirement): Modifier[] {
  return r.kind === "item" || r.kind === "accessory" ? r.modifiers : [];
}
