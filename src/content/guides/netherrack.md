---
title: Netherrack
category: blocks
summary: Netherrack on the Crimson Isle, mainly to reach the 1M collection for the Kuudra Follower Artifact in about ten minutes.
authors:
  - { id: the-ultimate-non, role: Guide }
contributors:
  - { id: the-ultimate-non, role: HOTM tree picture }
  - { id: koenigboohoo, role: HOTM tree guide }
source: { name: Mining Cult Discord }
updated: 2026-10-29
where: Crimson Isle around X -460, Y 180, Z -505.
blocks:
  - "Netherrack. Turn off Jump Boost and Rabbit effects in the Booster Cookie menu first"
rates:
  - { label: Netherrack collection, value: up to 7.5M to 10.5M per hour }
ratesMeasured: Not a money method. 1M collection for the Kuudra Follower Artifact takes about ten minutes.
hotm:
  - label: Max efficiency
    hotm: 7
    tokens: 11
    tree: blocks
    powder: { mithril: 6759480, gemstone: 4600500 }
videos:
  - { title: Budget setup without Black Cat, url: "https://youtu.be/nyZvFN-tgPo" }
requirements:
  - id: drill
    group: drill
    kind: any_of
    label: Fleet Titanium Drill DR-X655 or Fleet Divan's Drill
    note: Perfectly-Cut Fuel Tank, Amber-Polished Drill Engine, Blue Cheese omelette, Ultimate Wise V, Efficiency V to X, Fortune IV, Perfect Jade.
    options:
      - { id: dr-x655, group: drill, kind: item, item: TITANIUM_DRILL_4, modifiers: [{ kind: reforge, id: fleet }] }
      - { id: divan-drill, group: drill, kind: item, item: DIVAN_DRILL, modifiers: [{ kind: reforge, id: fleet }] }
  - { id: armor-budget, tier: budget, group: armor, kind: item, item: MINERAL_CHESTPLATE, label: 4/4 Mineral, modifiers: [{ kind: reforge, id: jaded }, { kind: enchant, id: ultimate_wisdom, level: 5 }] }
  - { id: armor-max, tier: max, group: armor, kind: item, item: GLOSSY_MINERAL_CHESTPLATE, label: 4/4 Glossy Mineral, modifiers: [{ kind: reforge, id: jaded }, { kind: enchant, id: ultimate_wisdom, level: 5 }] }
  - { id: equipment, group: equipment, kind: manual, label: Equipment as in the Flint guide }
  - { id: bal, group: pet, kind: pet, pet: { type: BAL, minTier: LEGENDARY, level: 100 }, note: "Autopet: Mining XP gain to the fortune pet." }
  - { id: black-cat, group: pet, kind: pet, pet: { type: BLACK_CAT, minTier: LEGENDARY, level: 100, item: PET_ITEM_QUICK_CLAW }, note: Start with a Bejeweled Collar. }
  - { id: kuudra, group: pet, kind: pet, pet: { type: KUUDRA, minTier: EPIC, level: 100 }, note: +100 Mining Fortune; its perks work even when it is not summoned. }
  - { id: glossy-talisman, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN, note: Or the Mineral Talisman. }
  - { id: relic, group: accessories, kind: accessory, item: POWER_RELIC }
  - { id: magical-power, group: accessories, kind: manual, label: 250+ Magical Power, Sighted or Bizarre power stone, Intelligence tunings, note: Maniac Miner needs 667 Intelligence with Blue Cheese and Ultimate Wise V, 1,000 without Blue Cheese. }
  - { id: sacks, group: tools, kind: manual, label: 25 to 30 Large Mining Sacks and 2 to 3 Large Enchanted Mining Sacks }
  - { id: block-bran, group: consumables, kind: consumable, item: DWARVEN_OS_BLOCK_BRAN, count: 5 }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: truffle, group: consumables, kind: manual, label: Refined Dark Cacao Truffle }
  - { id: mossy-box, group: attributes, kind: attribute, attribute: mossy_box }
  - { id: rotten-pickaxe, group: attributes, kind: attribute, attribute: rotten_pickaxe }
  - { id: echo-of-boxes, group: attributes, kind: attribute, attribute: echo_of_boxes }
  - { id: ultimate-dna, group: attributes, kind: attribute, attribute: ultimate_dna }
  - { id: hotm-7, group: hotm, kind: skill, skill: HOTM, level: 7 }
---

## How to mine

Gear barely matters at this scale: the goal is the 1M collection for the Kuudra Follower Artifact. Go to the spot,
turn off Jump Boost and Rabbit effects in the Booster Cookie menu, and mine. Use Maniac Miner whenever it is ready.

## Updates since the guide

- Since patch 0.27 (4 Aug 2026) Bal no longer lowers pickaxe ability cooldown (its Chimney perk was removed, wiki), so
  the guide's rod-swap to Bal before the ability is left out here; Bal still gives Mining Fortune.
