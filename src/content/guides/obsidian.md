---
title: Obsidian
method: [OBSIDIAN]
category: blocks
summary: A skill-based block method. Follow floor and wall waypoints with a Snail, and swap to Scatha and a Blue Cheese drill for Mining Speed Boost.
authors:
  - { id: mining-cult, role: Guide }
source: { name: Mining Cult Discord }
updated: 2026-10-27
where: Obsidian waypoints shared in the Mining Cult post, imported into SkyHanni.
blocks:
  - "Obsidian floor and walls, alternating floor then wall, clockwise"
rates:
  - { label: Obsidian collection, value: about 3.5M per hour, note: About 21,875 Enchanted Obsidian. }
ratesMeasured: With max Magical Power and decent skill. Crafting Obsidian into Null Ovoids can add profit.
hotm:
  - label: Recommended
    hotm: 10
    powder: { mithril: 8517747, gemstone: 9550915 }
    note: 8,283,870 Gemstone if you are not levelling a pet. Max the perks that give Mining Speed and Block Fortune; Seasoned Mineman only if a pet is on EXP share. The tree picture for this method is not drawn yet.
requirements:
  - id: armor
    group: armor
    kind: item
    item: GLOSSY_MINERAL_CHESTPLATE
    label: 4/4 Glossy Mineral
    note: Sugar Rush III on the boots.
    modifiers: [{ kind: recomb }, { kind: reforge, id: jaded }]
  - { id: pendant, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: gem, gem: AMBER, quality: PERFECT }, { kind: gem, gem: JADE, quality: PERFECT }, { kind: applied, item: DIVAN_POWDER_COATING }] }
  - { id: cloak, group: equipment, kind: item, item: DRAGONFADE_CLOAK, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: belt, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: gloves, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - id: drill-main
    group: drill
    kind: item
    item: DIVAN_DRILL
    note: If you cannot afford a second drill, put the Blue Cheese omelette on this one.
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: fleet }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 2 }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 3 }
      - { kind: applied, item: DIVAN_POWDER_COATING }
      - { kind: applied, item: POLARVOID_BOOK, count: 5 }
      - { kind: drill_part, slot: engine, item: AMBER_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: tank, item: PERFECTLY_CUT_FUEL_TANK }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_SUNNY_SIDE }
      - { kind: enchant, id: flowstate, level: 3 }
      - { kind: enchant, id: efficiency, level: 10 }
      - { kind: enchant, id: compact, level: 10 }
      - { kind: enchant, id: fortune, level: 4 }
  - { id: drill-ability, group: drill, kind: item, item: DIVAN_DRILL, label: Second Divan's Drill with Blue Cheese, note: Same as the main drill with a Blue Cheese omelette. Hold it for the ability., modifiers: [{ kind: drill_part, slot: module, item: GOBLIN_OMELETTE_BLUE_CHEESE }] }
  - { id: wisp, group: tools, kind: item, item: WILL_O_WISP, note: With 10 Mana Disintegrators. Replace it whenever it runs out. }
  - { id: rogue-sword, group: tools, kind: item, item: ROGUE_SWORD, modifiers: [{ kind: reforge, id: heroic }, { kind: enchant, id: ultimate_wise, level: 5 }], note: Use it every 30 seconds. }
  - { id: tuba, group: tools, kind: item, item: WEIRDER_TUBA, note: Use it every 30 seconds. }
  - { id: rod, group: tools, kind: manual, label: Any fishing rod, note: "Autopet: rod throw to Scatha unless equipped, rod throw to Snail unless equipped." }
  - { id: scatha, group: pet, kind: pet, pet: { type: SCATHA, minTier: RARE, level: 100, item: UNALLOYED_SPEED } }
  - { id: snail, group: pet, kind: pet, pet: { type: SNAIL, minTier: LEGENDARY, level: 100, item: PET_ITEM_QUICK_CLAW } }
  - { id: glossy-talisman, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN }
  - { id: haste-artifact, group: accessories, kind: accessory, item: HASTE_ARTIFACT }
  - { id: titanium-relic, group: accessories, kind: accessory, item: TITANIUM_RELIC }
  - { id: speed-relic, group: accessories, kind: accessory, item: SPEED_RELIC }
  - { id: relic, group: accessories, kind: accessory, item: POWER_RELIC, label: Mythic Relic of Power }
  - { id: eight-ball, group: accessories, kind: accessory, item: MAGIC_8_BALL, priority: optional }
  - { id: speed-power, group: accessories, kind: manual, label: Speed from Magical Power, note: Sunflower Butter reforge stone, as much Magical Power as you can, all tuning points and enrichments on Speed. }
  - { id: beacon, group: other, kind: manual, label: Tier 5 Beacon, note: Scorched Power Crystal, Speed effect and Speed profile stat. }
  - { id: forbidden-speed, group: progress, kind: essence, essence: WITHER, perk: forbidden_speed, level: 2 }
  - { id: eager-miner, group: progress, kind: essence, essence: GOLD, perk: eager_miner, level: 10 }
  - { id: glacite-collection, group: progress, kind: collection, collection: GLACITE, level: 8 }
  - { id: tungsten-collection, group: progress, kind: collection, collection: TUNGSTEN, level: 8 }
  - { id: umber-collection, group: progress, kind: collection, collection: UMBER, level: 9 }
  - { id: obsidian-collection, group: progress, kind: collection, collection: OBSIDIAN, level: 10 }
  - { id: block-bran, group: consumables, kind: consumable, item: DWARVEN_OS_BLOCK_BRAN, count: 5 }
  - { id: century-cake, group: consumables, kind: manual, label: Century Cake of Hype }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: mason-jar, group: consumables, kind: manual, label: Celestial Mason Jar }
  - { id: mossy-box, group: attributes, kind: attribute, attribute: mossy_box }
  - { id: echo-of-boxes, group: attributes, kind: attribute, attribute: echo_of_boxes }
  - { id: echo-of-echoes, group: attributes, kind: attribute, attribute: echo_of_echoes }
  - { id: ultimate-dna, group: attributes, kind: attribute, attribute: ultimate_dna }
  - { id: fortunate-miner, group: attributes, kind: attribute, attribute: fortunate_miner }
  - { id: sleepy-spread, group: attributes, kind: attribute, attribute: sleepy_spread }
  - { id: pickaxe-cooldown, group: attributes, kind: attribute, attribute: pickaxe_cooldown }
  - { id: rotten-pickaxe, group: attributes, kind: attribute, attribute: rotten_pickaxe }
  - { id: speed-attribute, group: attributes, kind: manual, label: Speed X (+10 Speed) }
  - { id: tuning-box, group: attributes, kind: manual, label: Tuning Box X (+10 tuning points) }
---

## How to mine

Import the Obsidian waypoints into SkyHanni.

When Mining Speed Boost is ready, rod-swap to Scatha, switch to the drill with the Blue Cheese omelette, use the
ability and run around mining both the floor and the walls.

While the ability is on cooldown, rod-swap back to the Snail and follow the waypoints in order: floor, wall, floor,
wall, until the ability is ready again. Go clockwise. Replace your Will-o'-wisp whenever it runs out, and use the Rogue
Sword and Weirder Tuba every 30 seconds.
