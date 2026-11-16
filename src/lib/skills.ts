import type { PersonId } from "../data/people";

/**
 * Skills, in tab order. The guide list and the player pages are built from this list, so a new skill is one entry here
 * plus its categories in categories.ts. A skill with a player page also needs its two lines in public/_redirects.
 */
export interface Skill {
  id: string;
  label: string;
  /** Where the skill's guides are posted. */
  community: PersonId;
  /** Item ID of the tab's icon. */
  icon: string;
  /** A link under the skill's guides. */
  more?: { text: string; href: string; label: string };
  /** The first player page of the skill: an engine view, or the skill's own page at /player/<name>/<id>/. */
  page?: string;
  /** The guide the skill's own player page checks, for a skill the engine does not cover. */
  path?: {
    guide: string;
    /** Says what the page is and what it can't show. */
    note: string;
    links: { href: string; label: string }[];
  };
}

export const SKILLS: Skill[] = [
  {
    id: "mining",
    label: "Mining",
    community: "mining-cult",
    icon: "DIAMOND_PICKAXE",
    more: { text: "Powder, Glacite and Scatha:", href: "/guides/hotm-trees/", label: "HOTM trees" },
    page: "overview",
  },
  {
    id: "foraging",
    label: "Foraging",
    community: "foraging-community",
    icon: "WOOD",
    page: "foraging",
    path: {
      guide: "foraging-progression",
      note: "Community upgrade path. No rates yet.",
      links: [{ href: "/guides/heart-of-the-forest/#hotf-trees", label: "Heart of the Forest trees" }],
    },
  },
  {
    id: "fishing",
    label: "Fishing",
    community: "casters",
    icon: "FISHING_ROD",
    page: "fishing",
    path: {
      guide: "fishing-progression",
      note: "Community upgrade path. No rates yet.",
      links: [{ href: "/reference/attributes/#fam-fishing", label: "Fishing attributes" }],
    },
  },
];
