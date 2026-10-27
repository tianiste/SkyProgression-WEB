---
title: Mineshaft Gemstones
method: [SHAFTING]
category: gemstones
summary: Spawning Glacite Mineshafts by mining Tungsten or Mithril, then mining the gemstones inside them with a Glacite Golem for extra Pristine per looted corpse.
authors:
  - { id: livet, role: Guide }
contributors:
  - { id: yadi, role: Video guide }
  - { id: woqh, role: Mithril spawning route }
  - { id: sleepinginseattle, role: Tungsten spawning route }
source: { name: Mining Cult Discord, posted: 2025-03-04 }
updated: 2026-10-27
where: The Glacite Tunnels to spawn shafts (Tungsten or Mithril routes, Pickobulus on Glacite clusters), then the Glacite Mineshafts themselves.
blocks:
  - "Jasper shafts: always mine them, even with poor buffs"
  - "Opal (2+ Lapis corpses), Jade, Amber, Peridot and Sapphire (3+), Amethyst (2+), Topaz and Ruby (4)"
  - "Skip Onyx, Citrine and Aquamarine shafts: slow to break and cheap. Loot the corpses and leave"
  - "Tungsten shafts: mine them until you have 5 Suspicious Scrap"
rates:
  - { label: Maxed setup, value: about 50M to 80M coins per hour }
ratesMeasured: The author's own experience. The method depends a lot on luck and powder, so rates vary from hour to hour.
hotm:
  - label: Tungsten spawning tree
    hotm: 10
    cotm: 10
    powder: { mithril: 8611585, gemstone: 13476732, glacite: 13460756 }
    note: Minimum to start, including Peak of the Mountain. 26.3m Glacite maxes every perk; 14.7m Gemstone adds Seasoned Mineman and 18.4m also Powder Buff.
  - label: Mithril spawning tree
    hotm: 10
    cotm: 10
    powder: { mithril: 11211843, gemstone: 13476732, glacite: 11649848 }
    note: Minimum to start, including Peak of the Mountain. 27.2m Glacite maxes every perk. Gemstone powder as for the Tungsten tree.
videos:
  - { title: Mineshaft gemstone mining guide, url: "https://www.youtube.com/watch?v=gAH3ejdb8rY", by: Yadi }
requirements:
  - id: armor
    group: armor
    kind: item
    item: DIVAN_CHESTPLATE
    label: 4/4 Armor of Divan
    note: Every gemstone slot unlocked. Add Wisdom V, then Ice Cold V, then 4 Divan's Powder Coatings as you upgrade.
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: jaded }
      - { kind: note, text: Perfect gemstones in every slot }
  - id: drill-start
    tier: budget
    group: drill
    kind: item
    item: TITANIUM_DRILL_4
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: glacial }
      - { kind: gem, gem: AMBER, quality: PERFECT }
      - { kind: gem, gem: JADE, quality: PERFECT }
      - { kind: gem, gem: TOPAZ, quality: PERFECT }
      - { kind: applied, item: POLARVOID_BOOK, count: 5 }
      - { kind: drill_part, slot: tank, item: PERFECTLY_CUT_FUEL_TANK }
      - { kind: drill_part, slot: engine, item: AMBER_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_BLUE_CHEESE }
      - { kind: enchant, id: flowstate, level: 3 }
      - { kind: enchant, id: compact, level: 1 }
      - { kind: enchant, id: efficiency, level: 10 }
      - { kind: enchant, id: experience, level: 3 }
      - { kind: enchant, id: fortune, level: 4 }
      - { kind: enchant, id: lapidary, level: 5 }
      - { kind: enchant, id: prismatic, level: 5 }
      - { kind: enchant, id: smelting_touch, level: 1 }
  - id: drill-divan
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    note: Same upgrades as the Titanium drill, with Perfect Jade and Amber. Lustrous instead of Glacial lets you 13-tick Jasper but earns less on other gemstones.
    modifiers:
      - { kind: recomb }
      - { kind: reforge, id: glacial }
      - { kind: gem, gem: JADE, quality: PERFECT }
      - { kind: gem, gem: AMBER, quality: PERFECT }
      - { kind: applied, item: DIVAN_POWDER_COATING }
      - { kind: enchant, id: paleontologist, level: 5 }
  - id: drill-spawning
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    label: Second Divan's Drill for spawning shafts
    priority: optional
    note: Same as the first, but Sunny Side instead of Blue Cheese, Jade instead of Topaz and Lustrous instead of Glacial. Use it only outside shafts.
    modifiers:
      - { kind: reforge, id: lustrous }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_SUNNY_SIDE }
  - { id: titanium-equipment, tier: budget, group: equipment, kind: manual, label: Titanium Necklace, Cloak and Belt with Dwarven Handwarmers, note: All Blazing; the Handwarmers recombobulated. }
  - { id: pendant, tier: max, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: gem, gem: JADE, quality: PERFECT }, { kind: gem, gem: AMBER, quality: PERFECT }, { kind: applied, item: DIVAN_POWDER_COATING }] }
  - { id: gemstone-equipment, tier: max, group: equipment, kind: manual, label: Gemstone equipment in place of Titanium, note: Recombobulated. }
  - { id: golem, group: pet, kind: pet, pet: { type: GLACITE_GOLEM, minTier: LEGENDARY, level: 100, item: PET_ITEM_QUICK_CLAW }, note: +1 Pristine per looted corpse in a shaft. Start with a Bejeweled Collar. }
  - { id: scatha, group: pet, kind: pet, pet: { type: SCATHA, minTier: EPIC, level: 100, item: PET_ITEM_QUICK_CLAW }, note: For shafts with no Lapis corpses. Legendary is better. Start with a Bejeweled Collar. }
  - { id: bal, group: pet, kind: pet, pet: { type: BAL, minTier: LEGENDARY, level: 100 }, note: Swap to it before every ability for 10% less cooldown. }
  - { id: mammoth, group: pet, kind: pet, priority: optional, pet: { type: MAMMOTH, minTier: LEGENDARY, level: 100, item: DWARF_TURTLE_SHELMET }, note: Clears mobs without gaining Cold. }
  - { id: leveling-pet, group: pet, kind: manual, label: A pet you level for profit, note: Level it while spawning shafts. }
  - { id: gauntlet, group: tools, kind: item, item: GEMSTONE_GAUNTLET, note: Fully enchanted with Fine gemstones. }
  - { id: aotv, group: tools, kind: item, item: ASPECT_OF_THE_VOID, note: With Etherwarp. }
  - { id: leaping-sword, group: tools, kind: manual, label: Leaping Sword or Silk-Edge Sword }
  - { id: rod, group: tools, kind: manual, label: Any fishing rod, note: For autopet rules. }
  - { id: relic, tier: max, group: accessories, kind: accessory, item: POWER_RELIC, modifiers: [{ kind: recomb }, { kind: note, text: Full Perfect gemstones }] }
  - { id: chicken, group: accessories, kind: accessory, item: FRIED_FROZEN_CHICKEN }
  - { id: metal-talisman, group: accessories, kind: accessory, item: DWARVEN_METAL }
  - { id: glossy-talisman, tier: max, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN }
  - { id: reaper-peppers, group: consumables, kind: consumable, item: REAPER_PEPPER, count: 5 }
  - { id: campfires, group: consumables, kind: manual, label: Portable Campfires, priority: optional, note: Lower your Cold. Only worth it in Jasper shafts with 2 to 4 Lapis corpses. }
  - { id: frozen-skin, group: progress, kind: essence, essence: ICE, perk: frozen_skin, level: 5 }
  - { id: cotm, group: hotm, kind: hotm, perk: core_of_the_mountain, level: 10, note: Max it before you start; you need its Mineshaft chance and the 2 extra tokens. }
  - { id: surveyor, group: hotm, kind: hotm, perk: surveyor, level: max }
  - { id: steady-hand, group: hotm, kind: hotm, perk: steady_hand, level: max }
  - { id: warm-heart, group: hotm, kind: hotm, perk: warm_heart, level: max }
  - { id: rags-to-riches, group: hotm, kind: hotm, perk: rags_to_riches, level: max }
  - { id: eager-adventurer-perk, group: hotm, kind: hotm, perk: eager_adventurer, level: max }
  - { id: mining-master, group: hotm, kind: hotm, perk: mining_master, level: max }
---

## How to mine

Spawn a Glacite Mineshaft, then decide whether it is worth mining. Your rates depend on the Mineshaft Mayhem roll
(ideally ability cooldown), how fast shafts spawn, the shaft type, whether the Fortunate Freezing event is on, and how
many Lapis corpses the shaft has. This guide ignores Umber and Tungsten corpses: opening them with keys is possible but
not worth it for profit.

The method needs a strong setup and a lot of powder, and it depends a fair amount on luck.

### Spawning shafts

- **Tungsten.** Mine a Tungsten route and use Pickobulus on large Glacite clusters. Spawns shafts at a decent pace, earns
  well from the Tungsten itself, and gives you Tungsten shafts to mine. Best for steady profit.
- **Mithril.** Mine a Mithril route, take any Titanium that spawns, and use Pickobulus on Glacite clusters. Spawns shafts
  as fast as possible, so you see more Jasper and high-corpse shafts. Riskier, but can pay more.

Entering a Mineshaft resets your pickaxe ability cooldown. Spawn the shaft with Pickobulus, switch your ability to Mining
Speed Boost, then enter: the ability is ready at once.

### Corpses and pets

At level 100 a Legendary Glacite Golem gives 1 extra Pristine for each corpse you loot in a shaft, so it beats Scatha as
soon as you have looted one. Use Scatha only in shafts with no Lapis corpses (a Jasper shaft, for example). In Tungsten
shafts, mine with the pet you are levelling.

### Pet rules

1. On fishing hook throw, equip your levelling pet unless it is equipped. Use it to claim commissions.
2. On fishing hook throw, equip a level 100 Bal unless a Bal is equipped. Swap before every ability for 10% less cooldown.
3. On Combat XP gain, equip a level 100 Mammoth, except outside a Mineshaft. Stops you gaining Cold from mob damage.
4. On Gemstone collection gain, equip a level 100 Glacite Golem, except outside a Mineshaft. Swap the Golem for Scatha
   here when a shaft has no corpses.
5. On Mining XP gain, equip the pet you are levelling, except outside the Dwarven Mines. Levelling a pet while spawning
   earns more than a fortune pet.

### Which pet to level

Pick the pet with the most coins per pet XP: (lowest level 100 price − lowest level 1 price) ÷ XP from level 1 to
100. Most Legendary pets need 25,353,230 XP. For example, a Jerry bought at 2m and sold at 20m earns about 0.71 coins
per XP.

### Being picky

Which shafts you mine and which you skip decides your profit. Gemstone prices change, so a shaft that was worth it last
week may not be today. Skip what you think is not worth it, and stay in a "worse" shaft when the numbers say so.

## Upgrade order

1. Max Frozen Skin in the Ice Essence shop.
2. Wisdom V on the Armor of Divan.
3. Ice Cold V on the Armor of Divan.
4. Craft a Fried Frozen Chicken.
5. Buy a Dwarven Metal Talisman.
6. Paleontologist V on the Titanium drill.
7. Divan's Powder Coating on the Titanium drill.
8. Quick Claw on the Glacite Golem.
9. Quick Claw on the Scatha.
10. Save for a Divan's Alloy and forge a Divan's Drill.
11. Perfect Jade and Amber for the Divan's Drill.
12. Craft a Relic of Power, recombobulate it and add full Perfect gemstones.
13. Buy a Pendant of Divan.
14. Recombobulate the Pendant.
15. Reforge the Pendant to Blazing.
16. Perfect Jade and Amber for the Pendant.
17. Eat 5 Reaper Peppers.
18. Divan's Powder Coating on all four armor pieces.
19. Divan's Powder Coating on the Pendant.
20. Buy or craft a Glossy Mineral Talisman.
21. Replace the Titanium equipment with gemstone equipment.
22. Recombobulate the equipment.
23. Optional: Lustrous on the Divan's Drill.
24. Optional: a second Divan's Drill for spawning shafts.

## Routes

The Mining Cult post has waypoint routes for Amber, Opal, Peridot, Sapphire, Amethyst, Jasper and all crystal-layout
shafts, plus spawning routes for Mithril (by woqh) and Tungsten (by sleepinginseattle.), with where to use Pickobulus on
each Glacite cluster.
