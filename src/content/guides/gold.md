---
title: Gold
method: [GOLD]
category: ores
summary: Gold in the Mines of Divan, either with Maniac Miner in Glossy Mineral armor or instamining during Mining Speed Boost with a second loadout.
authors:
  - { id: mining-cult, role: Guide }
contributors:
  - { id: the-ultimate-non, role: Maniac Miner HOTM tree picture }
  - { id: willo-wisp, role: Mining Speed Boost HOTM tree picture }
  - { id: notwil, role: Drawn Mining Speed Boost tree }
source: { name: Mining Cult Discord }
updated: 2026-10-27
where: Mines of Divan in the Mithril Deposits of the Crystal Hollows. Find it with a Wishing Compass.
blocks:
  - "Gold blocks at your own height; skip the pillars"
  - "Instamine: 36,001 Mining Speed on Gold. Goblin adds 250 and Strong Arm a bugged 505, so 35,246 during Mining Speed Boost (8,812 without it)"
rates: []
ratesMeasured: The author has not posted rates yet.
hotm:
  - label: Maniac Miner
    hotm: 7
    tokens: 17
    cotm: 5
    powder: { mithril: 8750000, gemstone: 11500000 }
    note: 8.6m Mithril and 11m Gemstone for the perks, plus 150k and 500k for Core of the Mountain 5.
  - label: Mining Speed Boost
    hotm: 9
    tokens: 20
    cotm: 5
    tree: gold-msb
    powder: { mithril: 8750000, gemstone: 11500000, glacite: 1300000 }
    note: 8.6m, 11m and 1.3m for the perks, plus Core of the Mountain 5.
requirements:
  - id: drill-max
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    note: Main drill. Every mining drill also gets Divan's Powder Coating, Perfectly-Cut Fuel Tank, Amber-Polished Drill Engine, 5 Polarvoid Books, Flowstate III, Efficiency X, Compact X and Fortune IV.
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: lustrous }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 2 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 3 }
      - { kind: applied, item: DIVAN_POWDER_COATING }
      - { kind: applied, item: POLARVOID_BOOK, count: 5 }
      - { kind: drill_part, slot: tank, item: PERFECTLY_CUT_FUEL_TANK }
      - { kind: drill_part, slot: engine, item: AMBER_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_SUNNY_SIDE }
      - { kind: enchant, id: flowstate, level: 3 }
      - { kind: enchant, id: efficiency, level: 10 }
      - { kind: enchant, id: compact, level: 10 }
      - { kind: enchant, id: fortune, level: 4 }
  - id: swap-drill
    tier: max
    group: drill
    kind: manual
    label: Any drill for drill swapping
    note: Perfectly-Cut Fuel Tank and a Blue Cheese Goblin Omelette. Hold it only to use the ability.
  - id: drill-budget
    tier: budget
    group: drill
    kind: item
    item: TITANIUM_DRILL_4
    note: Blue Cheese omelette, or Sunny Side if you keep a second drill for swapping.
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: auspicious }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 1 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 2 }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_BLUE_CHEESE }
  - id: armor
    group: armor
    kind: item
    item: GLOSSY_MINERAL_CHESTPLATE
    label: 4/4 Glossy Mineral
    modifiers: [{ kind: recomb }, { kind: reforge, id: jaded }]
  - { id: pendant, tier: max, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: gem, gem: AMBER, quality: PERFECT }, { kind: gem, gem: JADE, quality: PERFECT }, { kind: applied, item: DIVAN_POWDER_COATING }] }
  - { id: cloak, tier: max, group: equipment, kind: item, item: SAPPHIRE_CLOAK, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: belt, tier: max, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: gloves, tier: max, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: titanium-equipment, tier: budget, group: equipment, kind: manual, label: 4/4 Titanium equipment, note: Blazing reforge. }
  - { id: pet-max, tier: max, group: pet, kind: pet, pet: { type: GOBLIN, minTier: LEGENDARY, level: 100, item: HEPHAESTUS_RELIC } }
  - { id: pet-budget, tier: budget, group: pet, kind: pet, pet: { type: GOBLIN, minTier: LEGENDARY, level: 100, item: BEJEWELED_COLLAR } }
  - { id: wisp, group: tools, kind: item, item: WILL_O_WISP, note: Always stay in its radius while instamining. }
  - { id: relic, group: accessories, kind: accessory, item: POWER_RELIC, modifiers: [{ kind: recomb }, { kind: note, text: Full Perfect gemstones }] }
  - { id: titanium-relic, group: accessories, kind: accessory, item: TITANIUM_RELIC, note: For instamining. }
  - { id: haste-artifact, group: accessories, kind: accessory, item: HASTE_ARTIFACT, note: For instamining. }
  - { id: speed-relic, group: accessories, kind: accessory, item: SPEED_RELIC, note: For instamining. }
  - { id: eight-ball, group: accessories, kind: accessory, item: MAGIC_8_BALL, priority: optional }
  - { id: god-potion, group: consumables, kind: manual, label: Haste effect (God Potion), note: For instamining. }
  - { id: mason-jar, group: consumables, kind: manual, label: Celestial Mason Jar }
  - { id: century-cakes, group: consumables, kind: manual, label: Century Cakes }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: eager-miner, group: progress, kind: essence, essence: GOLD, perk: eager_miner, level: 10, note: For instamining. }
  - { id: metal-collections, group: progress, kind: manual, label: Tungsten, Umber and Glacite collections }
  - { id: rotten-pickaxe, group: attributes, kind: attribute, attribute: rotten_pickaxe, priority: recommended, note: For instamining. }
  - { id: royal-riches, group: attributes, kind: attribute, attribute: royal_riches, priority: recommended, note: For instamining. }
  - { id: greedy-goblin, group: attributes, kind: attribute, attribute: greedy_goblin, priority: recommended }
  - { id: ultimate-dna, group: attributes, kind: attribute, attribute: ultimate_dna, priority: recommended }
  - { id: fortunate-miner, group: attributes, kind: attribute, attribute: fortunate_miner, priority: recommended }
  - { id: sleepy-spread, group: attributes, kind: attribute, attribute: sleepy_spread, priority: recommended }
  - { id: pickaxe-cooldown, group: attributes, kind: attribute, attribute: pickaxe_cooldown, priority: recommended }
---

## How to mine

Gold collection upgrades your Bank and adds Magic Find and Strength to the Golden Dragon pet. Pick Maniac Miner or
Mining Speed Boost as your ability, then go into the Mithril Deposits and use a Wishing Compass to find the Mines of
Divan.

### Maniac Miner

Mine in 4/4 Glossy Mineral. When the ability is ready, swap to the drill-swapping drill, use it, and go back to the main
drill. Mine the blocks at your own height and ignore the pillars.

### Mining Speed Boost (instamining)

Keep two loadouts: the gear you mine with outside the ability, and an ability set. Mine with the first. When the ability
is ready, place a Will-o'-wisp, hold the Blue Cheese drill, swap to the ability loadout, wait for your Mining Speed to
update, use the ability and mine. When it ends, swap back and keep mining with the main drill.

Both loadouts use the max gear above unless the table says otherwise.

| Setup | Outside the ability | During the ability |
| --- | --- | --- |
| 2/4 Glossy | 4/4 Glossy, Lustrous Divan's Drill with Sunny Side | 2/4 Glossy + 2/4 Divan's, Lustrous Divan's Drill with Blue Cheese |
| 3/4 Glossy, max Fortune | 4/4 Glossy, Lustrous Divan's Drill with Sunny Side | 3/4 Glossy + 1/4 Divan's; Auspicious Divan's Drill (3 Perfect Amber, 2 Perfect Jade) with Blue Cheese; Royal equipment; Goblin with Quick Claw |
| 3/4 Glossy, budget | 4/4 Glossy, Lustrous Divan's Drill with Sunny Side | 3/4 Glossy + 1/4 Divan's; Ambered Divan's Drill (3 Perfect Amber, 2 Perfect Jade) with Blue Cheese |
| 4/4 Glossy | Heated Divan's Drill with Sunny Side | Heated Divan's Drill (3 Perfect Amber, 2 Perfect Jade) with Blue Cheese; Goblin with Quick Claw |

The 4/4 Glossy setup only works reliably in a Mines of Divan inside the Magma Fields at 89 Heat or more.
