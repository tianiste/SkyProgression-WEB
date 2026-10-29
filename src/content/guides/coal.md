---
title: Coal
method: [COAL]
category: ores
summary: Coal and Hard Stone on routes in the Crystal Hollows, instamining with high Mining Speed and swapping to a Blue Cheese drill for the ability.
authors:
  - { id: the-ultimate-non, role: Guide }
contributors:
  - { id: the-ultimate-non, role: HOTM tree picture }
  - { id: koenigboohoo, role: HOTM tree guide }
source: { name: Mining Cult Discord, posted: 2026-10-13 }
updated: 2026-10-27
where: Crystal Hollows, on routes from the route-sharing channel or your own. During progression, The Jungle while Sludge Mining or grinding powder.
blocks:
  - "Coal Ore: instamine at 9,001 Mining Speed in mid-air"
  - "Hard Stone: instamine at 7,501 Mining Speed in mid-air"
  - "On the ground you need five times less Mining Speed for the same speed"
rates:
  - { label: Coal collection, value: 4.0M to 9.0M per hour }
  - { label: Hard Stone collection, value: 3.0M to 6.0M per hour }
ratesMeasured: Rough estimates from the author; most players land in between or below.
hotm:
  - label: Recommended
    hotm: 7
    tree: coal
    powder: { mithril: 8517747, gemstone: 19392014, glacite: 1267045 }
requirements:
  - id: drill-progression
    tier: budget
    group: drill
    kind: any_of
    label: Progression drill (Ironman)
    note: Upgrade in this order while you progress.
    options:
      - { id: jungle-pickaxe, group: drill, kind: item, item: JUNGLE_PICKAXE }
      - { id: sx-r226, group: drill, kind: item, item: MITHRIL_DRILL_1 }
      - { id: sx-r326, group: drill, kind: item, item: MITHRIL_DRILL_2 }
      - { id: dr-x355, group: drill, kind: item, item: TITANIUM_DRILL_1 }
      - { id: dr-x455, group: drill, kind: item, item: TITANIUM_DRILL_2 }
      - { id: dr-x555, group: drill, kind: item, item: TITANIUM_DRILL_3 }
  - id: drill-main
    tier: max
    group: drill
    kind: any_of
    label: Titanium Drill DR-X655 or Divan's Drill
    options:
      - { id: dr-x655, group: drill, kind: item, item: TITANIUM_DRILL_4 }
      - { id: divan-drill, group: drill, kind: item, item: DIVAN_DRILL }
  - id: drill-upgrades
    tier: max
    group: drill
    kind: item
    item: DIVAN_DRILL
    label: Drill upgrades
    note: Reforge to Stellar (Petrified Starfall), Auspicious (Dwarven Geode) or Lustrous (Gleaming Crystal). Put the Sunny Side omelette on the main drill and keep a second drill with Blue Cheese for the ability.
    modifiers:
      - { kind: recomb }
      - { kind: gem, gem: JADE, quality: PERFECT, count: 3 }
      - { kind: gem, gem: AMBER, quality: PERFECT, count: 2 }
      - { kind: applied, item: AMBER_POWER_SCROLL }
      - { kind: applied, item: DIVAN_POWDER_COATING }
      - { kind: applied, item: POLARVOID_BOOK, count: 5 }
      - { kind: drill_part, slot: tank, item: PERFECTLY_CUT_FUEL_TANK }
      - { kind: drill_part, slot: engine, item: AMBER_POLISHED_DRILL_ENGINE }
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_SUNNY_SIDE }
      - { kind: enchant, id: efficiency, level: 10 }
      - { kind: enchant, id: fortune, level: 4 }
      - { kind: enchant, id: compact, level: 10 }
      - { kind: enchant, id: ultimate_flowstate, level: 3 }
  - id: swap-drill
    tier: max
    group: drill
    kind: item
    item: TITANIUM_DRILL_4
    label: Swap drill with a Blue Cheese Goblin Omelette
    note: Hold it when you use your pickaxe ability.
    modifiers:
      - { kind: drill_part, slot: module, item: GOBLIN_OMELETTE_BLUE_CHEESE }
  - id: armor-progression
    tier: budget
    group: armor
    kind: manual
    label: 4/4 Mineral, then 4/4 Glossy Mineral, then 1/4 Mineral with 3/4 Armor of Divan
  - id: armor-max
    tier: max
    group: armor
    kind: manual
    label: 1/4 Glossy Mineral and 3/4 Armor of Divan
    note: Jaded reforge (Jaderald), Recombobulator, Perfect gemstones, Wisdom V, Divan's Powder Coating.
  - id: equipment-budget
    tier: budget
    group: equipment
    kind: manual
    label: Titanium Gauntlet, Belt, Cloak and Necklace
  - { id: gloves, tier: max, group: equipment, kind: item, item: DWARVEN_HANDWARMERS, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - { id: belt, tier: max, group: equipment, kind: item, item: JADE_BELT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: enchant, id: quantum, level: 5 }] }
  - id: cloak
    tier: max
    group: equipment
    kind: any_of
    label: Ancient Cloak or Sapphire Cloak
    options:
      - { id: ancient-cloak, group: equipment, kind: item, item: ANCIENT_CLOAK }
      - { id: sapphire-cloak, group: equipment, kind: item, item: SAPPHIRE_CLOAK }
  - { id: pendant, tier: max, group: equipment, kind: item, item: DIVAN_PENDANT, modifiers: [{ kind: recomb }, { kind: reforge, id: blazing }, { kind: applied, item: DIVAN_POWDER_COATING }, { kind: enchant, id: quantum, level: 5 }] }
  - id: pet-goblin
    group: pet
    kind: pet
    pet: { type: GOBLIN, minTier: LEGENDARY, level: 100 }
    note: Goblin gives 12.5 Mining Speed per level instead of 2.5, 1,250 at level 100. Use it if you are short of Mining Speed.
  - id: pet-scatha
    tier: budget
    group: pet
    kind: pet
    pet: { type: SCATHA, minTier: RARE, level: 100, item: PET_ITEM_QUICK_CLAW }
    note: "Pet items in order: Bejeweled Collar, Quick Claw, Hephaestus Relic."
  - id: pet-scatha-max
    tier: max
    group: pet
    kind: pet
    pet: { type: SCATHA, minTier: RARE, level: 100, item: HEPHAESTUS_RELIC }
    note: The last pet item in the guide's order.
  - { id: compactor, group: accessories, kind: accessory, item: PERSONAL_COMPACTOR_7000 }
  - { id: speed-relic, group: accessories, kind: accessory, item: SPEED_RELIC }
  - { id: titanium-relic, group: accessories, kind: accessory, item: TITANIUM_RELIC }
  - { id: haste-artifact, group: accessories, kind: accessory, item: HASTE_ARTIFACT }
  - { id: relic, group: accessories, kind: accessory, item: POWER_RELIC, modifiers: [{ kind: recomb }, { kind: note, text: Perfect gemstones }] }
  - { id: glossy-talisman, group: accessories, kind: accessory, item: GLOSSY_MINERAL_TALISMAN }
  - { id: eight-ball, group: accessories, kind: accessory, item: MAGIC_8_BALL, priority: optional }
  - { id: magical-power, group: accessories, kind: manual, label: 450+ Magical Power with a Sighted or Bizarre power stone }
  - { id: aotv, group: tools, kind: item, item: ASPECT_OF_THE_VOID, note: With Etherwarp. An Aspect of the End works too. }
  - { id: sacks, group: tools, kind: manual, label: Large Mining Sack and Large Enchanted Mining Sack }
  - { id: abiphone, group: tools, kind: manual, label: Any Abiphone, note: Refuel your drill. }
  - { id: filet, group: consumables, kind: consumable, item: FILET_O_FORTUNE }
  - { id: ore-oats, group: consumables, kind: consumable, item: DWARVEN_OS_ORE_OATS, count: 5 }
  - { id: block-bran, group: consumables, kind: consumable, item: DWARVEN_OS_BLOCK_BRAN, count: 5 }
  - { id: glacite-collection, group: progress, kind: collection, collection: GLACITE, level: 8 }
  - { id: umber-collection, group: progress, kind: collection, collection: UMBER, level: 8 }
  - { id: tungsten-collection, group: progress, kind: collection, collection: TUNGSTEN, level: 9 }
  - { id: obsidian-collection, group: progress, kind: collection, collection: OBSIDIAN, level: 8 }
  - { id: rotten-pickaxe, group: attributes, kind: attribute, attribute: rotten_pickaxe, priority: required }
  - { id: fortunate-miner, group: attributes, kind: attribute, attribute: fortunate_miner, priority: required }
  - { id: mossy-box, group: attributes, kind: attribute, attribute: mossy_box, priority: required }
  - { id: gold-box, group: attributes, kind: attribute, attribute: gold_box, priority: required }
  - { id: echo-of-boxes, group: attributes, kind: attribute, attribute: echo_of_boxes, priority: required }
  - { id: greedy-goblin, group: attributes, kind: attribute, attribute: greedy_goblin, priority: required }
  - { id: sleepy-spread, group: attributes, kind: attribute, attribute: sleepy_spread, priority: required }
  - { id: pickaxe-cooldown, group: attributes, kind: attribute, attribute: pickaxe_cooldown, priority: required }
  - { id: echo-of-echoes, group: attributes, kind: attribute, attribute: echo_of_echoes, priority: required }
  - { id: yog-membrane, group: attributes, kind: attribute, attribute: yog_membrane, priority: optional }
  - { id: breeze, group: attributes, kind: attribute, attribute: breeze, priority: optional }
  - { id: mana-regeneration, group: attributes, kind: attribute, attribute: mana_regeneration, priority: optional }
  - { id: ultimate-dna, group: attributes, kind: attribute, attribute: ultimate_dna, priority: optional }
  - { id: hotm-7, group: hotm, kind: skill, skill: HOTM, level: 7 }
---

## How to mine

Coal mining depends heavily on ping; try to stay under 120 ms. Routes send you up and down a lot, so you are often in
mid-air, where blocks take five times more Mining Speed to break than on the ground.

Go to the start of the route and mine. When your pickaxe ability is ready, switch to the drill with the Blue Cheese
Goblin Omelette, use the ability and keep mining. When the route is done, change lobby.

Craft the Coal and Hard Stone from your sessions into enchanted items to earn more, but never craft Enchanted Coal
Blocks.

### Mining Speed tips

- Strong Arm currently gives 25 Mining Speed per level on Hard Stone by mistake, 2,500 at max level. Take it if you
  struggle to reach the instamine thresholds.
- A level 100 Goblin pet gives 1,250 Mining Speed for the same reason.

### Ironman

The guide works for Ironman and Classic profiles. If you are past progression and mine for money, focus on the max
column.
