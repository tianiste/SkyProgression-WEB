---
title: Mithril
category: other
summary: Mithril veins in the Abandoned Quarry of the Dwarven Mines, mining Blue first and Titanium when it spawns, with Maniac Miner off cooldown.
authors:
  - { id: the-ultimate-non, role: Guide }
contributors:
  - { id: the-ultimate-non, role: HOTM tree picture }
  - { id: koenigboohoo, role: HOTM tree guide }
source: { name: Mining Cult Discord }
updated: 2026-10-29
where: Abandoned Quarry in the Dwarven Mines (Rail Master), around X -175, Y 138, Z -35.
blocks:
  - "Blue Mithril: strength 1,500, 5 Mithril, 5 powder"
  - "Green Mithril: strength 800, 2 Mithril, 3 powder"
  - "Gray Mithril: strength 500, 1 Mithril, 1 powder"
  - "Titanium: 0.5% base chance to replace mined Mithril, up to 7% with Titanium Insanium"
rates: []
ratesMeasured: Not profitable until Blue Mithril breaks in 6 ticks. Mithril Powder has its own guide.
hotm:
  - label: Recommended
    hotm: 7
    tokens: 17
    tree: mithril
    powder: { mithril: 11061843, gemstone: 8633785, glacite: 2184175 }
    note: Upgrade Core of the Mountain if you are short of tokens.
requirements:
  - id: drill-budget
    tier: budget
    group: drill
    kind: item
    item: TITANIUM_DRILL_4
    modifiers: [{ kind: reforge, id: auspicious }]
  - id: drill-max
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    note: Stellar (Petrified Starfall) works as well as Lustrous.
    modifiers: [{ kind: reforge, id: lustrous }]
  - id: drill-upgrades
    group: drill
    kind: manual
    label: Drill upgrades for either drill
    note: Perfectly-Cut Fuel Tank, Amber-Polished Drill Engine, Blue Cheese Goblin Omelette, Divan's Powder Coating, Efficiency X, Fortune IV, Perfect gemstones, Amber Power Scroll, Compact X, 5 Polarvoid Books.
  - { id: armor, group: armor, kind: item, item: DIVAN_CHESTPLATE, label: 4/4 Armor of Divan, note: 4 or 5 Perfect gemstones per piece; coating optional., modifiers: [{ kind: reforge, id: jaded }] }
  - { id: titanium-equipment, tier: budget, group: equipment, kind: manual, label: 4/4 Titanium equipment, note: Blazing, Quantum V. }
  - { id: titanium-equipment-max, tier: max, group: equipment, kind: manual, label: 2/4 Titanium equipment, note: Blazing, Quantum V. }
  - { id: gloves, tier: max, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: pendant, tier: max, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: scatha-budget, tier: budget, group: pet, kind: pet, pet: { type: SCATHA, minTier: RARE, level: 100, item: PET_ITEM_QUICK_CLAW }, note: "The guide's mining pet (Autopet: Mining XP gain to Scatha). Our correction, not in the guide: the guide names no pet item; start with a Bejeweled Collar, then Quick Claw (wiki)." }
  - { id: scatha-max, tier: max, group: pet, kind: pet, pet: { type: SCATHA, minTier: RARE, level: 100, item: HEPHAESTUS_RELIC }, note: "Our correction, not in the guide: Hephaestus Relic adds 50% to the pet's base stats, and Scatha's 125 Mining Fortune is a base stat, so it beats Quick Claw on Scatha only (wiki; Mining Cult gear progression guide)." }
  - { id: bal, group: pet, kind: pet, priority: optional, pet: { type: BAL, minTier: LEGENDARY, level: 100 }, note: "The guide rod-swapped to it for 10% less ability cooldown; patch 0.27 (4 Aug 2026) removed that perk, and its 100 Mining Fortune is less than Scatha's 125." }
  - { id: share-pet, group: pet, kind: manual, label: An XP-share pet (Golden Dragon or Black Cat) }
  - { id: glossy-talisman, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN, note: Or the Mineral Talisman. }
  - { id: relic, group: accessories, kind: accessory, item: POWER_RELIC }
  - { id: titanium-relic, group: accessories, kind: accessory, item: TITANIUM_RELIC }
  - { id: haste-artifact, group: accessories, kind: accessory, item: HASTE_ARTIFACT }
  - { id: metal-talisman, group: accessories, kind: accessory, item: DWARVEN_METAL }
  - { id: aotv, group: tools, kind: item, item: ASPECT_OF_THE_VOID, note: With Etherwarp. An Aspect of the End works too. }
  - { id: minis, group: consumables, kind: consumable, item: DWARVEN_OS_METALLIC_MINIS, count: 5 }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: truffle, group: consumables, kind: manual, label: Refined Dark Cacao Truffle }
  - { id: rotten-pickaxe, group: attributes, kind: attribute, attribute: rotten_pickaxe }
  - { id: quartz-speed, group: attributes, kind: attribute, attribute: quartz_speed }
  - { id: ultimate-dna, group: attributes, kind: attribute, attribute: ultimate_dna }
  - { id: hotm-7, group: hotm, kind: skill, skill: HOTM, level: 7 }
  - { id: titanium-insanium, group: hotm, kind: hotm, perk: titanium_insanium, level: max }
---

## How to mine

Mine Blue Mithril first, Green while the Blue respawns, and Titanium when it starts to cover too much of the vein. Use
Maniac Miner whenever it is off cooldown.

Mithril in the Dwarven Mines and Glacite Tunnels has a 0.5% chance to respawn as Titanium, up to 7% with Titanium
Insanium. The Sky Mall buff that multiplies Titanium drops by 5 brings the chance to 4.55%.

Ironman players can skip the gear list and use their best gear.

## Updates since the guide

- Since patch 0.27 (4 Aug 2026) Bal no longer lowers pickaxe ability cooldown (its Chimney perk was removed, wiki), so
  the guide's rod-swap to Bal before the ability is left out here; Bal still gives Mining Fortune.
- Our corrections to the pets (not the author's advice): Scatha is the mining pet and Bal is optional, since Bal's
  cooldown perk is gone and its 100 base Mining Fortune is less than Scatha's 125
  ([Scatha](https://hypixelskyblock.minecraft.wiki/w/Scatha_Pet), [Bal](https://hypixelskyblock.minecraft.wiki/w/Bal_Pet)).
  The guide names no pet item; Quick Claw adds 50 Mining Fortune and 50 Mining Speed at level 100, and a Hephaestus Relic
  adds 50% to Scatha's base stats
  ([Quick Claw](https://hypixelskyblock.minecraft.wiki/w/Quick_Claw), [Hephaestus Relic](https://hypixelskyblock.minecraft.wiki/w/Hephaestus_Relic)).
