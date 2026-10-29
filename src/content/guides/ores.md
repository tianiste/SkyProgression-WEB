---
title: Ores
category: ores
summary: Pure ores in the Dwarven Mines and Crystal Hollows with Maniac Miner, mostly Glossy Mineral armor and a Bal.
authors:
  - { id: the-ultimate-non, role: Guide }
contributors:
  - { id: koenigboohoo, role: HOTM tree guide }
source: { name: Mining Cult Discord }
updated: 2026-10-29
where: Dwarven Mines and Crystal Hollows. Pure Diamond, Emerald, Iron, Lapis, Redstone, Gold and Coal in the Royal Mines and the Mines of Divan; Pure Quartz only in the Abandoned Quarry.
blocks:
  - "Pure ores: 4 ticks at 4,001 Mining Speed, instamine at 36,001 with Mining Speed Boost"
  - "Other ores: instamine at 1,801, or 9,001 while falling"
  - "Pure ore tick thresholds: 10 ticks 1,715; 9 ticks 1,895; 8 ticks 2,118; 7 ticks 2,401; 6 ticks 2,770; 5 ticks 3,273"
rates:
  - { label: Diamond, value: 3.7M to 6M collection per hour, note: 3/4 Glossy and 1/4 Divan's. }
  - { label: Iron, value: 3.7M to 6M collection per hour, note: 3/4 Glossy and 1/4 Divan's. }
  - { label: Quartz, value: 3.7M to 5M collection per hour, note: 3/4 Glossy and 1/4 Divan's. }
  - { label: Emerald, value: 3.7M to 6M collection per hour, note: 3/4 Glossy and 1/4 Divan's. }
  - { label: Lapis, value: 2.75M to 4.75M collection per hour, note: 2/4 Glossy and 2/4 Divan's. }
  - { label: Redstone, value: 4.2M to 6.5M collection per hour, note: 3/4 Glossy and 1/4 Divan's. }
ratesMeasured: Dwarven Mines rates. Only Diamond, Quartz, Coal and Gold are profitable ores (noted September 2025).
hotm:
  - label: Max efficiency
    hotm: 7
    tokens: 15
    powder: { mithril: 6759480, gemstone: 4600500 }
  - label: HOTM tree guide
    hotm: 7
    tokens: 15
    cotm: 2
    tree: ores
    powder: { mithril: 8600000, gemstone: 8300000 }
    note: From the Heart of the Mountain tree guide. 8.6m Mithril and 8.3m Gemstone for the perks, plus 50k for Core of the Mountain 2.
requirements:
  - id: drill-budget
    tier: budget
    group: drill
    kind: item
    item: TITANIUM_DRILL_4
    modifiers: [{ kind: recomb }, { kind: reforge, id: auspicious }]
  - id: drill-max
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    note: Stellar (Petrified Starfall) works as well as Lustrous. Put Sunny Side on the main drill if you can afford a second drill with Blue Cheese.
    modifiers: [{ kind: recomb }, { kind: reforge, id: lustrous }]
  - id: drill-upgrades
    group: drill
    kind: manual
    label: Drill upgrades for either drill
    note: Perfectly-Cut Fuel Tank, Amber-Polished Drill Engine, Blue Cheese Goblin Omelette, Divan's Powder Coating, Perfect gemstones, Amber Power Scroll, 5 Polarvoid Books, Efficiency X, Fortune IV, Compact X, Ultimate Wise V.
  - id: armor
    group: armor
    kind: manual
    label: 3/4 Glossy Mineral and 1/4 Armor of Divan
    note: All Jaded and recombobulated. Perfect Jade in the Divan's piece; coating optional.
  - { id: titanium-equipment, tier: budget, group: equipment, kind: manual, label: 4/4 Titanium equipment, note: Blazing, Quantum V. }
  - { id: pendant, tier: max, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: cloak, tier: max, group: equipment, kind: item, item: ANCIENT_CLOAK, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: belt, tier: max, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: gloves, tier: max, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: bal, group: pet, kind: pet, pet: { type: BAL, minTier: LEGENDARY, level: 100 }, note: "The guide rod-swapped to it for 10% less ability cooldown; patch 0.27 (4 Aug 2026) removed that perk, so it now only adds Mining Fortune. Pet items in order: Bejeweled Collar, Minos Relic, Quick Claw." }
  - { id: scatha, group: pet, kind: pet, priority: optional, pet: { type: SCATHA, minTier: RARE, level: 100 }, note: "The guide's Autopet rod swap to Bal was for its cooldown perk, removed in patch 0.27; Scatha adds more Mining Fortune." }
  - { id: mineral-talisman, tier: budget, group: accessories, kind: accessory, item: MINERAL_TALISMAN }
  - { id: glossy-talisman, tier: max, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN }
  - { id: relic, group: accessories, kind: accessory, item: POWER_RELIC, modifiers: [{ kind: recomb }, { kind: gem, gem: JADE, quality: PERFECT }] }
  - { id: magical-power, group: accessories, kind: manual, label: 450+ Magical Power, Sighted or Bizarre power stone, Intelligence tunings, note: Maniac Miner needs 2,000 Intelligence for its full Fortune (1,333 with Blue Cheese, halved with Ultimate Wise V). }
  - { id: aotv, group: tools, kind: item, item: ASPECT_OF_THE_VOID, note: With Etherwarp. An Aspect of the End works too. }
  - { id: flare, group: tools, kind: manual, label: Alert or SOS Flare }
  - { id: grimoire, group: tools, kind: item, item: GLOOMLOCK_GRIMOIRE }
  - { id: sacks, group: tools, kind: manual, label: Large Mining Sack and Large Enchanted Mining Sack }
  - { id: ore-oats, group: consumables, kind: consumable, item: DWARVEN_OS_ORE_OATS, count: 5 }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: truffle, group: consumables, kind: manual, label: Refined Dark Cacao Truffle }
  - { id: glacite-collection, group: progress, kind: collection, collection: GLACITE, level: 8 }
  - { id: umber-collection, group: progress, kind: collection, collection: UMBER, level: 8 }
  - { id: tungsten-collection, group: progress, kind: collection, collection: TUNGSTEN, level: 8 }
  - { id: rotten-pickaxe, group: attributes, kind: attribute, attribute: rotten_pickaxe }
  - { id: quartz-speed, group: attributes, kind: attribute, attribute: quartz_speed }
  - { id: cavern-wisdom, group: attributes, kind: attribute, attribute: cavern_wisdom }
  - { id: ultimate-dna, group: attributes, kind: attribute, attribute: ultimate_dna }
  - { id: echo-of-wisdom, group: attributes, kind: attribute, attribute: echo_of_wisdom }
  - { id: echo-of-echoes, group: attributes, kind: attribute, attribute: echo_of_echoes }
  - { id: why-not-more, group: attributes, kind: attribute, attribute: why_not_more }
  - { id: breeze, group: attributes, kind: attribute, attribute: breeze }
  - { id: hotm-7, group: hotm, kind: skill, skill: HOTM, level: 7 }
---

## How to mine

Ores work best with Maniac Miner: mine the pure ore veins on a route, use the ability whenever it is ready
and Etherwarp between veins. Routes need Skytils or Skyblocker and are shared in the Mining Cult Discord.

Use `/recipe enchanted <material>` to compact straight from your sacks.

## Updates since the guide

- Since patch 0.27 (4 Aug 2026) neither Bal nor Crow lowers pickaxe ability cooldown: Bal's Chimney perk was removed and Crow's Quick Hands now covers weapon abilities only (wiki).
  Earlier advice to rod-swap to either pet before the ability no longer helps.
- Mining lanterns: Mithril Lantern (HOTM 2), Titanium Lantern (HOTM 5), Glacite Lantern (HOTM 8), Will-o'-wisp (HOTM 10).
- The Snail pet's speed penalty is fixed.
