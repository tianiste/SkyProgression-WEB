// Icons for the planner's sources and toggles, resolved at build time so the page does not ship the site's whole
// icon table: the site's own texture (src/data/icons.generated.json) first, then the planner's extra icons.
import generated from "../data/icons.generated.json";
import map from "./icon-map.json";
import extra from "./icons.json";

type Entry = { file: string; size: number; source?: string };
export type IconTable = Record<string, { src: string; smooth: boolean }>;

/** Keys are "source:<id>" and "toggle:<id>". */
export function iconTable(): IconTable {
  const site = generated.items as Record<string, Entry>;
  const own = extra.items as Record<string, Entry>;
  const out: IconTable = {};
  const add = (key: string, id: string) => {
    const s = site[id];
    const o = own[id];
    if (s) out[key] = { src: `/icons/${s.file}`, smooth: s.source === "head" };
    else if (o) out[key] = { src: `/magic-find/icons/${o.file}`, smooth: o.source === "head" };
  };
  for (const [k, id] of Object.entries(map.source as Record<string, string>)) add(`source:${k}`, id);
  for (const [k, id] of Object.entries(map.toggle as Record<string, string>)) add(`toggle:${k}`, id);
  return out;
}
