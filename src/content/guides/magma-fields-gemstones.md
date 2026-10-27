---
title: Magma Fields Gemstones
method: [MF_GEMS, MF_RUBY, MF_TOPAZ]
category: gemstones
summary: Ruby, Amber, Sapphire, Jade, Amethyst and Topaz veins in the Magma Fields, using the Bal pet for extra Pristine and keeping your Heat near 95.
authors:
  - { id: mining-cult, role: Guide }
contributors:
  - { id: notwil, role: Mining Speed Boost HOTM tree picture }
  - { id: meow, role: Maniac Miner HOTM tree picture }
source: { name: Mining Cult Discord }
updated: 2026-10-27
where: The Magma Fields of the Crystal Hollows, in a lobby with steady 19 to 20 TPS, little structure grief and a day count under 10.
blocks:
  - "Ruby, Amber, Sapphire, Jade, Amethyst and Topaz veins on a prepared route"
  - "Bal's Furnace perk gives up to 3 Pristine inside the Magma Fields"
rates:
  - { label: Ruby, value: up to 23.5 Flawless per hour }
  - { label: Amber, value: up to 20.1 Flawless per hour }
  - { label: Sapphire, value: up to 20.1 Flawless per hour }
  - { label: Jade, value: up to 20.1 Flawless per hour }
  - { label: Amethyst, value: up to 20.1 Flawless per hour }
  - { label: Topaz, value: up to 16.5 Flawless per hour }
ratesMeasured: Calculated with max stats and 60% block efficiency using SkyHelper's /gemstone command. Testing yourself gives the most accurate numbers.
hotm:
  - label: Mining Speed Boost, minimum
    hotm: 7
    tokens: 17
    cotm: 7
    powder: { mithril: 4050000, gemstone: 13500000 }
    note: 3.9m and 12.1m for the perks plus 150k and 1.4m for Core of the Mountain 7. Skips Mining Master and the perks that lead to it.
  - label: Mining Speed Boost, maximum
    hotm: 10
    tokens: 23
    cotm: 7
    tree: mf-gems-msb
    powder: { mithril: 4050000, gemstone: 15800000, glacite: 4700000 }
    note: 3.9m, 14.4m and 4.7m for the perks plus Core of the Mountain 7. Levelling Mole and Efficient Miner makes routes easier.
  - label: Maniac Miner, minimum
    hotm: 7
    tokens: 16
    cotm: 7
    powder: { mithril: 4050000, gemstone: 13500000 }
    note: Same powder as the Mining Speed Boost minimum; skips Mining Master.
  - label: Maniac Miner, maximum
    hotm: 10
    tokens: 22
    cotm: 7
    tree: mf-gems-maniac
    powder: { mithril: 4050000, gemstone: 15800000, glacite: 4700000 }
requirements:
  - id: armor-max
    tier: max
    group: armor
    kind: item
    item: DIVAN_CHESTPLATE
    label: 4/4 Armor of Divan
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: jaded }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 2 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 2 }
      - { kind: gem, gem: TOPAZ, quality: PERFECT, count: 1 }
      - { kind: applied, item: DIVAN_POWDER_COATING }
  - id: armor-budget
    tier: budget
    group: armor
    kind: item
    item: DIVAN_CHESTPLATE
    label: 4/4 Armor of Divan
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: jaded }
      - { kind: gem, gem: AMBER, quality: FLAWLESS, count: 2 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 2 }
      - { kind: gem, gem: TOPAZ, quality: PERFECT, count: 1 }
  - { id: pendant, tier: max, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: gem, gem: AMBER, quality: PERFECT }, { kind: gem, gem: JADE, quality: PERFECT }, { kind: applied, item: DIVAN_POWDER_COATING }] }
  - { id: belt, tier: max, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: cloak, tier: max, group: equipment, kind: item, item: SAPPHIRE_CLOAK, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: gloves, tier: max, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: amethyst-gauntlet, tier: max, group: equipment, kind: item, item: AMETHYST_GAUNTLET, priority: optional, note: Replaces the Handwarmers when you mine Amethyst. Same upgrades., modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: titanium-equipment, tier: budget, group: equipment, kind: manual, label: Titanium Necklace, Cloak and Belt with Dwarven Handwarmers, note: Blazing reforge. }
  - { id: pet, group: pet, kind: pet, pet: { type: BAL, minTier: LEGENDARY, level: 100, item: PET_ITEM_QUICK_CLAW } }
  - id: drill-max
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    note: Use the Blue Cheese omelette instead of Sunny Side if you do not drill swap.
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: heated }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 2 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 2 }
      - { kind: gem, gem: TOPAZ, quality: PERFECT, count: 1 }
      - { kind: applied, item: DIVAN_POWDER_COATING }
      - { kind: applied, item: POLARVOID_BOOK, count: 5 }
      - { kind: drill_part, slot: tank, item: PERFECTLY_CUT_FUEL_TANK }
      - { kind: drill_part, slot: engine, item: AMBER_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_SUNNY_SIDE }
      - { kind: enchant, id: lapidary, level: 5 }
      - { kind: enchant, id: ultimate_flowstate, level: 3 }
      - { kind: enchant, id: efficiency, level: 10 }
      - { kind: enchant, id: compact, level: 10 }
      - { kind: enchant, id: experience, level: 5 }
      - { kind: enchant, id: fortune, level: 4 }
      - { kind: enchant, id: prismatic, level: 5 }
  - { id: swap-drill, tier: max, group: drill, kind: manual, label: Any drill with Flowstate III, a Perfectly-Cut Fuel Tank and a Blue Cheese omelette, priority: optional, note: Only if you drill swap with Maniac Miner. }
  - id: drill-budget
    tier: budget
    group: drill
    kind: item
    item: TITANIUM_DRILL_4
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: heated }
      - { kind: gem, gem: AMBER, quality: FLAWLESS, count: 1 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 1 }
      - { kind: gem, gem: TOPAZ, quality: PERFECT, count: 1 }
      - { kind: applied, item: POLARVOID_BOOK, count: 5 }
      - { kind: drill_part, slot: tank, item: GEMSTONE_FUEL_TANK }
      - { kind: drill_part, slot: engine, item: RUBY_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_BLUE_CHEESE }
      - { kind: enchant, id: lapidary, level: 5 }
      - { kind: enchant, id: ultimate_flowstate, level: 3 }
      - { kind: enchant, id: efficiency, level: 10 }
      - { kind: enchant, id: experience, level: 3 }
      - { kind: enchant, id: fortune, level: 4 }
      - { kind: enchant, id: prismatic, level: 5 }
  - id: drill-cheapest
    tier: budget
    group: drill
    kind: item
    item: GEMSTONE_DRILL_4
    label: Jasper Drill X (cheapest option)
    priority: optional
    modifiers:
      - { kind: reforge, id: heated }
      - { kind: gem, gem: AMBER, quality: FLAWLESS, count: 1 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 1 }
      - { kind: applied, item: POLARVOID_BOOK, count: 5 }
      - { kind: drill_part, slot: tank, item: TITANIUM_FUEL_TANK }
      - { kind: drill_part, slot: engine, item: TITANIUM_DRILL_ENGINE }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_SUNNY_SIDE }
      - { kind: enchant, id: lapidary, level: 5 }
      - { kind: enchant, id: ultimate_flowstate, level: 3 }
      - { kind: enchant, id: efficiency, level: 5 }
      - { kind: enchant, id: fortune, level: 4 }
      - { kind: enchant, id: prismatic, level: 5 }
  - { id: relic, tier: max, group: accessories, kind: accessory, item: POWER_RELIC, modifiers: [{ kind: recomb }, { kind: note, text: Full Perfect gemstones }] }
  - { id: artifact, tier: budget, group: accessories, kind: accessory, item: POWER_ARTIFACT, modifiers: [{ kind: gem, gem: AMBER, quality: FLAWLESS }, { kind: gem, gem: JADE, quality: PERFECT }, { kind: gem, gem: TOPAZ, quality: PERFECT }] }
  - { id: jungle-amulet, group: accessories, kind: accessory, item: JUNGLE_AMULET }
  - { id: glossy-talisman, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN }
  - { id: titanium-relic, group: accessories, kind: accessory, item: TITANIUM_RELIC }
  - { id: haste-artifact, group: accessories, kind: accessory, item: HASTE_ARTIFACT }
  - { id: eight-ball, group: accessories, kind: accessory, item: MAGIC_8_BALL, priority: optional, note: Random and not needed. }
  - { id: wisp, tier: max, group: tools, kind: item, item: WILL_O_WISP, note: With 10 Mana Disintegrators. Only worth it on routes built around it. }
  - { id: lantern, tier: budget, group: tools, kind: item, item: GLACITE_LANTERN, note: With 10 Mana Disintegrators. }
  - { id: abiphone, group: tools, kind: manual, label: Any Abiphone, note: Jotraeline Greatforge refuels your drill; the Alchemist sells Water Bottles to lower Heat. }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: century-cake, group: consumables, kind: manual, label: Century Cake of Hype }
  - { id: mason-jar, group: consumables, kind: manual, label: Celestial Mason Jar }
  - { id: grahams, group: consumables, kind: consumable, item: DWARVEN_OS_GEMSTONE_GRAHAMS, count: 5 }
  - { id: rhinestone, group: progress, kind: essence, essence: DIAMOND, perk: rhinestone_infusion, level: 10 }
  - { id: eager-adventurer, group: progress, kind: essence, essence: GOLD, perk: eager_adventurer, level: 10 }
  - { id: mining-60, group: progress, kind: skill, skill: MINING, level: 60 }
  - { id: umber-collection, group: progress, kind: collection, collection: UMBER, level: 8 }
  - { id: tungsten-collection, group: progress, kind: collection, collection: TUNGSTEN, level: 9 }
  - { id: obsidian-collection, group: progress, kind: collection, collection: OBSIDIAN, level: 10 }
  - { id: glacite-collection, group: progress, kind: collection, collection: GLACITE, level: 8 }
  - { id: deep-technique, group: attributes, kind: attribute, attribute: deep_technique, priority: required }
  - { id: pickaxe-cooldown, group: attributes, kind: attribute, attribute: pickaxe_cooldown, priority: required }
  - { id: devouring-spread, group: attributes, kind: attribute, attribute: devouring_spread, priority: required }
  - { id: fortunate-miner, group: attributes, kind: attribute, attribute: fortunate_miner, priority: required }
  - { id: rotten-pickaxe, group: attributes, kind: attribute, attribute: rotten_pickaxe, priority: recommended }
  - { id: ultimate-dna, group: attributes, kind: attribute, attribute: ultimate_dna, priority: recommended }
  - { id: yog-membrane, group: attributes, kind: attribute, attribute: yog_membrane, priority: optional }
  - { id: quartz-speed, group: attributes, kind: attribute, attribute: quartz_speed, priority: optional }
  - { id: fiesta-fortune, group: attributes, kind: attribute, attribute: fiesta_fortune, priority: optional }
---

## How to mine

Find a lobby with steady 19 to 20 TPS, little structure grief and a day count under 10. To see the day count, press
F3 + F6 and set `day_count` to "Always".

Load a route and dig to it. At each waypoint, place a Cobblestone, aim at it and throw a Bob-omb. Once every waypoint is
done, turn off all Heat Resistance sources, stand in lava until you reach about 95 Heat, then turn them back on.

Stay near 95 Heat the whole time. If it climbs too high, drink a Water Bottle, kill a Yog or jump a few times. Heat
Resistance comes from Keep It Cool, Blazing equipment, Armor of Divan, the Bal pet, the Yog Membrane attribute and
mining deployables.

Mine each vein fully, then Etherwarp to the next. Use your ability as soon as it is ready. Ping gliding helps a lot:
move to the next block before the last one breaks, to make up for your ping. The ping-offset-miner mod shows when to do
it.

### Drill swapping

Since update 0.27.2, Mining Speed Boost updates your stats while it runs, so drill swapping only works with two Divan's
Drills. Do not drill swap for Magma Fields gemstones. The ability also ends early if you swap to an item without a Blue
Cheese omelette in its last 5 seconds.

### Ruby

Run two 30-minute tests to see whether Maniac Miner or Mining Speed Boost earns more for you. If Maniac Miner wins,
keep drill swapping with the Maniac Miner tree. If Mining Speed Boost wins, put the Sunny Side omelette on the main
drill and stop swapping. A Royal Pendant of Divan gives just enough Mining Speed to break Ruby in 6 ticks.

### Breaking Power 7 gemstones

Use the Sunny Side omelette on the main drill if you reach the 4-tick threshold with a level 2 Mining Speed Boost
(+250% instead of +300%). Otherwise keep Blue Cheese on the main drill.

## Routes

Example routes for each gemstone, in SkyHanni and Coleweight format, are shared in the Mining Cult Discord along with
more in the route-sharing channel. Each route lists where to place mining deployables and where to bridge between
waypoints.

| Gemstone | Veins | Deployable waypoints |
| --- | --- | --- |
| Ruby | 53 | 1, 29 |
| Amber | 48 | 1, 11, 21, 33, 43 |
| Sapphire | 39 | 1, 16, 25, 37 |
| Jade | 35 | 1, 9, 16, 25, 35 |
| Amethyst | 38 | 1, 11, 21, 36 |
| Topaz | 27 | 1 |

## Useful mods

- SkyHanni for quality of life (and routes).
- Waypointer for routes.
- SkyblockCollectionTracker for rates, the ability timer and a stat overlay.
- ping-offset-miner for ping gliding and an efficiency display.
- NoFrills for quality of life and a drill fuel fix.
