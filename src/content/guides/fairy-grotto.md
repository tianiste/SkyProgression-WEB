---
title: Fairy Grotto
method: [GROTTO]
category: gemstones
summary: Jasper, the most valuable gemstone, mined in Fairy Grottos in the Crystal Hollows, with the surrounding gemstone veins added to the route.
authors:
  - { id: mining-cult, role: Guide }
contributors:
  - { id: mycelium-larper, role: Rate calculations }
  - { id: parker, role: Grotto routes }
source: { name: Mining Cult Discord }
updated: 2026-10-27
where: A Fairy Grotto in the Jungle of the Crystal Hollows, found yourself or bought in the Mining Cult trading channels. Mansion and Palace grottos are the best; grottos in the Magma Fields earn more.
blocks:
  - "Jasper veins inside the grotto"
  - "Breaking Power 7 gemstones (such as Jade and Amber) around it, since no grotto lasts forever"
  - "32,000 Mining Speed mines Jasper in 4 ticks with a level 2 Mining Speed Boost"
rates:
  - { label: Mansion, value: up to 12 Flawless Jasper and 3.1 Flawless gemstones per hour }
  - { label: Palace, value: up to 11 Flawless Jasper and 4.6 Flawless gemstones per hour }
  - { label: Fully in the Magma Fields, value: about 1.15 times better }
ratesMeasured: About 65% efficiency, little lag, grotto outside the Magma Fields. Ping (up to about 220 ms), TPS, griefed veins, the grotto type and prices all change your rates.
hotm:
  - label: Minimum and maximum
    hotm: 10
    tokens: 23
    cotm: 7
    powder: { mithril: 4050000, gemstone: 15800000, glacite: 4700000 }
    note: 3.9m, 14.4m and 4.7m for the perks plus 150k and 1.4m for Core of the Mountain 7. Levelling Mole and Efficient Miner makes routes easier.
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
    label: 4/4 Armor of Divan, without coating
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: jaded }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 2 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 2 }
      - { kind: gem, gem: TOPAZ, quality: PERFECT, count: 1 }
  - { id: pendant, tier: max, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: gem, gem: AMBER, quality: PERFECT }, { kind: gem, gem: JADE, quality: PERFECT }, { kind: applied, item: DIVAN_POWDER_COATING }] }
  - { id: belt, tier: max, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: cloak, tier: max, group: equipment, kind: item, item: SAPPHIRE_CLOAK, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: gloves, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: reforge, id: blazing }], note: Recombobulated on the max tier. }
  - { id: titanium-equipment, tier: budget, group: equipment, kind: manual, label: Titanium Necklace, Cloak and Belt, note: Blazing reforge. }
  - { id: scatha-max, tier: max, group: pet, kind: pet, pet: { type: SCATHA, minTier: LEGENDARY, level: 100, item: HEPHAESTUS_RELIC } }
  - { id: bal-max, tier: max, group: pet, kind: pet, pet: { type: BAL, minTier: LEGENDARY, level: 100, item: PET_ITEM_QUICK_CLAW }, note: Only if you mine inside the Magma Fields. }
  - { id: scatha-budget, tier: budget, group: pet, kind: pet, pet: { type: SCATHA, minTier: EPIC, level: 100, item: PET_ITEM_QUICK_CLAW }, note: Cheapest is the same pet with a Bejeweled Collar. }
  - id: drill-max
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    note: Lustrous for grottos outside the Magma Fields. A Heated copy lets you switch between grottos inside and outside the Magma Fields without reforging. Use Blue Cheese instead of Sunny Side if you do not drill swap.
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: lustrous }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 2 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 2 }
      - { kind: gem, gem: TOPAZ, quality: PERFECT, count: 1 }
      - { kind: applied, item: DIVAN_POWDER_COATING }
      - { kind: applied, item: POLARVOID_BOOK, count: 5 }
      - { kind: drill_part, slot: tank, item: PERFECTLY_CUT_FUEL_TANK }
      - { kind: drill_part, slot: engine, item: AMBER_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_SUNNY_SIDE }
      - { kind: enchant, id: lapidary, level: 5 }
      - { kind: enchant, id: flowstate, level: 3 }
      - { kind: enchant, id: efficiency, level: 10 }
      - { kind: enchant, id: compact, level: 10 }
      - { kind: enchant, id: experience, level: 5 }
      - { kind: enchant, id: fortune, level: 4 }
      - { kind: enchant, id: prismatic, level: 5 }
  - id: drill-budget
    tier: budget
    group: drill
    kind: item
    item: TITANIUM_DRILL_4
    note: Use Heated instead of Lustrous in a grotto fully inside the Magma Fields.
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: lustrous }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 1 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 1 }
      - { kind: gem, gem: TOPAZ, quality: PERFECT, count: 1 }
      - { kind: applied, item: POLARVOID_BOOK, count: 5 }
      - { kind: drill_part, slot: tank, item: GEMSTONE_FUEL_TANK }
      - { kind: drill_part, slot: engine, item: SAPPHIRE_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_BLUE_CHEESE }
      - { kind: enchant, id: lapidary, level: 5 }
      - { kind: enchant, id: flowstate, level: 3 }
      - { kind: enchant, id: efficiency, level: 10 }
      - { kind: enchant, id: experience, level: 3 }
      - { kind: enchant, id: fortune, level: 4 }
      - { kind: enchant, id: prismatic, level: 5 }
  - { id: relic, tier: max, group: accessories, kind: accessory, item: POWER_RELIC, modifiers: [{ kind: recomb }, { kind: note, text: Full Perfect gemstones }] }
  - { id: artifact, tier: budget, group: accessories, kind: accessory, item: POWER_ARTIFACT, modifiers: [{ kind: gem, gem: AMBER, quality: FLAWLESS }, { kind: gem, gem: JADE, quality: PERFECT }, { kind: gem, gem: TOPAZ, quality: PERFECT }] }
  - { id: jungle-amulet, group: accessories, kind: accessory, item: JUNGLE_AMULET }
  - { id: glossy-talisman, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN }
  - { id: titanium-relic, group: accessories, kind: accessory, item: TITANIUM_RELIC }
  - { id: haste-artifact, group: accessories, kind: accessory, item: HASTE_ARTIFACT }
  - { id: eight-ball, group: accessories, kind: accessory, item: MAGIC_8_BALL, priority: optional, note: Random and not needed. }
  - { id: wisp, tier: max, group: tools, kind: item, item: WILL_O_WISP, note: With 10 Mana Disintegrators. Grottos are small, so one deployable covers a lot of mining. }
  - { id: lantern, tier: budget, group: tools, kind: item, item: GLACITE_LANTERN, note: With 10 Mana Disintegrators. }
  - { id: abiphone, group: tools, kind: manual, label: Any Abiphone, note: Jotraeline Greatforge refuels your drill; the Alchemist sells Water Bottles to lower Heat. }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: century-cake, group: consumables, kind: manual, label: Century Cake of Hype }
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

Prepare the grotto first: place Cobblestone next to the Jasper veins so you can reach every block. No grotto lasts
forever, so add nearby gemstone veins to your route. Plan the route so you use your ability on Jasper only; that
gives the biggest boost.

If the grotto is in the Magma Fields, turn off all Heat Resistance sources, stand in lava until about 95 Heat, then
turn them back on. Stay near 95 Heat. If it gets too high, drink a Water Bottle, kill a Yog or jump a few times. Heat
Resistance comes from Keep It Cool, Blazing equipment, Armor of Divan, the Bal pet, the Yog Membrane attribute and
mining deployables.

Mine each vein fully, then Etherwarp to the next. Ping gliding matters: move to the next block before the last one
breaks, to make up for your ping. The ping-offset-miner mod shows when to do it.

### Drill swapping

Since update 0.27.2, Mining Speed Boost updates your stats while it runs, so drill swapping only works with two Divan's
Drills. Put the Sunny Side omelette on the main drill. The ability also ends early if you swap to an item without a
Blue Cheese omelette in its last 5 seconds.

### Pet rules

| Grotto | Autopet rule |
| --- | --- |
| Outside the Magma Fields | On Mining XP gain, equip Scatha (optional) |
| Fully in the Magma Fields | On Mining XP gain, equip Bal (optional) |
| Partly in the Magma Fields | On rod throw, equip Scatha unless it is equipped; on rod throw, equip Bal unless it is equipped. Throw your rod when you cross the border. |

## Buying a grotto

Most players buy a grotto instead of searching. A bad grotto ruins your rates, so check:

- **Lobby TPS.** Good lobbies hold 19 to 20 TPS with no lag spikes.
- **How hidden it is.** Grottos near the Crystal Nucleus or out in the open get griefed.
- **Missing or damaged veins.** Fewer Jasper veins means more filler gemstones and a higher chance of exposing the grotto.
- **The route.** A bad route costs a lot. If you are new to routing, use parker's routes for Mansion, Palace and Overgrown grottos.

## Useful mods

- SkyHanni for quality of life.
- Waypointer for routes.
- SkyblockCollectionTracker for rates, the ability timer and a stat overlay.
- ping-offset-miner for ping gliding and an efficiency display.
- NoFrills for quality of life and a drill fuel fix.
