/**
 * Player pages: the API answers (GET /player, computed by the mod's engine on the relay), the URL scheme and number
 * formatting. Pages live at /player/<name>/<view>/ with profile, method, price and god in the query; Cloudflare Pages
 * rewrites them to the static shells under /player-page/ (public/_redirects), the dev server does the same in middleware.
 */
import { SITE } from "../config";

export const VIEWS = [
  { id: "overview", label: "Overview" },
  { id: "gear", label: "Gear" },
  { id: "upgrades", label: "Upgrades" },
  { id: "methods", label: "Methods" },
  { id: "start", label: "Start with" },
  { id: "hotm", label: "HOTM" },
] as const;
export type View = (typeof VIEWS)[number]["id"];

export interface ProfileInfo { id: string; name: string; mode: string; selected: boolean }
export interface Option { id: string; label: string; meaning?: string }
export interface ArmorPiece { slot: "helmet" | "chestplate" | "leggings" | "boots"; id: string; name: string; material: string | null; color: string | null; texture: string | null }
export interface Ability { name: string; boostPercent: number | null; duration: number | null; cooldown: number | null; fortunePerBlock: number | null }
export interface LoadoutPiece { key: string; name: string; location: string; id: string }

export interface Common {
  view: View;
  player: string;
  uuid: string;
  fetchedAt: string;
  pricesAt: string;
  profile: ProfileInfo;
  profiles: ProfileInfo[];
  api: { inventory: boolean; vault: boolean; collections: boolean; skills: boolean; pets: boolean };
  method: string;
  methodLabel: string;
  methods: Option[];
  priceMode: string;
  priceModes: Option[];
  /** How purchases are priced; missing from relays that predate the option. */
  costMode?: string;
  costModes?: Option[];
  godPotion: boolean;
  efficiency: number;
  model: { skin: { hash: string; slim: boolean } | null; armor: ArmorPiece[] };
}

export interface Source {
  source: string;
  category: string;
  value: number | null;
  maximum: number | null;
  share: number | null;
  additive: boolean;
  state: "COUNTED" | "SITUATIONAL" | "MISSING" | "TEMPORARY" | "UNTRACKABLE";
  confidence: "KNOWN" | "UNKNOWN" | "MANUAL";
  condition: string;
  note: string;
}
export interface LedgerHead { stat: string; label: string; percent: boolean; total: number; attainable: number | null; attainableKnown: number; complete: boolean }

export interface DropValue {
  drop: { name: string; unit: string; perHour: number | null; source: string };
  coinsPerUnit: number | null;
  coinsPerHour: number | null;
  atLeast: boolean;
  note: string;
}
export interface MethodRow {
  method: string;
  label: string;
  item: string;
  itemsPerHour: number | null;
  coinsPerItem: number | null;
  coinsPerHour: number | null;
  totalCoinsPerHour: number | null;
  priceNote: string;
  efficiency: number;
  model: string;
  window: string;
  drops: string;
  lowerBound: boolean;
  statsComplete: boolean;
  tool: string;
  zone: string;
  error: string;
  secondary: DropValue[];
}
export interface Comparison { godPotion: boolean; rows: MethodRow[] }

export interface UpgradeItem { id: string; name: string; group: string; category: string; modification: boolean; source: string; location: string }
export interface Upgrade {
  item: UpgradeItem;
  current: UpgradeItem | null;
  delta: Record<string, number>;
  cooldownFactor: number;
  cost: number | null;
  gain: number;
  costPerUnit: number | null;
  owned: boolean;
  blocked: string;
  rateBefore: number | null;
  rateAfter: number | null;
  grind: boolean;
  priceSource: string;
  bestGain?: number | null;
}
export interface Step { upgrade: Upgrade; totalGain: number; totalCost: number; rate: number | null }

export interface Rate {
  supported: boolean;
  unit: string;
  lowerBound: boolean;
  model: string;
  window: string;
  perHour: number | null;
  coinsEach: number | null;
  coinsPerHour: number | null;
  priceSource: string;
  error?: string;
}

export interface Overview extends Common {
  stats: (LedgerHead & { top: Source[] })[];
  rate: Rate;
  tool: string;
  loadout: LoadoutPiece[];
  next: Step | null;
  comparison: Comparison;
}
export interface Ledger extends LedgerHead {
  flat: number;
  multiplier: number;
  equipped: number | null;
  bestOwned: number | null;
  unknownMaxima: number;
  notes: string[];
  sources: Source[];
}
export interface Gear extends Common {
  bestGear: boolean;
  tool: string;
  loadout: LoadoutPiece[];
  accessories: number;
  hotmTree: string;
  hotmTrees: number;
  ability: Ability | null;
  relevant: string[];
  groups: Record<string, string[]>;
  breakingPower: number | null;
  ledgers: Ledger[];
}
export interface OtherEntry {
  id: string;
  name: string;
  group: string;
  delta: Record<string, number>;
  gain: number | null;
  cost: number | null;
  effect: string;
  requirement: string;
  distance: string;
  how: string;
  note: string;
}
export interface Upgrades extends Common {
  rated: boolean;
  rateModel: boolean;
  unit: string;
  windowHours: number;
  coinsEach: number | null;
  bestMethod: { id: string; label: string; coinsPerHour: number } | null;
  ranked: Upgrade[];
  plan: Step[];
  other: {
    unchecked: OtherEntry[];
    grinding: OtherEntry[];
    stage: { name: string; because: string[]; next: string; nextItems: string[] };
    rated: boolean;
    hidden: number;
  };
}
export interface Methods extends Common {
  comparison: Comparison;
  detail: {
    supported: boolean;
    zone: string;
    tool: string;
    ability: Ability | null;
    kind?: "gem" | "block";
    gem?: { gem: { name: string; strength: number; guideFlawlessPerHour: number; guideEfficiency: number; guideNote: string }; speed: number; ticks: number; boostedTicks: number; uptime: number; blocksPerHour: number; roughPerBlock: number; flawlessPerHour: number; kept: number; assumptions: string[] };
    block?: { block: { name: string; strength: number; instamineFactor: number; unit: string; window: string; abilityCycle: boolean; guideNote: string }; speed: number; groundTicks: number; airTicks: number; boostedGroundTicks: number; boostedAirTicks: number; uptime: number; blocksPerHour: number; dropsPerBlock: number; perHour: number; windowHours: number; kept: number; assumptions: string[] };
    perWindow?: number;
    nextTick?: number | null;
    nextTicks?: number | null;
    nextGround?: number | null;
    nextAir?: number;
    instamineInAbility?: number;
    perHour?: number;
    coins?: { mode: string; label: string; each: number | null; perHour: number | null; source: string }[];
    secondary?: DropValue[];
    error?: string;
  };
  sameChange: { method: string; label: string; fortune: number | null; speed: number | null; coinsPerHour: number | null }[];
}
export interface Piece { slot: string; key: string; id: string; name: string; location: string; detail: string; worn: boolean }
export interface Scenario { stats: Record<string, number>; complete: boolean; ability: Ability | null; rate: number | null }
export interface Start extends Common {
  inventoryKnown: boolean;
  petsKnown: boolean;
  hotmTree: string;
  hotmTrees: number;
  otherAccessories: number;
  best: Piece[];
  unit: string;
  lowerBound: boolean;
  coinsEach: number | null;
  current: Scenario | null;
  bestOwned: Scenario | null;
  swaps: { slot: string; from: Piece | null; to: Piece; rate: number | null; delta: Record<string, number>; ability: Ability | null }[];
  wornBest: { id: string; label: string; coinsPerHour: number } | null;
  notes: string[];
}
/** Powder per type (MITHRIL, GEMSTONE, GLACITE); a type that is missing is unknown, null means unknown. */
export type PowderMap = Record<string, number | null>;
export interface PlannedTree { levels: Record<string, number>; ability: string; rate: number | null; powder: PowderMap; tokens: number }
/** The mod's HOTM planner (HotmPlanner.Plan): rates per hour of `unit`. */
export interface HotmPlan {
  unit: string;
  before: number | null;
  now: PlannedTree | null;
  target: PlannedTree;
  other: PlannedTree | null;
  need: PowderMap;
  have: PowderMap;
  missing: PowderMap;
  tokens: number;
  changes: { id: string; name: string; from: number; to: number; disabled: boolean }[];
  reset: boolean;
  notes: string[];
  community: { id: string; title: string; ability: string; rate: number | null; powder: PowderMap; tokens: number; tier: number; fits: boolean; missing: PowderMap }[];
}
export interface Hotm extends Common {
  tier: number;
  powder: Record<string, { unspent: number; spent: number }>;
  trees: { label: string; levels: Record<string, number>; off: string[] }[];
  tokensSpent: number;
  /** Null when the tree, the HOTM XP or the method's rate model is missing. */
  planner: HotmPlan | null;
}

/** What the page asks for, from its URL. */
export interface Query { name: string; view: View; profile: string; method: string; price: string; cost: string; god: boolean; gear: string }

export const NOT_AVAILABLE = "Player pages are not available yet.";
export const NAME = /^[A-Za-z0-9_]{1,16}$/;

export function readQuery(view: View): Query {
  const parts = location.pathname.split("/").filter(Boolean);
  // /player/<name>/<view>/; the dev shells are also reachable as /player-page/<view>/?name=.
  const q = new URLSearchParams(location.search);
  const name = parts[0] === "player" && parts[1] ? decodeURIComponent(parts[1]) : (q.get("name") ?? "");
  return { name, view, profile: q.get("profile") ?? "", method: q.get("method") ?? "", price: q.get("price") ?? "", cost: q.get("cost") ?? "", god: q.get("god") !== "false", gear: q.get("gear") ?? "" };
}

/** The page's own URL for a query (only options that differ from the defaults are written). */
export function pageUrl(q: Query): string {
  const params = new URLSearchParams();
  if (q.profile) params.set("profile", q.profile);
  if (q.method) params.set("method", q.method);
  if (q.price && q.price !== "INSTANT_SELL") params.set("price", q.price);
  if (q.cost && q.cost !== "INSTANT_BUY") params.set("cost", q.cost);
  if (!q.god) params.set("god", "false");
  if (q.gear === "equipped" && q.view === "gear") params.set("gear", "equipped");
  const search = params.toString();
  return `/player/${encodeURIComponent(q.name)}/${q.view === "overview" ? "" : `${q.view}/`}${search ? `?${search}` : ""}`;
}

export class LookupError extends Error {
  constructor(message: string, readonly retry = true) { super(message); }
}

const cache = new Map<string, Common>();

export async function load<T extends Common>(q: Query, signal?: AbortSignal): Promise<T> {
  const params = new URLSearchParams({ ign: q.name, view: q.view });
  if (q.profile) params.set("profile", q.profile);
  if (q.method) params.set("method", q.method);
  if (q.price) params.set("price", q.price);
  if (q.cost) params.set("cost", q.cost);
  if (!q.god) params.set("god", "false");
  if (q.gear) params.set("gear", q.gear);
  const url = `${SITE.api}/player?${params}`;
  const hit = cache.get(url);
  if (hit) return hit as T;
  let response: Response;
  try {
    response = await fetch(url, { signal });
  } catch (e) {
    if (signal?.aborted) throw e;
    // An API without /player refuses the page's origin, which the browser reports as a network error.
    throw new LookupError(NOT_AVAILABLE);
  }
  const body = (await response.json().catch(() => ({}))) as Partial<T> & { error?: string; code?: string };
  if (!response.ok) throw new LookupError(message(response.status, body.code, body.error, q.name), response.status !== 404 && response.status !== 400);
  if (cache.size > 24) cache.clear();
  cache.set(url, body as T);
  return body as T;
}

function message(status: number, code: string | undefined, error: string | undefined, player: string): string {
  if (code === "unavailable" || code === "unknown_endpoint" || status === 403) return NOT_AVAILABLE;
  if (status === 404) return error && !/^Minecraft player not found/.test(error) ? `${error}.`.replace(/\.\.$/, ".") : `No Minecraft player is called ${player}.`;
  if (status === 429) return "Too many lookups right now. Try again in a minute.";
  if (code === "bad_key") return "The server can't read Hypixel profiles right now. Try again later.";
  if (code === "prices_loading") return "Prices are still loading on the server. Try again in a few minutes.";
  if (status === 400) return error ?? "That request was not valid.";
  return "The profile server is down. Try again later.";
}

// Numbers.
const GROUPED = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const ONE = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export function num(n: number | null | undefined, digits = 2): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return "?";
  return (digits === 1 ? ONE : digits === 0 ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }) : GROUPED).format(n);
}

/** Coins as 24.3m, 850k or 1.2b. */
export function coins(n: number | null | undefined): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return "?";
  const a = Math.abs(n);
  if (a >= 1e9) return `${ONE.format(n / 1e9)}b`;
  if (a >= 1e6) return `${ONE.format(n / 1e6)}m`;
  if (a >= 1e4) return `${Math.round(n / 1e3)}k`;
  return GROUPED.format(Math.round(n));
}

export function amount(n: number | null | undefined, percent: boolean): string {
  return `${num(n)}${percent ? "%" : ""}`;
}

export function signed(n: number, percent = false): string {
  return `${n >= 0 ? "+" : "−"}${num(Math.abs(n))}${percent ? "%" : ""}`;
}

export function age(at: string): string {
  const minutes = Math.round((Date.now() - Date.parse(at)) / 60_000);
  if (!Number.isFinite(minutes)) return "unknown";
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  return `${hours} hour${hours === 1 ? "" : "s"} ago`;
}

export function profileLabel(p: ProfileInfo): string {
  const mode = p.mode === "ironman" ? " (Ironman)" : p.mode === "island" ? " (Stranded)" : p.mode === "bingo" ? " (Bingo)" : "";
  return p.name + mode + (p.selected ? ", selected in game" : "");
}

export function abilityText(a: Ability | null): string {
  return a === null ? "none shown" : `${a.name}${a.cooldown === null ? "" : `, ${num(a.cooldown)} s cooldown`}`;
}
