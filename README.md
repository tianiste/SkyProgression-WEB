# SkyProgression website

The website for [SkyProgression](https://github.com/tianiste/SkyProgression), a Hypixel SkyBlock mining progression
mod. It lives at [skyprogression.dev](https://skyprogression.dev).

It starts with the Mining Cult community's mining guides: gear for a budget and a max setup, Heart of the Mountain
trees drawn from data, attributes, rates and how to mine. Guides are stored as structured requirements, so a later
player lookup can show each guide as that player's to-do list. See [docs/PLAN.md](docs/PLAN.md) for the roadmap and
[docs/DESIGN.md](docs/DESIGN.md) for the visual design.

## Run it

You need Node.js 24 (see `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # type check, then a static build in dist/
npm run preview   # serve dist/
```

## Project layout

| Path | What it holds |
| --- | --- |
| `src/content/guides/*.md` | One guide per file: YAML front matter with the data, Markdown below it for the free text |
| `src/content/trees/*.yaml` | HOTM trees, perk ID to level |
| `src/content/attributes.yaml`, `src/content/stats.yaml` | The attribute and stat source references |
| `src/schema/guide.ts` | The guide data model (zod); also served as JSON Schema at `/schema/guide.json` |
| `src/data/` | Perk layout, item names, credited people |
| `src/pages/` | Routes: `/`, `/guides`, `/guides/<guide>` (with its HOTM trees), `/reference/*`, `/about` |
| `src/config.ts` | Site settings, including the Mining Cult Discord invite |

## Add a guide

1. Get the author's permission to publish it. Add the author to `src/data/people.ts` with any links they want shown.
2. Create `src/content/guides/<guide-id>.md`. The file name becomes the URL: `/guides/<guide-id>`. Copy an existing
   guide such as `dwarven-metals.md` as a starting point.
3. Fill in the front matter:
   - `title`, `category` (`gemstones`, `dwarven-metals`, `ores`, `blocks` or `other`), a one-sentence `summary`, and
     `method` with the mod's method names when the mod covers the method.
   - `authors` and `contributors` by their key in `people.ts`, `source`, and `updated` (the date you checked it).
   - `where`, `blocks`, `rates` and `ratesMeasured` for the summary at the top of the page.
   - `hotm`: one entry per preset with the HOTM tier, tokens, Core of the Mountain level and powder. Set `tree` to a
     file in `src/content/trees/` once the tree is drawn.
   - `requirements`: the gear and progress list (see below).
4. Write the free text (how to mine, routes, tips) as Markdown below the front matter, using `##` headings. Each `##`
   heading appears in the page's table of contents.
5. Run `npm run build`. The schema check names the exact field if something is wrong.

### Requirements

Every requirement has an `id` (unique in the guide), a `group` (`drill`, `tools`, `armor`, `equipment`, `pet`,
`accessories`, `consumables`, `progress`, `attributes`, `hotm` or `other`) and a `kind`. Add `tier: budget` or
`tier: max` when it belongs to one setup only; leave it out when it applies to both. `priority`, `note` and
`prerequisites` are optional.

| Kind | Fields | Example |
| --- | --- | --- |
| `item` | `item` (Hypixel item ID), `count`, `modifiers` | `{ kind: item, item: DIVAN_DRILL, modifiers: [{ kind: recomb }] }` |
| `pet` | `pet: { type, minTier, level, item }` | `{ kind: pet, pet: { type: SCATHA, minTier: RARE, level: 100 } }` |
| `hotm` | `perk` (perk ID), `level` (number or `max`) | `{ kind: hotm, perk: strong_arm, level: max }` |
| `powder` | `powder` (`mithril`, `gemstone`, `glacite`), `amount` | `{ kind: powder, powder: glacite, amount: 10000000 }` |
| `attribute` | `attribute` (ID from `attributes.yaml`), `level` | `{ kind: attribute, attribute: rotten_pickaxe }` |
| `essence` | `essence` (shop), `perk`, `level` | `{ kind: essence, essence: GOLD, perk: eager_miner, level: 10 }` |
| `accessory` | `item`, `modifiers` | `{ kind: accessory, item: POWER_RELIC }` |
| `collection` | `collection`, `level` | `{ kind: collection, collection: TUNGSTEN, level: 9 }` |
| `skill` | `skill` (`MINING` or `HOTM`), `level` | `{ kind: skill, skill: MINING, level: 60 }` |
| `consumable` | `item`, `count` | `{ kind: consumable, item: DWARVEN_OS_ORE_OATS, count: 5 }` |
| `manual` | `label` | Anything the API cannot check, such as an Abiphone contact |
| `any_of` | `label`, `options` (two or more requirements) | One of several items completes it |

Item modifiers: `recomb`, `reforge` (`id`, optional `stone`), `gem` (`gem`, `quality`, `count`), `enchant` (`id`,
`level`), `drill_part` (`slot`, `item`), `applied` (`item`, `count`, for coatings, books and scrolls) and `note`.

Use the IDs the Hypixel API uses. If an item has no display name yet, add it to `src/data/items.ts`. Each guide's
requirements are also published as JSON at `/guides/<guide-id>.json`.

### Add a HOTM tree

Create `src/content/trees/<tree-id>.yaml` with `status: published`, the `author`, `hotm`, the selected `ability` and
`perks` (perk ID to `max` or a level; `1` means unlocked only to reach other perks). Perk IDs and positions are in
`src/data/perks.ts`. Reference it from a guide's `hotm` preset with `tree: <tree-id>`.

## Deploy

The site is static and hosted on Cloudflare Pages: build command `npm run build`, output directory `dist`.
`public/_redirects` holds the redirects. CI builds every push and runs Lighthouse on a guide page.

## Icons

Item and HOTM textures come from the [FurfSky Reborn](https://furfsky.net) resource pack, used with the FurfSky Reborn
team's permission. Items FurfSky does not retexture use the official Hypixel SkyBlock Resource Pack (Hypixel API
`/v2/resources/packs`) or the face of the item's head skin from the Hypixel API, under Hypixel's license. Icons are keyed by Hypixel IDs in `src/data/icon-map.json` and `src/data/icons.generated.json`, so
guide data never names an icon. To add or change icons, edit `icon-map.json` (or add items to a guide), download the
pack from [Modrinth](https://modrinth.com/resourcepack/furfsky-reborn) and the Hypixel pack from the URL that
`https://api.hypixel.net/v2/resources/packs` lists, unzip both outside the repo and run:

```sh
node scripts/import-icons.mjs <unzipped FurfSky pack> <unzipped Hypixel pack>
```

The script copies only the textures the site uses into `public/icons/` and lists the IDs that fall back to the site's
own icons.

## License

The [MIT License](LICENSE) covers the code and the project's own content (logo, stat symbols, fallback icons). It does
not cover the textures in `public/icons/`, which belong to the FurfSky Reborn team and Hypixel Inc., or the guide text,
which belongs to its authors and is published with their permission. Pixelify Sans is under the SIL Open Font License
(`public/fonts/OFL.txt`). See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Not affiliated with Hypixel or Mojang.
