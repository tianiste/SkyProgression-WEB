import type { BossId } from "./sources";
import { BOSSES } from "./sources";

/** Thrown when the browser blocks the request (offline, CORS, sandboxed preview). */
export class NetworkBlockedError extends Error {}

async function getJSON<T>(url: string, init?: RequestInit): Promise<T> {
  let r: Response;
  try {
    r = await fetch(url, init);
  } catch {
    throw new NetworkBlockedError("blocked");
  }
  const j = (await r.json().catch(() => null)) as (T & { cause?: string; message?: string }) | null;
  if (!r.ok) throw new Error(j?.cause || j?.message || "HTTP " + r.status);
  if (j === null) throw new Error("Empty response from " + new URL(url).host);
  return j;
}

/** Minecraft name (or UUID) to a dashless lowercase UUID. Tries several CORS-friendly services. */
export async function uuidOf(name: string): Promise<string> {
  const bare = name.replace(/-/g, "");
  if (/^[0-9a-f]{32}$/i.test(bare)) return bare.toLowerCase();
  const n = encodeURIComponent(name);
  const tries: [string, (j: any) => unknown][] = [
    ["https://playerdb.co/api/player/minecraft/" + n, (j) => j?.data?.player?.raw_id],
    ["https://mc-api.io/uuid/" + n, (j) => j?.uuid],
    ["https://api.ashcon.app/mojang/v2/user/" + n, (j) => j?.uuid],
  ];
  let blocked = 0;
  for (const [url, pick] of tries) {
    try {
      const id = pick(await getJSON(url));
      if (typeof id === "string" && id) return id.replace(/-/g, "").toLowerCase();
    } catch (e) {
      if (e instanceof NetworkBlockedError) blocked++;
    }
  }
  if (blocked === tries.length) throw new NetworkBlockedError("blocked");
  throw new Error(`No Minecraft account found for "${name}". You can paste the UUID instead.`);
}

export interface Profile {
  profile_id: string;
  cute_name?: string;
  selected?: boolean;
  members?: Record<string, Member>;
}

// Field names below have not yet been checked against a live response.
export interface Member {
  player_data?: { experience?: { SKILL_COMBAT?: number } };
  leveling?: { highest_pet_score?: number };
  pets_data?: { pets?: { type: string; tier: string }[] };
  slayer?: { slayer_bosses?: Partial<Record<BossId, { claimed_levels?: Record<string, boolean> }>> };
  profile?: { cookie_buff_active?: boolean };
}

/** SkyBlock profiles for a player. The key is only ever sent in the API-Key header. */
export async function getProfiles(uuid: string, key: string): Promise<Profile[]> {
  const j = await getJSON<{ profiles?: Profile[] | null }>("https://api.hypixel.net/v2/skyblock/profiles?uuid=" + uuid, {
    headers: { "API-Key": key },
  });
  return j.profiles ?? [];
}

const XP_PER_LEVEL = [
  50, 125, 200, 300, 500, 750, 1000, 1500, 2000, 3500, 5000, 7500, 10000, 15000, 20000, 30000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 600000,
  700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000,
  2500000, 2600000, 2750000, 2900000, 3100000, 3400000, 3700000, 4000000, 4300000, 4600000, 4900000, 5200000, 5500000, 5800000, 6100000, 6400000, 6700000,
  7000000,
];

export function levelFromXp(xp: number): number {
  let level = 0;
  for (const need of XP_PER_LEVEL) {
    if (xp < need) break;
    xp -= need;
    level++;
  }
  return level;
}

const RARITY: Record<string, number> = { COMMON: 1, UNCOMMON: 2, RARE: 3, EPIC: 4, LEGENDARY: 5, MYTHIC: 6 };

/** What could be read from a profile member. Missing fields stay undefined (not 0). */
export interface MemberStats {
  combat?: number;
  petScore?: number;
  slayers?: Partial<Record<BossId, number>>;
  cookie?: boolean;
}

export function readMember(m: Member | undefined): MemberStats {
  const out: MemberStats = {};
  const xp = m?.player_data?.experience?.SKILL_COMBAT;
  if (typeof xp === "number") out.combat = levelFromXp(xp);

  let ps = m?.leveling?.highest_pet_score;
  const pets = m?.pets_data?.pets;
  if (typeof ps !== "number" && Array.isArray(pets)) {
    const best: Record<string, number> = {};
    for (const p of pets) best[p.type] = Math.max(best[p.type] ?? 0, RARITY[p.tier] ?? 0);
    ps = Object.values(best).reduce((a, b) => a + b, 0);
  }
  if (typeof ps === "number") out.petScore = ps;

  const sb = m?.slayer?.slayer_bosses;
  if (sb) {
    out.slayers = {};
    for (const b of BOSSES) {
      const claimed = sb[b.id]?.claimed_levels ?? {};
      let level = 0;
      for (let i = 1; i <= 9; i++) if (claimed["level_" + i] || claimed["level_" + i + "_special"]) level = i;
      out.slayers[b.id] = level;
    }
  }

  const ck = m?.profile?.cookie_buff_active;
  if (typeof ck === "boolean") out.cookie = ck;
  return out;
}
