// Live prices: SkyProgression-API's /magic-find/prices (from its price bundle: Hypixel Bazaar plus SkyCofl Auction
// House quotes), with Hypixel's Bazaar read directly for any Bazaar id the bundle does not have yet.
import { SITE } from "../config";
import type { Market, Quote } from "./price-spec";
import { PRICE_SPECS, quoteKey, wantedQuotes } from "./price-spec";
import type { Live } from "./state";

interface ApiPrice {
  buy: number;
  source: string;
  updatedAt: string;
}

async function apiQuotes(): Promise<{ quotes: Record<string, Quote>; updatedAt: string } | null> {
  try {
    const r = await fetch(`${SITE.api}/magic-find/prices`, { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const b = (await r.json()) as { updatedAt?: string; prices?: Record<string, ApiPrice> };
    if (!b?.prices) return null;
    const quotes: Record<string, Quote> = {};
    for (const [id, p] of Object.entries(b.prices)) {
      if (!(p.buy > 0)) continue;
      const market: Market = p.source.startsWith("Bazaar") ? "bazaar" : "ah";
      quotes[id] = { buy: p.buy, market, at: /^\d{4}-/.test(p.updatedAt) ? p.updatedAt : (b.updatedAt ?? "") };
    }
    return { quotes, updatedAt: b.updatedAt ?? "" };
  } catch {
    return null;
  }
}

async function bazaarQuotes(ids: string[]): Promise<{ quotes: Record<string, Quote>; updatedAt: string }> {
  const r = await fetch("https://api.hypixel.net/v2/skyblock/bazaar");
  if (!r.ok) throw new Error(`Bazaar HTTP ${r.status}`);
  const j = (await r.json()) as { lastUpdated?: number; products?: Record<string, { buy_summary?: { pricePerUnit: number }[] }> };
  const at = new Date(j.lastUpdated ?? Date.now()).toISOString();
  const quotes: Record<string, Quote> = {};
  for (const id of ids) {
    // Hypixel's buy_summary holds sell offers: its first entry is the instant-buy price.
    const buy = j.products?.[id]?.buy_summary?.[0]?.pricePerUnit ?? 0;
    if (buy > 0) quotes[id] = { buy, market: "bazaar", at };
  }
  return { quotes, updatedAt: at };
}

/** Cost per source from the quotes; a source with any part unpriced (or an unknown quantity) keeps its default. */
function costs(quotes: Record<string, Quote>): Pick<Live, "cost" | "market"> {
  const cost: Record<string, number> = {};
  const market: Record<string, "bazaar" | "ah"> = {};
  for (const [id, spec] of Object.entries(PRICE_SPECS)) {
    if (spec.qtyUnknown) continue;
    const parts = spec.parts.map((p) => quotes[quoteKey(p)]);
    if (parts.some((q) => !q || q.buy <= 0)) continue;
    cost[id] = Math.round(spec.parts.reduce((t, p, i) => t + p.qty * parts[i]!.buy, 0));
    market[id] = spec.parts[0]!.market;
  }
  return { cost, market };
}

export async function loadPrices(): Promise<Live> {
  try {
    const want = wantedQuotes();
    const api = await apiQuotes();
    const quotes: Record<string, Quote> = { ...api?.quotes };
    let updatedAt = api?.updatedAt ?? "";
    const missing = want.bazaar.filter((id) => !quotes[id]);
    if (missing.length) {
      const bz = await bazaarQuotes(missing).catch((e: unknown) => (api ? null : Promise.reject(e)));
      if (bz) {
        Object.assign(quotes, bz.quotes);
        if (!updatedAt) updatedAt = bz.updatedAt;
      }
    }
    return { ...costs(quotes), quotes, origin: api ? "api" : "bazaar", updatedAt, error: "" };
  } catch (e) {
    return { cost: {}, market: {}, quotes: {}, origin: null, updatedAt: "", error: e instanceof Error ? e.message : String(e) };
  }
}
