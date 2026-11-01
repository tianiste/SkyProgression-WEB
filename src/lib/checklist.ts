/**
 * The player checklist: POST /checklist with a guide's requirements (the site serves them as JSON), and writing the
 * answer into a static page, whose to-do rows carry data-requirement. Used by guide pages and by a skill's player page.
 */
import { SITE } from "../config";
import { LookupError, type ProfileInfo } from "./player";

export type State = "owned" | "partial" | "missing" | "unknown" | "manual";
interface Part { part: string; modifier?: number; text: string; have?: string }
export interface Result {
  id: string;
  state: State;
  text?: string;
  have?: number;
  need?: number;
  missing?: Part[];
  unchecked?: Part[];
  where?: string[];
  coveredBy?: string;
  api?: string;
  options?: Result[];
  chosen?: number;
}
export interface Answer {
  player?: string;
  uuid: string;
  profile: ProfileInfo;
  profiles: ProfileInfo[];
  fetchedAt: string;
  api: { inventory: boolean; vault: boolean; collections: boolean; skills: boolean };
  results: Result[];
}

const LABEL: Record<State, string> = {
  owned: "Done.",
  partial: "Partly done.",
  missing: "Missing.",
  unknown: "Unknown.",
  manual: "Check this yourself.",
};
export const API_NAMES: Record<string, string> = { inventory: "Inventory API", collections: "Collections API", skills: "Skills API" };
const NOT_AVAILABLE = "Player lookup is not available yet.";

const requirements = new Map<string, unknown[]>();

/** Checks a player against a guide. Errors are LookupErrors with the text to show. */
export async function requestChecklist(guide: string, player: string, profile = "", signal?: AbortSignal): Promise<Answer> {
  if (!requirements.has(guide)) {
    const r = await fetch(`/guides/${guide}.json`, { signal });
    requirements.set(guide, ((await r.json()) as { requirements: unknown[] }).requirements);
  }
  let response: Response;
  try {
    response = await fetch(`${SITE.api}/checklist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ign: player, profile, requirements: requirements.get(guide) }),
      signal,
    });
  } catch (e) {
    if (signal?.aborted) throw e;
    // An API without /checklist refuses the page's origin, which the browser reports as a network error.
    throw new LookupError(NOT_AVAILABLE);
  }
  const body = (await response.json().catch(() => ({}))) as Partial<Answer> & { error?: string; code?: string };
  if (!response.ok) throw new LookupError(message(response.status, body.code, body.error, player), response.status !== 404 && response.status !== 400);
  return body as Answer;
}

function message(status: number, code: string | undefined, error: string | undefined, player: string): string {
  if (status === 404 && code === "unknown_endpoint") return NOT_AVAILABLE;
  if (code === "unavailable") return NOT_AVAILABLE;
  if (status === 404) return error && !/^Minecraft player not found/.test(error) ? `${error}.`.replace(/\.\.$/, ".") : `No Minecraft player is called ${player}.`;
  if (status === 429) return "Too many lookups right now. Try again in a minute.";
  if (code === "bad_key") return "The server can't read Hypixel profiles right now. Try again later.";
  if (status === 400) return error ?? "That request was not valid.";
  if (status === 403) return NOT_AVAILABLE;
  return "The profile server is down. Try again later.";
}

export interface Counts {
  owned: number;
  partial: number;
  missing: number;
  unknown: number;
  manual: number;
  tiers: { label: string; done: number; total: number }[];
}

export function count(results: Result[], names = ["Budget setup", "Max setup"]): Counts {
  const c: Counts = { owned: 0, partial: 0, missing: 0, unknown: 0, manual: 0, tiers: [] };
  for (const r of results) c[r.state]++;
  // Untiered entries belong to both setups.
  const tiers = new Map<string, { done: number; total: number }>([["budget", { done: 0, total: 0 }], ["max", { done: 0, total: 0 }]]);
  for (const r of results) {
    const tier = document.querySelector<HTMLElement>(`[data-requirement="${CSS.escape(r.id)}"]`)?.dataset.tier;
    for (const [k, t] of tiers) if (!tier || tier === k) { t.total++; if (r.state === "owned") t.done++; }
  }
  const hasTiers = results.some((r) => document.querySelector<HTMLElement>(`[data-requirement="${CSS.escape(r.id)}"]`)?.dataset.tier);
  if (hasTiers) c.tiers = [{ label: names[0]!, ...tiers.get("budget")! }, { label: names[1]!, ...tiers.get("max")! }];
  return c;
}

/** How full the XP bar is: partly done rows count for half. */
export function progressPercent(c: Counts, total: number): number {
  return (100 * (c.owned + c.partial / 2)) / Math.max(1, total);
}

/** Writes the answer into the static page: row states and status lines, unmet upgrades, the XP bar, section counts. */
export function apply(a: Answer) {
  reset();
  for (const r of a.results) {
    for (const row of document.querySelectorAll<HTMLElement>(`[data-requirement="${CSS.escape(r.id)}"]`)) {
      row.dataset.state = r.state;
      for (const p of r.missing ?? []) if (p.modifier !== undefined) row.querySelectorAll(`[data-mod="${p.modifier}"]`).forEach((el) => el.setAttribute("data-unmet", ""));
      if (r.chosen !== undefined && (r.state === "owned" || r.state === "partial")) row.querySelector(`[data-option="${r.chosen}"]`)?.setAttribute("data-chosen", "");
      const status = row.querySelector<HTMLElement>("[data-status]");
      if (!status) continue;
      const label = document.createElement("b");
      label.textContent = LABEL[r.state];
      status.replaceChildren(label, " " + detail(r, row));
      status.hidden = false;
    }
  }
  const bar = document.querySelector<HTMLElement>(".progress .xp span");
  if (bar) bar.style.width = `${progressPercent(count(a.results), a.results.length)}%`;
  for (const scope of document.querySelectorAll<HTMLElement>("[data-progress-scope]")) {
    const out = scope.querySelector<HTMLElement>("[data-progress]");
    const rows = [...scope.querySelectorAll<HTMLElement>("[data-requirement][data-state]")];
    if (!out || rows.length === 0) continue;
    const done = rows.filter((r) => r.dataset.state === "owned").length;
    out.innerHTML = "";
    const bar = document.createElement("span");
    bar.className = "bar";
    bar.setAttribute("aria-hidden", "true");
    const fill = document.createElement("span");
    fill.style.width = `${(100 * done) / rows.length}%`;
    bar.append(fill);
    out.append(`${done} of ${rows.length} done`, bar);
    out.hidden = false;
  }
}

export function reset() {
  for (const row of document.querySelectorAll<HTMLElement>("[data-requirement][data-state]")) delete row.dataset.state;
  document.querySelectorAll("[data-unmet]").forEach((el) => el.removeAttribute("data-unmet"));
  document.querySelectorAll("[data-chosen]").forEach((el) => el.removeAttribute("data-chosen"));
  document.querySelectorAll<HTMLElement>("[data-status], [data-progress]").forEach((el) => { el.hidden = true; el.replaceChildren(); });
  const bar = document.querySelector<HTMLElement>(".progress .xp span");
  if (bar) bar.style.width = "0";
}

/** The status line after the state word: what is still needed, and where the counted copy is. */
function detail(r: Result, row: HTMLElement): string {
  const where = r.where?.length ? ` In: ${r.where.join(", ")}.` : "";
  if (r.state === "unknown") {
    const setting = r.api ? API_NAMES[r.api] : undefined;
    return setting ? `Turn on the ${setting} to check this.` : "Hypixel did not send the data for this.";
  }
  if (r.state === "manual") return r.options ? "None of the options can be read from the API." : "This can't be read from the API.";
  if (r.options && r.chosen !== undefined) {
    const option = r.options[r.chosen]!;
    const name = row.querySelector(`[data-option="${r.chosen}"]`)?.textContent?.trim();
    return `${name ? `${name}: ` : ""}${detail(option, row)}`;
  }
  if (r.coveredBy) return `${r.text ?? ""}${where}`;
  if (r.missing?.length) {
    const parts = r.missing.map((p) => {
      const text = p.modifier !== undefined ? row.querySelector(`[data-mod="${p.modifier}"]`)?.textContent?.trim() || p.text : p.text;
      return p.have ? `${text}, now ${p.have}` : text;
    });
    return `Still needed: ${parts.join("; ")}.${where}`;
  }
  if (r.state === "missing" && r.text && r.need === undefined) return "Not found in the profile.";
  const unchecked = r.unchecked?.length ? ` Not checked: ${r.unchecked.map((p) => row.querySelector(`[data-mod="${p.modifier}"]`)?.textContent?.trim() || p.text).join(", ")}.` : "";
  return `${r.need !== undefined ? (r.text ?? "") : ""}${where}${unchecked}`.trim();
}
