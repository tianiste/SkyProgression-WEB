---
title: Flint
category: blocks
summary: Gravel for Flint in the Spider's Den, where Mining Speed does nothing and Maniac Miner with Bal carries the rates.
authors:
  - { id: the-ultimate-non, role: Guide }
contributors:
  - { id: the-ultimate-non, role: HOTM tree picture }
  - { id: koenigboohoo, role: HOTM tree guide }
source: { name: Mining Cult Discord }
updated: 2026-10-29
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
    tree: blocks
    powder: { mithril: 6759480, gemstone: 4600500 }
requirements:
  - { id: shovel, group: tools, kind: item, item: FLINT_SHOVEL, modifiers: [{ kind: recomb }, { kind: enchant, id: efficiency, level: 5 }, { kind: enchant, id: ultimate_wise, level: 5 }] }
  - { id: ability-drill, group: drill, kind: manual, label: Any drill for the ability, note: Perfectly-Cut Fuel Tank and a Blue Cheese omelette. }
  - { id: armor-budget, tier: budget, group: armor, kind: item, item: MINERAL_CHESTPLATE, label: 4/4 Mineral, modifiers: [{ kind: recomb }, { kind: reforge, id: jaded }, { kind: enchant, id: ultimate_wisdom, level: 5 }] }
  - { id: armor-max, tier: max, group: armor, kind: item, item: GLOSSY_MINERAL_CHESTPLATE, label: 4/4 Glossy Mineral, modifiers: [{ kind: recomb }, { kind: reforge, id: jaded }, { kind: enchant, id: ultimate_wisdom, level: 5 }] }
  - { id: pendant, tier: max, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: cloak, group: equipment, kind: item, item: ANCIENT_CLOAK, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: belt, tier: max, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: gloves, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: titanium-equipment, tier: budget, group: equipment, kind: manual, label: 2/4 Titanium equipment, note: Blazing, Quantum V. }
  - { id: scatha-budget, tier: budget, group: pet, kind: pet, pet: { type: SCATHA, minTier: RARE, level: 100, item: PET_ITEM_QUICK_CLAW }, note: "The guide's fortune pet (Autopet: Mining XP gain to it) and the last step of its pet path: Legendary Bal with a Bejeweled Collar, then Minos Relic, then Quick Claw, then an Epic Scatha with Quick Claw. Start with a Bejeweled Collar." }
  - { id: scatha-max, tier: max, group: pet, kind: pet, pet: { type: SCATHA, minTier: RARE, level: 100, item: HEPHAESTUS_RELIC }, note: "Our correction, not in the guide: Hephaestus Relic adds 50% to the pet's base stats, and Scatha's 125 Mining Fortune is a base stat, so it beats Quick Claw on Scatha only (wiki; Mining Cult gear progression guide)." }
  - { id: bal, group: pet, kind: pet, priority: optional, pet: { type: BAL, minTier: LEGENDARY, level: 100 }, note: "The guide swapped to Bal for its cooldown perk, which patch 0.27 (4 Aug 2026) removed; its 100 Mining Fortune is less than Scatha's 125. Our correction, not in the guide: skip Minos Relic, which now boosts combat stats only (wiki, patch 0.24.1)." }
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

Mine the gravel around the cave entrance with the Flint Shovel. When Maniac Miner is ready, hold the ability drill
and use it, then go back to the shovel.

Use `/recipe enchanted flint` to compact straight from your sacks (Skytils can bind it to a key).

## Updates since the guide

- Since patch 0.27 (4 Aug 2026) neither Bal nor Crow lowers pickaxe ability cooldown: Bal's Chimney perk was removed and Crow's Quick Hands now covers weapon abilities only (wiki).
  Earlier advice to rod-swap to either pet before the ability no longer helps.
- The Snail pet's speed penalty is fixed, so the workarounds for it are no longer needed.
- Our corrections to the pets (not the author's advice): Bal is optional now that its cooldown perk is gone, Minos Relic
  is left out because it now boosts combat stats only
  ([Minos Relic](https://hypixelskyblock.minecraft.wiki/w/Minos_Relic), patch 0.24.1), and the max tier puts a Hephaestus
  Relic on Scatha, which adds 50% to its 125 base Mining Fortune
  ([Hephaestus Relic](https://hypixelskyblock.minecraft.wiki/w/Hephaestus_Relic), [Scatha](https://hypixelskyblock.minecraft.wiki/w/Scatha_Pet)).
- Mining lanterns: Mithril Lantern (HOTM 2), Titanium Lantern (HOTM 5), Glacite Lantern (HOTM 8), Will-o'-wisp (HOTM 10).
