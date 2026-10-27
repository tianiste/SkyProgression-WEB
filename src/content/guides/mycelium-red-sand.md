---
title: Mycelium and Red Sand
method: [MYCELIUM, RED_SAND]
category: blocks
summary: Mycelium and Red Sand on the Crimson Isle with a Promising Shovel, Maniac Miner and a Will-o'-wisp, where Mining Speed does not matter.
authors:
  - { id: mining-cult, role: Guide }
source: { name: Mining Cult Discord }
updated: 2026-10-27
where: Crimson Isle. Place the Will-o'-wisp at -164.5 146 -901.5 for Mycelium or -695.5 124 -961.5 for Red Sand.
blocks:
  - "Mycelium or Red Sand. Max Fortune is 1,522 including Block Fortune (usually 25 less, from the Magic 8 Ball)"
rates:
  - { label: Mycelium, value: about 4.6M per hour, note: About 29,000 Enchanted Mycelium, or 29,667 holding W and A or D. }
  - { label: Red Sand, value: about 4.8M per hour, note: About 30,000 Enchanted Red Sand, or 30,690 holding W and A or D. }
hotm:
  - label: Recommended
    hotm: 7
    powder: { mithril: 6759480, gemstone: 4600500 }
requirements:
  - id: armor
    group: armor
    kind: item
    item: GLOSSY_MINERAL_CHESTPLATE
    label: 4/4 Glossy Mineral
    modifiers: [{ kind: recomb }, { kind: reforge, id: jaded }, { kind: enchant, id: ultimate_wisdom, level: 5 }]
  - { id: pendant, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: gem, gem: JADE, quality: PERFECT }, { kind: applied, item: DIVAN_POWDER_COATING }] }
  - id: cloak
    group: equipment
    kind: any_of
    label: Ancient Cloak or Sapphire Cloak
    note: Blazing, recombobulated.
    options:
      - { id: ancient-cloak, group: equipment, kind: item, item: ANCIENT_CLOAK }
      - { id: sapphire-cloak, group: equipment, kind: item, item: SAPPHIRE_CLOAK }
  - { id: belt, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: gloves, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: shovel, group: tools, kind: item, item: PROMISING_SPADE, modifiers: [{ kind: enchant, id: ultimate_wise, level: 5 }] }
  - { id: wisp, group: tools, kind: item, item: WILL_O_WISP, note: With 10 Mana Disintegrators. }
  - { id: ability-drill, group: drill, kind: manual, label: Any drill for the ability, note: Blue Cheese omelette and a Perfectly-Cut Fuel Tank. }
  - { id: grimoire, group: tools, kind: item, item: GLOOMLOCK_GRIMOIRE, priority: optional, note: If the Wisp runs out during Maniac Miner, its left-click ability buys time for 600 mana (you need 900 to 1,500 mana). }
  - { id: scatha, group: pet, kind: pet, pet: { type: SCATHA, minTier: RARE, level: 100, item: UNALLOYED_SPEED } }
  - { id: kuudra, group: pet, kind: pet, pet: { type: KUUDRA, minTier: EPIC, level: 100 } }
  - { id: glossy-talisman, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN }
  - { id: relic, group: accessories, kind: accessory, item: POWER_RELIC, label: Mythic Relic of Power }
  - { id: eight-ball, group: accessories, kind: accessory, item: MAGIC_8_BALL }
  - { id: fungus-fortuna, group: progress, kind: essence, essence: CRIMSON, perk: fungus_fortuna, level: 10, note: Mycelium. }
  - { id: harena-fortuna, group: progress, kind: essence, essence: CRIMSON, perk: harena_fortuna, level: 10, note: Red Sand. }
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
---

## How to mine

Turn off Jump Boost and Rabbit effects in the Booster Cookie menu, and turn Night Vision off. Place the Will-o'-wisp at
the coordinates above and mine with the Promising Shovel, using Maniac Miner whenever it is ready.

Holding W with A or D is about 2.3% faster. Mouse-only mining binds help too.
