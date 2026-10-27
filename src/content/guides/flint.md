---
title: Flint
category: blocks
summary: Gravel for Flint in the Spider's Den, where Mining Speed does nothing and Maniac Miner with Bal carries the rates.
authors:
  - { id: the-ultimate-non, role: Guide }
source: { name: Mining Cult Discord }
updated: 2026-10-27
where: The Gravel Cave in the Spider's Den. Mine around the entrance, where the gravel chunks are bigger.
blocks:
  - "Gravel. Mining Speed has no effect; Haste and Efficiency do, and otherwise only the server TPS"
rates:
  - { label: Flint collection, value: 3.5M to 5.15M per hour }
  - { label: Insta-sell, value: 39.63M to 58.31M coins per hour }
  - { label: Sell offer, value: 42.65M to 62.76M coins per hour }
  - { label: NPC, value: 14.0M to 20.6M coins per hour }
ratesMeasured: Measured with a bot by the author on 8 April 2026, prices from Coflnet.
hotm:
  - label: Max efficiency
    hotm: 7
    tokens: 11
    powder: { mithril: 6759480, gemstone: 4600500 }
requirements:
  - { id: shovel, group: tools, kind: item, item: FLINT_SHOVEL, modifiers: [{ kind: recomb }, { kind: enchant, id: efficiency, level: 5 }, { kind: enchant, id: ultimate_wise, level: 5 }] }
  - { id: ability-drill, group: drill, kind: manual, label: Any drill for the ability, note: Perfectly-Cut Fuel Tank and a Blue Cheese omelette. }
  - { id: armor-budget, tier: budget, group: armor, kind: item, item: MINERAL_CHESTPLATE, label: 4/4 Mineral, modifiers: [{ kind: recomb }, { kind: reforge, id: jaded }, { kind: enchant, id: ultimate_wisdom, level: 5 }] }
  - { id: armor-max, tier: max, group: armor, kind: item, item: GLOSSY_MINERAL_CHESTPLATE, label: 4/4 Glossy Mineral, modifiers: [{ kind: recomb }, { kind: reforge, id: jaded }, { kind: enchant, id: ultimate_wisdom, level: 5 }] }
  - { id: equipment-budget, tier: budget, group: equipment, kind: manual, label: 2/4 Titanium, Ancient Cloak and Dwarven Handwarmers, note: Blazing, Quantum V. }
  - { id: equipment-max, tier: max, group: equipment, kind: manual, label: Pendant of Divan, Ancient Cloak, Jade Belt and Dwarven Handwarmers, note: Blazing, Quantum V. }
  - id: bal
    group: pet
    kind: pet
    pet: { type: BAL, minTier: LEGENDARY, level: 100, item: BEJEWELED_COLLAR }
    note: "Swap to Bal and use Maniac Miner whenever it is ready. Best to worst: Legendary Bal with Bejeweled Collar, with Minos Relic, with Quick Claw, then an Epic Scatha with Quick Claw. An Epic Crow now beats Bal for cooldown."
  - { id: scatha, group: pet, kind: pet, pet: { type: SCATHA, minTier: RARE, level: 100, item: PET_ITEM_QUICK_CLAW }, note: "Start with a Bejeweled Collar. Autopet: rod cast to Bal, Mining XP gain to the fortune pet." }
  - { id: glossy-talisman, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN, note: Or the Mineral Talisman. }
  - { id: relic, group: accessories, kind: accessory, item: POWER_RELIC }
  - { id: grimoire, group: tools, kind: item, item: GLOOMLOCK_GRIMOIRE, priority: optional }
  - { id: rogue-sword, group: tools, kind: item, item: ROGUE_SWORD, note: For speed. }
  - { id: magical-power, group: accessories, kind: manual, label: 450+ Magical Power, Sighted or Bizarre power stone, Intelligence tunings, note: Maniac Miner needs 2,000 Intelligence (1,333 with Blue Cheese), halved with Ultimate Wise V. }
  - { id: block-bran, group: consumables, kind: consumable, item: DWARVEN_OS_BLOCK_BRAN, count: 5 }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: truffle, group: consumables, kind: manual, label: Refined Dark Cacao Truffle }
  - { id: mossy-box, group: attributes, kind: attribute, attribute: mossy_box }
  - { id: echo-of-boxes, group: attributes, kind: attribute, attribute: echo_of_boxes }
  - { id: breeze, group: attributes, kind: attribute, attribute: breeze }
  - { id: mana-regeneration, group: attributes, kind: attribute, attribute: mana_regeneration }
  - { id: echo-of-echoes, group: attributes, kind: attribute, attribute: echo_of_echoes }
  - { id: ultimate-dna, group: attributes, kind: attribute, attribute: ultimate_dna }
  - { id: hotm-7, group: hotm, kind: skill, skill: HOTM, level: 7 }
---

## How to mine

Mine the gravel around the cave entrance with the Flint Shovel. When Maniac Miner is ready, swap to Bal, hold the
ability drill and use it, then go back to the shovel.

Use `/recipe enchanted flint` to compact straight from your sacks (Skytils can bind it to a key).

## Updates since the guide

- An Epic Crow is now better than a Legendary Bal for pickaxe ability cooldown.
- The Snail pet's speed penalty is fixed, so the workarounds for it are no longer needed.
- Mining lanterns: Mithril Lantern (HOTM 2), Titanium Lantern (HOTM 5), Glacite Lantern (HOTM 8), Will-o'-wisp (HOTM 10).
