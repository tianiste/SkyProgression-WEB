# SkyProgression website plan

## Goal

The website version of SkyProgression, at `skyprogression.dev`. It starts with the community mining guides and grows to
cover every mod feature, without the visitor running the mod: guides, guides that turn into a to-do list for a looked-up
player, then stat breakdown, rates, upgrades, method comparison and "start with".

Design: **minimalist and responsive.** Mobile first, readable on a phone at 360 px, fast, little JavaScript.

## Decisions

- **Guides are published with the authors' permission** (given 2026-10-27). Every guide credits and links its authors:
  TheUltimateNon (Coal, Ores, Mithril, Flint, Netherrack; YouTube), flora / miningfemcel (Dwarven Metals; YouTube channel
  and route videos), Ghostz06 [SOAR] (Dwarven Diamond), NotWil and Meow (HOTM trees), the Mining Cult Discord. The
  invite link lives in one config value (`src/config.ts`); the server name is shown until it is set.
- **Stack:** Astro + TypeScript, static output, hosted on Cloudflare Pages (DNS already on Cloudflare; `api.` and
  `relay.` subdomains are taken, the site uses the apex and `www`). Small Preact islands only where interaction is needed
  (filters, player lookup, the HOTM tree hover). Plain CSS with custom properties, no CSS framework. Pagefind for search
  later.
- **The engine stays in Java.** The site never re-implements calculations. Player features call our API, which forwards
  to the relay VM, where the companion service runs the same `core/` engine as the mod. The companion already has
  `/stats`, `/compare`, `/start` and `/prices` endpoints; in relay mode it currently only answers `/health`, `/profile`
  and `/uuid`.
- **Guides are data, not prose,** so they can become a checklist (see "Guide data model").
- **License MIT,** README, CONTRIBUTING, no AI attribution anywhere, small commits pushed straight away, no secrets, item
  icons from FurfSky Reborn (with permission), then Hypixel's own SkyBlock pack and API (under Hypixel's license), then
  Minecraft's textures for plain blocks (under Mojang's usage guidelines); everything else uses our own pixel icons.

## Design

- Layout: one centered column, max width about 72rem; a top bar with the logo, Guides, Player lookup, About; a footer with
  credits, the "not affiliated with Hypixel" line and links to the mod (Modrinth, GitHub).
- Theme: dark by default matching the mod banner and pixel-art logo, with a light theme (follows the system setting,
  plus a toggle). Colour tokens in `:root`; one accent colour; status colours for owned / partial / missing / unknown that
  also differ by icon, not only colour.
- Type: system UI font for text, a pixel font only for the logo and large headings. Numbers in tabular figures.
- Components: card, stat row (label, value, bar), table that becomes stacked cards below 640 px, tabs, chips for filters,
  progress bar, tooltip/popover (tap on mobile), the HOTM tree grid (9 x 10 cells, scales to the screen width).
- Accessibility: keyboard navigation, focus outlines, alt text, contrast AA, no information only on hover.
- Performance: static pages, images as compressed WebP/PNG, JavaScript only in islands, no web fonts beyond the pixel
  font.

## Site map

| Path | Content | Phase |
| --- | --- | --- |
| `/` | What SkyProgression is, download buttons, guide categories, a "look up a player" box (disabled until phase 2) | 1 |
| `/guides` | All methods grouped (Gemstones, Dwarven Metals, Ores, Blocks, Other) with filters | 1 |
| `/guides/<method>` | One guide (layout below) | 1 |
| `/reference/attributes` | Every mining attribute and its effect | 1 |
| `/reference/stats` | Every mining stat source (from `general-stats.txt`, checked against our engine) | 1 |
| `/about` | Credits, sources, license, privacy | 1 |
| `/guides/<method>?player=<name>` | The guide as the player's to-do list | 2 |
| `/player/<name>` | Overview (the mod's Home tab): stats for the chosen method, current rate, best next upgrade, coins/hour per method | 3 |
| `/player/<name>/gear` | Stat breakdown by source, current vs attainable (the mod's Gear tab) | 3 |
| `/player/<name>/upgrades` | Ranked upgrades, step-by-step plan, buy vs craft, Other & progress (Upgrades tab) | 3 |
| `/player/<name>/methods` | Coins/hour comparison and rate details (Methods tab) | 3 |
| `/player/<name>/start` | Best owned loadout and where each piece is stored (Start with tab) | 3 |
| `/player/<name>/hotm` | Their tree vs the recommended tree for the method | 3 |

Player pages share a header: name, profile selector, method selector, data age, and "turn on API settings" help when data
is missing. Method and profile live in the URL query so links can be shared. Mod-only features stay in the mod: the
session tracker (it reads chat and the inventory live) and anything that needs the game client.

## Guide page layout

1. Summary: where to mine, key blocks, rates with the date they were measured, budget vs max.
2. HOTM presets with powder totals and the method's tree drawn from data (perk name and level on hover or tap), beside
   the gear on wide screens and above it on phones; "Tree coming soon" when no tree is confirmed. HOTM trees live
   inside each guide page; there is no separate HOTM tab (`/hotm` redirects to `/guides`).
3. Gear in two tiers (budget, max): drill, armor, equipment, pet and pet item, accessories, with every upgrade.
4. Attributes (shared table, filtered to the ones this method uses).
5. How to mine: routes, ability use, tips, videos.
6. Credits and sources, and the date the content was last checked.

## Guide data model

Each guide is a content-collection entry: YAML or JSON data plus an optional Markdown body for the free-text parts.
Requirements use the IDs the Hypixel API and our engine use, so the Java engine can evaluate them unchanged.

```yaml
method: DWARVEN_METALS        # matches the mod's MiningMethod names
title: Dwarven Metals
category: dwarven-metals
authors: [{ name: flora, links: [...] }]
source: { name: Mining Cult Discord, posted: 2026-08-16 }
updated: 2026-10-27
hotm: { tree: dwarven-metals-msb, powder: { mithril: 8600000, gemstone: 8300000, glacite: 14900000 } }
requirements:
  - id: drill-main
    tier: max
    label: Divan's Drill
    kind: item
    item: DIVAN_DRILL
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: lustrous }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 2 }
      - { kind: enchant, id: efficiency, level: 10 }
      - { kind: drill_part, slot: engine, id: amber_polished_drill_engine }
  - id: pet
    tier: max
    kind: pet
    pet: { type: SCATHA, minTier: RARE, level: 100, item: HEPHAESTUS_RELIC }
  - id: equipment
    tier: budget
    kind: any_of                # alternatives: any one completes it
    options: [...]
  - { id: strong-arm, kind: hotm, perk: strong_arm, level: max }
  - { id: rotten-pickaxe, kind: attribute, attribute: rotten_pickaxe, level: 10 }
  - { id: cereal, kind: manual, label: 5x Dwarven O's Metallic Minis }   # not in the API
```

Kinds: `item`, `pet`, `hotm`, `powder`, `attribute`, `essence`, `accessory`, `collection`, `skill`, `consumable`,
`manual`, `any_of`; `prerequisites` and `tier` on any entry. A JSON Schema for this file is published by the site, so the
engine and the site validate the same format. HOTM trees are their own data files (perk id to level per cell), converted
from the community tree pictures (see `src/content/trees/`).

## Player lookup architecture (phases 2-3)

```
browser -> api.skyprogression.dev (Worker: name to UUID, caching, rate limits)
        -> relay.skyprogression.dev (companion service, Java engine, Hypixel application key)
        -> Hypixel API
```

- Phase 2 endpoint: `POST /checklist` with the player and the guide's requirements (the site serves each guide's
  requirements as JSON); the engine returns owned / partial (with what is missing) / missing / unknown / manual for each.
  A generic evaluator keeps the server independent of guide wording.
- Phase 3: open the companion's engine endpoints (`/stats`, `/compare`, `/start`, upgrades) in relay mode behind the
  Worker. The relay does not fetch prices today; it would take them from the Worker's price bundle. Cache results per
  profile, bound response sizes, rate-limit per visitor.
- Needs: the Hypixel application key approved (a public site cannot rely on the 3-day development key); the relay VM is
  1 CPU / 1 GB, which is enough with caching; deploy steps as in `deploy/relay/README.md`.
- Visitors need the SkyBlock API settings on; missing data shows as unknown with how to enable it. Data age is shown
  (Hypixel delay plus our 30-minute cache).

## Phases and acceptance

1. **Guides site.** Repo setup (Astro, license, README, CONTRIBUTING, CI build check); layout, theme and components;
   home, guides list, guide page (with its HOTM trees), attribute and stat-source references, about. All guides converted from
   the community guide posts into the data model with credits. Only the four captioned trees are published as certain
   (Gold MSB, MF Gems MSB, MF Gems Maniac Miner, Dwarven Metals MSB); the others show as "coming soon" until the
   mapping is confirmed. Cloudflare Pages connected to the repository. Done when every guide renders on desktop and a 360 px
   phone, CI builds, and the Lighthouse scores are 95+ for performance and accessibility.
2. **Guides as a checklist.** `/checklist` endpoint in the mod repo (engine + relay + Worker); "Check my profile" on each
   guide with per-section progress. Done when a real profile ticks items correctly and unknown data is not shown as
   missing.
3. **Mod features on the web,** one page at a time in the order Overview, Gear, Upgrades, Methods, Start with, HOTM. Done
   per page when it matches the mod's numbers for the same profile.
   - **3D player model in their gear.** The player pages show the looked-up player's skin as a rotatable 3D model
     (skinview3d, MIT) wearing their armor: dyed leather from the API colour, player-head helmets from their skull
     texture, then FurfSky Reborn armor textures by applying the pack's item-to-texture rules per piece. The relay
     returns the worn pieces' render data (item ID, dye colour, skull texture URL). Lazy-loaded, with a static fallback
     for no WebGL and for reduced motion. Done when a looked-up player shows their skin and worn armor.
