import { SITE } from "../config";
import { LookupError, NOT_AVAILABLE, lookupMessage } from "../lib/player";
import type { BossId } from "./sources";
import { BOSSES } from "./sources";

/** A player's profiles through the SkyProgression API (its server key; nothing to type in). */
export interface ProfilesAnswer {
  player: string;
  uuid: string;
  fetchedAt: string;
  profiles: Profile[];
}

const UNAVAILABLE = "Profile lookup is not available yet.";

export async function loadProfiles(name: string): Promise<ProfilesAnswer> {
  let response: Response;
  try {
    response = await fetch(`${SITE.api}/magic-find/profile?ign=${encodeURIComponent(name)}`);
  } catch {
    // An API without the route refuses the page's origin, which the browser reports as a network error.
    throw new LookupError(UNAVAILABLE);
  }
  const body = (await response.json().catch(() => ({}))) as { player?: string; uuid?: string; fetchedAt?: string; data?: { profiles?: Profile[] | null }; error?: string; code?: string };
  if (!response.ok) {
    const text = lookupMessage(response.status, body.code, body.error, name);
    throw new LookupError(text === NOT_AVAILABLE ? UNAVAILABLE : text);
  }
  return { player: body.player ?? name, uuid: body.uuid ?? "", fetchedAt: body.fetchedAt ?? "", profiles: body.data?.profiles ?? [] };
}

export interface Profile {
  profile_id: string;
  cute_name?: string;
  game_mode?: string;
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
