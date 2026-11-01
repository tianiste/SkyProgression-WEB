import { SKILLS, type Skill } from "./skills";

/** Guide categories, in page order, each under one skill. The swatch is the colour of the material the category is about. */
export const CATEGORIES = [
  { id: "gemstones", label: "Gemstones", swatch: "#e0477a", skill: "mining" },
  { id: "dwarven-metals", label: "Dwarven Metals", swatch: "#b5794a", skill: "mining" },
  { id: "ores", label: "Ores", swatch: "#4fe3ec", skill: "mining" },
  { id: "blocks", label: "Blocks", swatch: "#8c8f99", skill: "mining" },
  { id: "foraging", label: "Foraging", swatch: "#6f8f3a", skill: "foraging" },
  { id: "fishing-basics", label: "Progression and setup", swatch: "#3f7fbf", skill: "fishing" },
  { id: "fishing-methods", label: "Ways to fish", swatch: "#d9622b", skill: "fishing" },
  { id: "other", label: "Other", swatch: "#8ef04a", skill: "mining" },
] as const;

export const skillOf = (category: string): Skill => SKILLS.find((s) => s.id === CATEGORIES.find((c) => c.id === category)?.skill)!;
