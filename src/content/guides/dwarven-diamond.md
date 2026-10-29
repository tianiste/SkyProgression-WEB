---
title: Dwarven Diamond
category: ores
summary: Pure Diamonds in the Dwarven Mines with Maniac Miner, 4-ticking at 4,001 Mining Speed and teleporting between veins with Etherwarp.
authors:
  - { id: ghostz06, role: Guide }
contributors:
  - { id: the-ultimate-non, role: HOTM tree picture }
  - { id: koenigboohoo, role: HOTM tree guide }
source: { name: Mining Cult Discord, posted: 2025-04-15 }
updated: 2026-10-29
where: Pure Diamond veins in the Dwarven Mines, on a route with Etherwarp.
blocks:
  - "Pure Diamond: 4 ticks at 4,001 Mining Speed"
rates:
  - { label: Diamond collection, value: about 4M to 6.5M per hour }
  - { label: Coins, value: about 32M to 52M per hour }
ratesMeasured: With Maniac Miner. Written with Ironman profiles in mind.
hotm:
  - label: Max Spread and Fortune
    hotm: 7
    tokens: 15
    powder: { mithril: 6759480, gemstone: 4600500 }
  - label: HOTM tree guide
    hotm: 7
    tokens: 15
    cotm: 2
    tree: ores
    powder: { mithril: 8600000, gemstone: 7400000 }
    note: From the Heart of the Mountain tree guide, the same picture as Ore Mining. Minimum 8.6m Mithril, 3.7m Gemstone and 12 tokens (skips Speedy Mineman), plus 50k for Core of the Mountain 2.
requirements:
  - id: drill-budget
    tier: budget
    group: drill
    kind: item
    item: TITANIUM_DRILL_2
    modifiers: [{ kind: reforge, id: stellar }]
  - id: drill-max
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    modifiers: [{ kind: recomb }, { kind: reforge, id: lustrous }]
  - id: drill-upgrades
    group: drill
    kind: manual
    label: Drill upgrades for either drill
    note: Perfectly-Cut Fuel Tank, Amber-Polished Drill Engine, Blue Cheese omelette, Fortune IV, Perfect gemstones (Jade in the universal slot on a DR-X655 or better), Compact X, 5 Polarvoid Books. Better with a second drill holding Blue Cheese and at least a Gemstone Fuel Tank.
  - id: armor
    group: armor
    kind: manual
    label: 1/4 Armor of Divan and 3/4 Glossy Mineral
    note: All Jaded with Wisdom V. The Divan's piece gets a Perfect Jade and a coating. Without Glossy, use 4/4 Mineral; a 2/4 mix also works.
  - { id: titanium-equipment, tier: budget, group: equipment, kind: manual, label: 4/4 Titanium equipment, note: Its set bonus beats an Ancient Cloak with Handwarmers. }
  - { id: belt, tier: max, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: cloak, tier: max, group: equipment, kind: item, item: SAPPHIRE_CLOAK, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: gloves, tier: max, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }] }
  - { id: pendant, tier: max, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: applied, item: DIVAN_POWDER_COATING }] }
  - { id: scatha-budget, tier: budget, group: pet, kind: pet, pet: { type: SCATHA, minTier: RARE, level: 100, item: PET_ITEM_QUICK_CLAW }, note: "The guide's fortune pet, Rare to Legendary (Autopet: Mining XP to Scatha). Start with a Bejeweled Collar. Our correction, not in the guide: Minos Relic is left out because it now boosts combat stats only (wiki, patch 0.24.1)." }
  - { id: scatha-max, tier: max, group: pet, kind: pet, pet: { type: SCATHA, minTier: RARE, level: 100, item: HEPHAESTUS_RELIC }, note: "Our correction, not in the guide: Hephaestus Relic adds 50% to the pet's base stats, and Scatha's 125 Mining Fortune is a base stat, so it beats Quick Claw on Scatha only (wiki; Mining Cult gear progression guide)." }
  - { id: bal, group: pet, kind: pet, priority: optional, pet: { type: BAL, minTier: LEGENDARY, level: 100 }, note: "The guide rod-swapped to it for 10% less ability cooldown; patch 0.27 (4 Aug 2026) removed that perk, and its 100 Mining Fortune is less than Scatha's 125." }
  - { id: aotv, group: tools, kind: item, item: ASPECT_OF_THE_VOID, note: With Etherwarp. A must; without it, farm or mine Gold instead. }
  - { id: sacks, group: tools, kind: manual, label: 1 Large Mining Sack and 1 to 3 Large Enchanted Mining Sacks }
  - { id: glossy-talisman, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN, note: Or the Mineral Talisman. }
  - { id: relic, group: accessories, kind: accessory, item: POWER_RELIC, modifiers: [{ kind: recomb }, { kind: note, text: Perfect gemstones }] }
  - { id: eight-ball, group: accessories, kind: accessory, item: MAGIC_8_BALL, priority: optional }
  - { id: magical-power, group: accessories, kind: manual, label: 450+ Magical Power, Sighted or Bizarre power stone, Intelligence tunings, note: "Maniac Miner: 2,000 Intelligence for its full Fortune (1,333 with Blue Cheese; 1,000 and 667 with Ultimate Wise), plus more for flux and teleports." }
  - { id: ore-oats, group: consumables, kind: consumable, item: DWARVEN_OS_ORE_OATS, count: 5 }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: truffle, group: consumables, kind: manual, label: Refined Dark Cacao Truffle }
  - { id: hotm-7, group: hotm, kind: skill, skill: HOTM, level: 7 }
---

## How to mine

Follow a Diamond route, Etherwarp between veins and use Maniac Miner whenever it is ready.

Max Mining Fortune is 1,878 (with 110 Ore Fortune, without temporary buffs), or 1,953 with a Filet O' Fortune, a
Cacao Truffle and the Magic 8 Ball.

### Recombobulate in this order

1. Drill
2. Armor of Divan piece
3. Talisman of Power
4. Mineral or Glossy Mineral armor
5. Equipment

### Mana and teleports

For steady teleports, put Ultimate Wise V on the drill, use an Overflux mid-route, or a tier 2 to 3 Blaze Flare. About
2,000 mana with a flux gives one regen tick per teleport; about 2,800 needs no flux or flare.

## Routes

The Mining Cult post lists five routes: ShatteredAlloy's 3-vein edit (3 veins, 2 teleports), ShatteredAlloy's 4-vein
route (4 teleports), iCop's route (3 veins, 2 teleports, with video), OoLucentoO's route (5 veins, 5 teleports) and a
no-Etherwarp route by Ghostz made for 4/4 refined Mineral armor.

## Updates since the guide

- Since patch 0.27 (4 Aug 2026) Bal no longer lowers pickaxe ability cooldown (its Chimney perk was removed, wiki), so
  the guide's rod-swap to Bal before the ability is left out here; Bal still gives Mining Fortune.
- Our corrections to the pets (not the author's advice): Scatha is the mining pet and Bal is optional, since Bal's
  cooldown perk is gone and its 100 base Mining Fortune is less than Scatha's 125
  ([Scatha](https://hypixelskyblock.minecraft.wiki/w/Scatha_Pet), [Bal](https://hypixelskyblock.minecraft.wiki/w/Bal_Pet)).
  The pet item path drops Minos Relic, which now boosts combat stats only
  ([Minos Relic](https://hypixelskyblock.minecraft.wiki/w/Minos_Relic), patch 0.24.1), and ends at Quick Claw, or a
  Hephaestus Relic on the max tier, which adds 50% to Scatha's base Mining Fortune and Mining Speed
  ([Quick Claw](https://hypixelskyblock.minecraft.wiki/w/Quick_Claw), [Hephaestus Relic](https://hypixelskyblock.minecraft.wiki/w/Hephaestus_Relic)).
