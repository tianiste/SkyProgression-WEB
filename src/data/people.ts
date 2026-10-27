/**
 * Everyone credited on the site. Guides and trees refer to people by key; links are kept here so each person's links
 * are set in one place. Add a link when the person shares one.
 */
export interface Person {
  name: string;
  links: { label: string; url: string }[];
}

export const PEOPLE = {
  "the-ultimate-non": { name: "TheUltimateNon", links: [] },
  flora: {
    name: "flora (miningfemcel)",
    links: [
      { label: "Umber route video", url: "https://youtu.be/ESBUIDVMZ0k" },
      { label: "Hybrid route video", url: "https://youtu.be/oy2ykwkKoVM" },
      { label: "Umber Mineshaft video", url: "https://youtu.be/Q893nBOAu14" },
    ],
  },
  ghostz06: { name: "Ghostz06 [SOAR]", links: [] },
  notwil: { name: "NotWil", links: [] },
  meow: { name: "Meow", links: [] },
  livet: { name: "Livet (IOnlyLeechDrags)", links: [] },
  yadi: { name: "Yadi", links: [{ label: "Mineshaft video guide", url: "https://www.youtube.com/watch?v=gAH3ejdb8rY" }] },
  "willo-wisp": { name: "willo__wisp", links: [] },
  "mycelium-larper": { name: "Mycelium Larper", links: [] },
  parker: { name: "parker", links: [] },
  woqh: { name: "woqh", links: [] },
  sleepinginseattle: { name: "sleepinginseattle.", links: [] },
  fazehunter: { name: "FazeHunter (Ji)", links: [] },
  lfalloy: { name: "lfAlloy", links: [] },
  "mining-cult": { name: "Mining Cult Discord", links: [] },
} satisfies Record<string, Person>;

export type PersonId = keyof typeof PEOPLE;
export const PEOPLE_IDS = Object.keys(PEOPLE) as [PersonId, ...PersonId[]];
export const person = (id: PersonId): Person => PEOPLE[id];
