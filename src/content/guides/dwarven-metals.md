---
title: Dwarven Metals
method: [UMBER, TUNGSTEN]
category: dwarven-metals
summary: Umber and Tungsten on routes in the Glacite Tunnels, mining Umber and Tungsten Mineshafts when they spawn, and forging the metals for profit.
authors:
  - { id: flora, role: Guide }
contributors:
  - { id: notwil, role: HOTM tree picture }
source: { name: Mining Cult Discord, posted: 2026-08-16 }
updated: 2026-10-27
where: Glacite Tunnels routes (Umber, Tungsten or a hybrid), plus Umber and Tungsten Mineshafts.
blocks:
  - "Red sandstone and clay: 3 Umber or Tungsten"
  - "Brown terracotta: 2 Umber"
  - "Terracotta and cobblestone (with slabs and stairs): 1 Umber or Tungsten"
rates:
  - label: Refined metal
    value: price of Refined Umber or Tungsten ÷ 160 × enchanted metal per hour
  - label: Keys
    value: (key price − Bejeweled Handle price) ÷ 192 × enchanted metal per hour
  - label: Plates
    value: (plate price − Glacite Amalgamation price) ÷ 640 × enchanted metal per hour
    note: The original post writes "key" here; the plate price is most likely meant.
ratesMeasured: Formulas, not measured rates. Mithril is left out because it is rarely profitable.
hotm:
  - label: Minimum
    hotm: 10
    cotm: 10
    powder: { mithril: 8750000, gemstone: 8800000, glacite: 13200000 }
    note: 8.6m Mithril, 7.4m Gemstone and 10.2m Glacite for the perks, plus 150k, 1.4m and 3m for Core of the Mountain 10. Skips Blockhead, No Stone Unturned, Gifts from the Departed and Warm Heart.
  - label: Maximum
    hotm: 10
    cotm: 10
    tree: dwarven-metals-msb
    powder: { mithril: 8750000, gemstone: 9700000, glacite: 17900000 }
    note: 8.6m, 8.3m and 14.9m for the perks, plus Core of the Mountain 10.
videos:
  - { title: Umber route, url: "https://youtu.be/ESBUIDVMZ0k", by: flora }
  - { title: Hybrid route, url: "https://youtu.be/oy2ykwkKoVM", by: flora }
  - { title: Umber Mineshaft, url: "https://youtu.be/Q893nBOAu14", by: flora }
requirements:
  - id: drill-max
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: lustrous }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 2 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 3 }
      - { kind: applied, item: DIVAN_POWDER_COATING }
      - { kind: drill_part, slot: tank, item: PERFECTLY_CUT_FUEL_TANK }
      - { kind: drill_part, slot: engine, item: AMBER_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_BLUE_CHEESE }
      - { kind: applied, item: POLARVOID_BOOK, count: 5 }
      - { kind: enchant, id: flowstate, level: 3 }
      - { kind: enchant, id: efficiency, level: 10 }
      - { kind: enchant, id: compact, level: 10 }
      - { kind: enchant, id: experience, level: 5 }
      - { kind: enchant, id: fortune, level: 4 }
  - id: drill-glacial
    tier: max
    group: drill
    priority: optional
    kind: item
    item: DIVAN_DRILL
    label: Second Divan's Drill for Tungsten Mineshafts
    note: Same upgrades, but Glacial instead of Lustrous. Worth it when you are above 25 Cold in Tungsten Mineshafts.
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: glacial }
  - id: drill-budget
    tier: budget
    group: drill
    kind: item
    item: TITANIUM_DRILL_4
    note: Same upgrades as the Divan's Drill; Experience 5 is optional.
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: lustrous }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 1 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 2 }
      - { kind: drill_part, slot: tank, item: PERFECTLY_CUT_FUEL_TANK }
      - { kind: drill_part, slot: engine, item: AMBER_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_BLUE_CHEESE }
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
      - { kind: gem, gem: JADE, quality: FLAWLESS, count: 2 }
  - id: pendant
    tier: max
    group: equipment
    kind: item
    item: DIVAN_PENDANT
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: blazing }
      - { kind: gem, gem: AMBER, quality: PERFECT }
      - { kind: gem, gem: JADE, quality: PERFECT }
      - { kind: applied, item: DIVAN_POWDER_COATING }
  - { id: cloak, tier: max, group: equipment, kind: item, item: SAPPHIRE_CLOAK, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: belt, tier: max, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: gloves, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }], note: Recombobulator on the max tier only. }
  - { id: titanium-equipment, tier: budget, group: equipment, kind: manual, label: 3 of the 4 Titanium equipment pieces, note: Blazing reforge. }
  - id: pet-max
    tier: max
    group: pet
    kind: pet
    pet: { type: SCATHA, minTier: RARE, level: 100, item: HEPHAESTUS_RELIC }
    note: Main pet, a lot of Mining Fortune.
  - id: pet-budget
    tier: budget
    group: pet
    kind: pet
    pet: { type: BAL, minTier: LEGENDARY, level: 100, item: BEJEWELED_COLLAR }
    note: 100 base Mining Fortune.
  - { id: wisp, group: tools, kind: item, item: WILL_O_WISP }
  - { id: abiphone, group: tools, kind: manual, label: Any Abiphone, note: Refuel your drill with Jotraeline Greatforge. }
  - id: relic
    group: accessories
    kind: accessory
    item: POWER_RELIC
    modifiers: [{ kind: recomb }, { kind: note, text: Full Perfect gemstones }]
  - { id: glossy-talisman, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN }
  - { id: metal-talisman, group: accessories, kind: accessory, item: DWARVEN_METAL }
  - { id: eight-ball, group: accessories, kind: accessory, item: MAGIC_8_BALL, priority: optional }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: mason-jar, group: consumables, kind: manual, label: Celestial Mason Jar }
  - { id: century-cakes, group: consumables, kind: manual, label: Century Cakes }
  - { id: fossil-shop, group: progress, kind: essence, essence: FOSSIL, perk: dwarven_expertise, level: 10, label: Fossil Essence shop }
  - { id: tungsten-collection, group: progress, kind: collection, collection: TUNGSTEN, level: 8 }
  - { id: umber-collection, group: progress, kind: collection, collection: UMBER, level: 8 }
  - { id: glacite-collection, group: progress, kind: collection, collection: GLACITE, level: 8 }
  - { id: rotten-pickaxe, group: attributes, kind: attribute, attribute: rotten_pickaxe, priority: required }
  - { id: ultimate-dna, group: attributes, kind: attribute, attribute: ultimate_dna, priority: required }
  - { id: fortunate-miner, group: attributes, kind: attribute, attribute: fortunate_miner, priority: required }
  - { id: pickaxe-cooldown, group: attributes, kind: attribute, attribute: pickaxe_cooldown, priority: required }
  - { id: sleepy-spread, group: attributes, kind: attribute, attribute: sleepy_spread, priority: required }
  - { id: scrap-chance, group: attributes, kind: attribute, attribute: scrap_chance, priority: recommended }
  - { id: quartz-speed, group: attributes, kind: attribute, attribute: quartz_speed, priority: recommended }
  - { id: strong-arm, group: hotm, kind: hotm, perk: strong_arm, level: max }
  - { id: metal-head, group: hotm, kind: hotm, perk: metal_head, level: max }
  - { id: surveyor, group: hotm, kind: hotm, perk: surveyor, level: max }
  - { id: cotm, group: hotm, kind: hotm, perk: core_of_the_mountain, level: 10 }
---

## How to mine

Load a route and mine. When Mining Speed Boost is ready, swap to the drill with the Blue Cheese omelette (and your
ability loadout, if you use one), use the ability and keep mining.

When a Mineshaft spawns, go in, loot the Lapis corpses and hunt Littlefoots. Mine the shaft if it is an Umber or Tungsten
one; otherwise `/warp camp` and go back to the route. Tungsten and hybrid routes never run out; on Umber, change lobby
once Mining Speed Boost is ready again.

### Umber

Focus red sandstone, then brown terracotta. Outside Mining Speed Boost, leave light terracotta alone. During the
ability, still aim for red sandstone and brown terracotta; plain terracotta is fine but not worth chasing.

### Tungsten

Outside Mineshafts, mine only clay. Inside Tungsten Mineshafts, cobblestone is fine during Mining Speed Boost. Finish
shafts quickly.

### Forging

Keep a second HOTM preset with Quick Forge. Switch to it when refined metal has 18 minutes left, or plates have 54
minutes left. Changing lobby skips the 10-minute preset cooldown; then switch back to the metals tree.

The method rewards skill and good use of the Forge. Route waypoints for Skyblocker and SkyHanni are shared in the
Mining Cult Discord.
