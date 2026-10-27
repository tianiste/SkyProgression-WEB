# Design

The site is a reading tool for SkyBlock miners on desktop and phone, and later a player's progress page. It takes its
identity from the mod's pixel-art logo: a diamond pickaxe over Minecraft's XP bar, on a slate tile.

## Palette

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| Slate tile (`--bg`) | `#1C1E26` | `#EEF1F5` | Page background, with a faint 16 px grid like the banner |
| Tile edge (`--line`) | `#3A3E4C` | `#C5CBD6` | Rules, borders |
| Diamond (`--accent`) | `#4FE3EC` | `#0B6F78` | Links, focus, maxed HOTM perks, budget tag |
| XP green (`--xp`) | `#8EF04A` | `#2F7A16` | Progress, current page, bridging perks |
| Ore gold (`--gold`) | `#FFC766` | `#8A5A00` | Max tier tag, abilities |
| Text (`--text`) | `#E6E8EF` | `#1C1E26` | Body text |

Dark is the default. Light follows the system setting, and the header button overrides either way.

## Type

- System UI font for all reading text; numbers use tabular figures.
- Pixelify Sans (self-hosted, one weight) only for page and section headings, echoing the logo's pixel lettering.
- Scale: major third from 17 px (14, 17, 21, 26, 33, 40). Page and section headings step down one size on phones.
- The footer is four short lines: guide credit, texture credit, non-affiliation and links. Full credits are on
  /about#credits.

## Layout

One column, max 72 rem, left aligned. Guide pages add a sticky "On this page" list from 1000 px up.

```
Home                                  Guide
+--------------------------------+    +--------------------------+--------+
| logo   Guides  Ref  About    ◐ |    | Guides / Gemstones       | On this|
+--------------------------------+    | Title (pixel)            | page   |
| [mark] Mining guides for ...   |    | summary, byline          |  ...   |
| [ Player name    ][Check]  soon|    | [XP bar] 0 of 43 checked |        |
| Guides                         |    | Where / Key blocks / Rate|        |
|  ■ Gemstones  ■ Metals  ■ Ores |    | Gear          | HOTM     |        |
|  links ...                     |    |  □ item, chips| powder   |        |
| The mod: Modrinth, GitHub      |    |  budget | max | tree     |        |
+--------------------------------+    | Attributes, how to mine  |        |
                                      +--------------------------+--------+
```

The HOTM column sits beside the gear from 1100 px up and above it below that. Below 1000 px the sticky contents list
becomes a collapsed "On this page" menu under the XP bar, and each gear group can be collapsed. Below 640 px tables turn into stacked
rows, the gear columns stack, and the navigation moves under the logo.

## Principles

- **The to-do list is the point.** Every requirement starts with an empty square and each guide opens with an empty XP
  bar. Player lookup will fill them in; nothing else on the page competes with that.
- **The HOTM tree is the one bold element.** Perks are pixel tiles; state is shown by colour and shape (diamond for
  maxed, small square for bridging, ring for abilities, dashed outline for not taken), with a text list as well.
  Tapping a perk opens a popover; no script is needed.
- **Quiet everywhere else.** Sentence case, hairline rules inside panels, and only two decorations: icons sit in
  sunken inventory slots (`.slot`), and an ore seam (`.seam`, a CSS-only strip of stone with a diamond and a gold
  pixel) runs under each page header. Panels group what belongs together: glance facts, guide categories, the phone
  contents menu.
- **Fast and accessible.** Static HTML, one font file, JavaScript only for the theme button and the guide filter.
  Visible focus, AA contrast in both themes, no information only on hover.
- **Icons carry meaning, text stays.** Item icons (FurfSky Reborn first, then Hypixel's own art, Minecraft blocks, then our pixel glyphs) sit
  next to their names, at whole-number scales. Stat symbols use the Hypixel stat colours.
