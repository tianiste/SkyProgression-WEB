---
title: Foraging Progression
category: foraging
summary: The upgrades from day 1 to completely maxed out, in order, from clean Fig armor to Helix gear, every attribute and a Jade Dragon.
authors:
  - { id: foraging-community, role: Guide }
contributors:
  - { id: mining-cult, role: Format of the Mining Cult progression guide }
source: { name: Foraging community Discord }
updated: 2026-11-01
where: Galatea for Fig and Mangrove, then Torrhus Canyon for Helix.
blocks:
  - "Fig early: most money on a normal profile, and the least hassle to break"
  - "Get to about 300 Sweep first, then worry about fortune"
  - "Buy a Jade Dragon as soon as you can afford it"
  - "Leveling pets ends up being most of your profit, so wisdom matters"
rates: []
ratesMeasured: Not optimized or fully cost-effective, says the guide. It may miss things or be out of order for the price.
stages:
  - id: start
    title: "The start: clean Fig armor, clean Figstone Splitter, 0 attributes"
    summary: Everything before the Jade Dragon. Break Fig early on for as much money as possible so progression is easier.
  - id: post-fig
    title: "Post Fig grind: good Fig armor, great axe, roughly 15 shards maxed"
    summary: Move on to Torrhus Canyon and start thinking about the Jade Dragon. The sooner the better, as it massively helps with progression and foraging in general.
  - id: jade
    title: Jade Dragon and the finish
    summary: Helix foraging without a Jade Dragon can be miserable, and you need it to grind Desert Whispers. Foraging Fig should pay for most of the steps above almost instantly if you have not wasted the money.
  - id: buffs
    title: Temporary buffs
    summary: Keep these active while you forage.
requirements:
  # 1. The start
  - { id: first-axe, stage: start, group: axe, kind: any_of, label: Figstone Splitter or better, options: [{ id: figstone-axe, group: axe, kind: item, item: FIGSTONE_AXE }, { id: helix-axe-owned, group: axe, kind: item, item: HELIX_CHOPPER }] }
  - { id: first-armor, stage: start, group: armor, kind: any_of, label: Fig armor or better, options: [{ id: fig-chest, group: armor, kind: item, item: FIG_CHESTPLATE }, { id: helix-chest-owned, group: armor, kind: item, item: HELIX_ARMOR_CHESTPLATE }] }
  - { id: axe-enchants, stage: start, group: axe, kind: manual, label: Efficiency V and First Impression V on your axe }
  - { id: frog, stage: start, group: pet, kind: any_of, label: Legendary Frog or better, options: [{ id: frog-pet, group: pet, kind: pet, pet: { type: FROG, minTier: LEGENDARY, level: 1 } }, { id: jade-owned, group: pet, kind: pet, pet: { type: JADE_DRAGON, minTier: LEGENDARY, level: 1 } }] }
  - { id: axe-stars, stage: start, group: axe, kind: manual, label: 5 stars on your axe }
  - { id: common-boosters, stage: start, group: armor, kind: manual, label: Common Sweep and Foraging Fortune Boosters on your armor and axe }
  - { id: moonglade-jewel, stage: start, group: axe, kind: manual, label: Moonglade Jewel on your axe }
  - { id: mangrove-gems, stage: start, group: armor, kind: manual, label: 4 Mangrove Gems on your armor }
  - { id: cloak-epic, stage: start, group: equipment, kind: item, item: DAVIDS_CLOAK, label: "David's Cloak at Epic rarity", note: Unlock enough unique shards. David tells you how many you need. Player lookup only checks that you own the cloak. }
  - { id: phanpyre, stage: start, group: attributes, kind: attribute, attribute: nocturnal_animal, label: Phanpyre shard maxed (Nocturnal Animal) }
  - { id: phanflare, stage: start, group: attributes, kind: attribute, attribute: moonglade_mastery, label: Phanflare shard maxed (Moonglade Mastery) }
  - { id: dreadwing, stage: start, group: attributes, kind: attribute, attribute: forest_essence, label: Dreadwing shard maxed (Essence of the Forest) }
  - { id: mochibear, stage: start, group: attributes, kind: attribute, attribute: strong_legs, label: Mochibear shard maxed (Strong Legs) }
  - { id: locket, stage: start, group: equipment, kind: any_of, label: Mangrove Locket or better, options: [{ id: locket-item, group: equipment, kind: item, item: MANGROVE_LOCKET }, { id: necklace-owned, group: equipment, kind: item, item: HONEYCOMB_NECKLACE }] }
  - { id: locket-boosters, stage: start, group: equipment, kind: manual, label: Common Sweep and Fortune Boosters on the locket }
  - { id: moonglade-artifact, stage: start, group: accessories, kind: accessory, item: MOONGLADE_ARTIFACT }
  - { id: forest-pledge, stage: start, group: armor, kind: manual, label: Forest Pledge V on your armor }
  - { id: bambloom, stage: start, group: attributes, kind: attribute, attribute: animal_expertise, label: Bambloom shard maxed (Animal Expertise) }
  - { id: ember, stage: start, group: attributes, kind: attribute, attribute: galatea_training, label: Ember shard maxed (Galatea Training) }
  - { id: hummingbird, stage: start, group: attributes, kind: attribute, attribute: chop, label: Hummingbird shard maxed (Chop) }
  - { id: wood-singularity, stage: start, group: axe, kind: manual, label: Wood Singularity on your axe }
  - { id: lumberjack-axed, stage: start, group: progress, kind: manual, label: Lumberjack and Axed perks maxed in the Forest Essence shop }
  - { id: flawless-citrine, stage: start, group: armor, kind: manual, label: Flawless Citrine gems in your armor and axe }
  - { id: absorb, stage: start, group: axe, kind: manual, label: Absorb on your axe, note: "Holds up to 25,000,000 logs since 1 Sep 2026, down from 50,000,000." }
  - { id: belt, stage: start, group: equipment, kind: any_of, label: Moonglade Belt or better, options: [{ id: belt-item, group: equipment, kind: item, item: MANGROVE_VINE }, { id: safari-owned, group: equipment, kind: item, item: SAFARI_BELT }] }
  - { id: belt-boosters, stage: start, group: equipment, kind: manual, label: Common Sweep and Foraging Fortune Boosters on the belt }
  - { id: grippers, stage: start, group: equipment, kind: any_of, label: Mangrove Grippers or better, options: [{ id: grippers-item, group: equipment, kind: item, item: MANGROVE_GRIPPERS }, { id: bracelet-owned, group: equipment, kind: item, item: VEILSHROOM_BRACELET }] }
  - { id: grippers-boosters, stage: start, group: equipment, kind: manual, label: Common Sweep and Foraging Fortune Boosters on the grippers }
  - { id: fig-fortune-perk, stage: start, group: progress, kind: manual, label: First 20 levels of the Fig Fortune perk in Agatha's shop }
  - { id: cloak-mythic, stage: start, group: equipment, kind: manual, label: "David's Cloak at Mythic rarity", note: Syphon enough unique shards. }
  - { id: recomb, stage: start, group: armor, kind: manual, label: Recombobulate your axe and armor }
  - { id: crow, stage: start, group: attributes, kind: attribute, attribute: fig_sharpening, label: Crow shard maxed (Fig Sharpening) }
  - { id: pangolin, stage: start, group: attributes, kind: attribute, attribute: atomized_whispers, label: Pangolin shard maxed (Atomized Whispers) }
  - { id: bambuleaf, stage: start, group: attributes, kind: attribute, attribute: strong_arms, label: Bambuleaf shard maxed (Strong Arms) }
  - { id: sparrow, stage: start, group: attributes, kind: attribute, attribute: fig_collector, label: Sparrow shard maxed (Fig Collector) }
  - { id: piranha, stage: start, group: attributes, kind: attribute, attribute: moonglade_serendipity, label: Piranha shard maxed (Moonglade Serendipity) }
  - { id: beaconmite, stage: start, group: attributes, kind: attribute, attribute: beacon_zealot, label: Beaconmite shard maxed (Beacon Zealot) }
  - { id: wisdom-boosters, stage: start, group: armor, kind: manual, label: "Wisdom Boosters on your armor, axe and equipment" }
  - { id: forest-training, stage: start, group: progress, kind: manual, label: Forest Training perk maxed in the Forest Essence shop }
  # 2. Post Fig grind
  - { id: safari-hunts, stage: post-fig, group: equipment, kind: item, item: SAFARI_BELT, note: "Do your Cavern and Forest hunts in the Safari while you forage to upgrade its fortune and rarity. There is no harm in it, as the Safari Belt is best in slot." }
  - { id: tadgang, stage: post-fig, group: attributes, kind: attribute, attribute: unity_is_strength, label: Tadgang shard maxed (Unity is Strength) }
  - { id: cheapest-50, stage: post-fig, group: attributes, kind: manual, label: The cheapest 50 shards maxed, note: "Use SkyHanni's attribute overlay in the Attribute Menu to find them and SkyShards (skyshards.com) for the cheapest fusions." }
  - { id: helix-chopper, stage: post-fig, group: axe, kind: item, item: HELIX_CHOPPER, note: Upgraded from your Figstone Splitter. }
  - { id: helix-boots, stage: post-fig, group: armor, kind: item, item: HELIX_ARMOR_BOOTS, note: Upgraded from your Fig Striders. }
  - { id: helix-helmet, stage: post-fig, group: armor, kind: item, item: HELIX_ARMOR_HELMET, note: Upgraded from your Fig Cap. }
  - { id: helix-leggings, stage: post-fig, group: armor, kind: item, item: HELIX_ARMOR_LEGGINGS, note: Upgraded from your Fig Trousers. }
  - { id: helix-chestplate, stage: post-fig, group: armor, kind: item, item: HELIX_ARMOR_CHESTPLATE, note: Upgraded from your Figmail. }
  - { id: firefox, stage: post-fig, group: attributes, kind: attribute, attribute: torrhus_mastery, label: Firefox shard maxed (Torrhus Mastery) }
  - { id: groundhog, stage: post-fig, group: attributes, kind: attribute, attribute: diurnal_animal, label: Groundhog shard maxed (Diurnal Animal) }
  - { id: puck, stage: post-fig, group: attributes, kind: attribute, attribute: forest_serendipity, label: Puck shard maxed (Forest Serendipity) }
  - { id: vulture, stage: post-fig, group: attributes, kind: attribute, attribute: helix_sharpening, label: Vulture shard maxed (Helix Sharpening), note: Very important. }
  - { id: petalfall, stage: post-fig, group: axe, kind: manual, label: Petalfall V on your axe }
  - { id: uncommon-boosters, stage: post-fig, group: armor, kind: manual, label: "Uncommon Boosters on your axe, armor and equipment" }
  - { id: woodpecker, stage: post-fig, group: attributes, kind: attribute, attribute: forest_felling, label: Woodpecker shard maxed (Helix Timber) }
  - { id: torrid, stage: post-fig, group: attributes, kind: attribute, attribute: first_sweep, label: Torrid shard maxed (First Sweep) }
  - { id: perfect-citrine, stage: post-fig, group: armor, kind: manual, label: Perfect Citrine gems in your armor and axe }
  - { id: grizzly, stage: post-fig, group: attributes, kind: attribute, attribute: tough_claws, label: Grizzly Bear shard maxed (Tough Claws) }
  - { id: solar, stage: post-fig, group: attributes, kind: attribute, attribute: starlyn_training, label: Solar shard maxed (Starlyn Training) }
  - { id: honeycomb-necklace, stage: post-fig, group: equipment, kind: item, item: HONEYCOMB_NECKLACE, note: Crafted from your Mangrove Locket. }
  - { id: veilshroom-bracelet, stage: post-fig, group: equipment, kind: item, item: VEILSHROOM_BRACELET, note: Crafted from your Grippers. }
  - { id: majestic, stage: post-fig, group: equipment, kind: manual, label: Majestic reforge on your Safari Belt }
  - { id: karma, stage: post-fig, group: axe, kind: manual, label: Karma V on your Helix Chopper }
  - { id: karma-6, stage: post-fig, group: axe, kind: manual, label: Distant Echo on your Helix Chopper for Karma VI }
  - { id: cheapest-100, stage: post-fig, group: attributes, kind: manual, label: Another 100 of the cheapest attributes maxed, note: For the Apex Predator perk on the Jade Dragon. }
  # 3. Jade Dragon and the finish
  - { id: jade-dragon, stage: jade, group: pet, kind: pet, pet: { type: JADE_DRAGON, minTier: LEGENDARY, level: 1 }, label: Jade Dragon, note: Buy it as soon as you can afford it. }
  - { id: relic, stage: jade, group: accessories, kind: accessory, item: POWER_RELIC, priority: optional, note: Forge a Relic of Power and put a Perfect Citrine in it. 8 Fortune for tens of millions isn't game-changing. }
  - { id: every-attribute, stage: jade, group: attributes, kind: manual, label: Every single attribute maxed }
  # 4. Temporary buffs
  - { id: god-potion, stage: buffs, group: consumables, kind: manual, label: God Potion, note: Necessary. The 20 wisdom and the speed and strength buffs are so important. }
  - { id: cookie, stage: buffs, group: consumables, kind: manual, label: Booster Cookie, note: "Optional if you don't have a Jade Dragon, necessary if you have Jared for the 25 wisdom." }
  - { id: mason-jar, stage: buffs, group: consumables, kind: manual, label: Celestial Mason Jar, note: "Needed for the wisdom and fortune. Quite cheap, don't miss out." }
---

## Is this optimized?

Absolutely not. It is probably missing things or out of order for the price. A fully optimized list is very hard to
make, so until someone builds one for foraging, this is as good as it gets. [foragingstats.com](https://foragingstats.com)
finds upgrades you missed.

## Fig, Mangrove or Helix

On a normal profile Fig makes you the most money early on, though Mangrove also makes good money if you like it. You
want as much Sweep as possible before Helix, so you need your Forest Whispers.

Fig sells for much more than its NPC value, so get to roughly 300 Sweep as soon as you can and worry about fortune
later; that makes breaking Fig less of a hassle. If HotF is the issue, maxing your David's Cloak earlier is a priority
for its Sweep bonuses. Fortune is useful later to get the most profit for later upgrades.

## Why wisdom matters

Leveling up pets ends up being most of your profit. Check which pets are good to level at the moment; dragons are
usually a safe bet, the Jade Dragon especially. More wisdom means more pet XP, which means more money.
