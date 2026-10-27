---
title: Cobblestone
method: [COBBLESTONE]
category: blocks
summary: One of the easiest mining money makers. Run in a circle on the roof of the Dwarven Mines with Maniac Miner, barely affected by ping.
authors:
  - { id: mining-cult, role: Guide }
contributors:
  - { id: fazehunter, role: Location video }
  - { id: lfalloy, role: Roof access technique }
source: { name: Mining Cult Discord }
updated: 2026-10-27
where: The roof of the Dwarven Mines.
blocks:
  - "Stone: instamine at 601 Mining Speed"
rates:
  - { label: Cobblestone collection, value: about 13M to 16M per hour }
ratesMeasured: Multiply your collection per hour by the coins per Cobblestone you sell at.
hotm:
  - label: Minimum and maximum
    hotm: 7
    tokens: 14
    cotm: 2
    powder: { mithril: 6850000, gemstone: 6700000 }
    note: 6.8m Mithril and 6.7m Gemstone for the perks, plus 50k for Core of the Mountain 2.
requirements:
  - { id: armor-max, tier: max, group: armor, kind: item, item: GLOSSY_MINERAL_CHESTPLATE, label: 4/4 Glossy Mineral, modifiers: [{ kind: recomb }, { kind: reforge, id: jaded }] }
  - { id: armor-budget, tier: budget, group: armor, kind: item, item: MINERAL_CHESTPLATE, label: 4/4 Mineral, modifiers: [{ kind: reforge, id: jaded }] }
  - { id: pendant, tier: max, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: gem, gem: JADE, quality: PERFECT }, { kind: applied, item: DIVAN_POWDER_COATING }] }
  - { id: cloak, tier: max, group: equipment, kind: item, item: SAPPHIRE_CLOAK, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: belt, tier: max, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: gloves, tier: max, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: titanium-equipment, tier: budget, group: equipment, kind: manual, label: 4/4 Titanium equipment, note: Blazing reforge. }
  - { id: pet-max, tier: max, group: pet, kind: pet, pet: { type: BLACK_CAT, minTier: LEGENDARY, level: 100, item: UNALLOYED_SPEED } }
  - { id: pet-budget, tier: budget, group: pet, kind: pet, pet: { type: BLACK_CAT, minTier: LEGENDARY, level: 100, item: BEJEWELED_COLLAR }, note: Cheapest option is an Epic Bal with a Bejeweled Collar. }
  - id: drill-max
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: fleet }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 3 }
      - { kind: applied, item: POLARVOID_BOOK, count: 1 }
      - { kind: drill_part, slot: engine, item: AMBER_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: tank, item: PERFECTLY_CUT_FUEL_TANK }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_BLUE_CHEESE }
      - { kind: enchant, id: compact, level: 10 }
      - { kind: enchant, id: experience, level: 5 }
      - { kind: enchant, id: fortune, level: 4 }
  - id: drill-budget
    tier: budget
    group: drill
    kind: item
    item: TITANIUM_DRILL_4
    note: "Cheaper still: a DR-X555 with a Ruby-Polished engine and 1 Perfect Jade, or a DR-X455 with a Titanium-Plated engine and no gemstones."
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: fleet }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 2 }
      - { kind: applied, item: POLARVOID_BOOK, count: 1 }
      - { kind: drill_part, slot: engine, item: SAPPHIRE_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: tank, item: PERFECTLY_CUT_FUEL_TANK }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_BLUE_CHEESE }
      - { kind: enchant, id: compact, level: 10 }
      - { kind: enchant, id: experience, level: 5 }
      - { kind: enchant, id: fortune, level: 4 }
  - { id: relic, tier: max, group: accessories, kind: accessory, item: POWER_RELIC, modifiers: [{ kind: recomb }, { kind: note, text: Full Perfect gemstones }] }
  - { id: artifact, tier: budget, group: accessories, kind: accessory, item: POWER_ARTIFACT, modifiers: [{ kind: gem, gem: JADE, quality: PERFECT }] }
  - { id: glossy-talisman, tier: max, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN }
  - { id: mineral-talisman, tier: budget, group: accessories, kind: accessory, item: MINERAL_TALISMAN }
  - { id: eight-ball, group: accessories, kind: accessory, item: MAGIC_8_BALL, priority: optional, note: Random and not needed. }
  - { id: power-stone, group: accessories, kind: manual, label: 450+ Magical Power with Intelligence tunings, note: Bizarre power stone at max, Sighted on a budget. }
  - { id: wisp, tier: max, group: tools, kind: item, item: WILL_O_WISP, note: With 10 Mana Disintegrators. }
  - { id: lantern, tier: budget, group: tools, kind: item, item: GLACITE_LANTERN, note: With 10 Mana Disintegrators. }
  - { id: abiphone, group: tools, kind: manual, label: Any Abiphone, note: Jotraeline Greatforge refuels your drill. }
  - { id: sacks, group: tools, kind: manual, label: 25 to 30 Large Mining Sacks and 5 to 10 Large Enchanted Mining Sacks }
  - { id: century-cake, group: consumables, kind: manual, label: Century Cake of Hype }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: mason-jar, group: consumables, kind: manual, label: Celestial Mason Jar }
  - { id: block-bran, group: consumables, kind: consumable, item: DWARVEN_OS_BLOCK_BRAN, count: 5 }
  - { id: glacite-collection, group: progress, kind: collection, collection: GLACITE, level: 8 }
  - { id: umber-collection, group: progress, kind: collection, collection: UMBER, level: 8 }
  - { id: tungsten-collection, group: progress, kind: collection, collection: TUNGSTEN, level: 9 }
  - { id: obsidian-collection, group: progress, kind: collection, collection: OBSIDIAN, level: 8 }
  - { id: mining-60, group: progress, kind: skill, skill: MINING, level: 60 }
  - { id: pickaxe-cooldown, group: attributes, kind: attribute, attribute: pickaxe_cooldown, priority: required }
  - { id: mossy-box, group: attributes, kind: attribute, attribute: mossy_box, priority: required }
  - { id: fortunate-miner, group: attributes, kind: attribute, attribute: fortunate_miner, priority: required }
  - { id: sleepy-spread, group: attributes, kind: attribute, attribute: sleepy_spread, priority: required }
  - { id: echo-of-boxes, group: attributes, kind: attribute, attribute: echo_of_boxes, priority: recommended }
  - { id: breeze, group: attributes, kind: attribute, attribute: breeze, priority: recommended }
  - { id: echo-of-echoes, group: attributes, kind: attribute, attribute: echo_of_echoes, priority: recommended }
  - { id: ultimate-dna, group: attributes, kind: attribute, attribute: ultimate_dna, priority: recommended }
  - { id: mana-regeneration, group: attributes, kind: attribute, attribute: mana_regeneration, priority: recommended }
  - { id: frost-elemental, group: attributes, kind: attribute, attribute: frost_elemental, priority: optional }
  - { id: torrent-elemental, group: attributes, kind: attribute, attribute: torrent_elemental, priority: optional }
  - { id: snow-elemental, group: attributes, kind: attribute, attribute: snow_elemental, priority: optional }
  - { id: maximal-torment, group: attributes, kind: attribute, attribute: maximal_torment, priority: optional }
  - { id: echo-of-elemental, group: attributes, kind: attribute, attribute: echo_of_elemental, priority: optional }
  - { id: fog-elemental, group: attributes, kind: attribute, attribute: fog_elemental, priority: optional }
  - { id: water-elemental, group: attributes, kind: attribute, attribute: water_elemental, priority: optional }
  - { id: hotm-7, group: hotm, kind: skill, skill: HOTM, level: 7 }
---

## How to mine

Instead of trying to mine every block, run in a circle. Look down at about 45 degrees and hold W+D or W+A, depending
on whether you go clockwise or counter-clockwise. Use Maniac Miner whenever it is off cooldown.

Do not drill swap: keep the Blue Cheese omelette on your main drill. You refuel often and swapping gains very little.

The video in the Mining Cult post shows where to mine and how to get onto the roof of the Dwarven Mines.
