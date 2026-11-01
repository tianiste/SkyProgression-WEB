---
title: Fishing Progression
category: fishing-basics
summary: The upgrades from your first rod to Magma Lord in order, and the best way to level at each stage.
authors:
  - { id: the-ultimate-non, role: Full Fishing Guide }
contributors:
  - { id: jessbre, role: Water and lava Sea Creature fishing notes }
  - { id: minerle, role: Calculations }
  - { id: lemoneater, role: Calculations }
source: { name: "Casters Fishing Community, last edited November 2025" }
updated: 2026-11-01
notices:
  - status: stale
    date: 2026-10-29
    text: "On the Alpha Network, not live yet: the Accessory Bag Revamp removes the Sea Creature Chance Enrichment and raises the Sea Creature Chance on rods to make up for it, and the Magic Find rework changes God Potions. The steps below match the live game."
    source: { label: Changelog, url: "https://hypixelskyblock.minecraft.wiki/w/Changelog/2026/October_29" }
where: Water at the Backwater Bayou and The Park, then lava in Galatea, the Crystal Hollows and the Crimson Isle.
blocks:
  - "Aim for 100% Sea Creature Chance and the Fishing Speed cap, then Double Hook Chance"
  - "Fishing Speed caps: 300 in most places, 350 on the Crimson Isle, 250 at Lotus Atoll, 200 in the Backwater Bayou"
  - "Bronze Trophy Hunter unlocks Thunder and Silver unlocks Lord Jawbus, so Trophy Fish come before the end game"
  - "You can have 10 Sea Creatures out at once on every island, and 60 per server"
rates: []
ratesMeasured: The guide gives no rates. XP depends on your setup, kill speed and party.
stages:
  - id: water
    title: "Fishing 0 to 19: water rods and Backwater gear"
    summary: Fishing XP comes from killing Sea Creatures, so a cheap setup that catches and kills them is all you need. See how to level below.
  - id: first-lava
    title: "Fishing 19 to 28: your first lava rod"
    summary: Lava fishing opens up here. Lower tier lava rods give fewer stats than a maxed water rod, so expect to need more from your armor and equipment.
  - id: crimson
    title: "Fishing 28 to 45: Crimson Isle and Thunder"
    summary: The Crimson Isle needs high damage gear. Get Bronze and Silver Trophy Hunter on the way, as Thunder and Lord Jawbus speed up your XP a lot.
  - id: end
    title: "Fishing 45: Magma Lord"
    summary: The best fishing armor and necklace.
  - id: buffs
    title: Temporary buffs
    summary: Keep these active while you fish.
requirements:
  # Fishing 0 to 19
  - { id: challenging-rod, stage: water, group: rod, kind: any_of, label: Challenging Rod or better (Fishing 5), options: [{ id: challenge, group: rod, kind: item, item: CHALLENGE_ROD }, { id: champ-a, group: rod, kind: item, item: CHAMP_ROD }, { id: legend-a, group: rod, kind: item, item: LEGEND_ROD }, { id: sea-a, group: rod, kind: item, item: ROD_OF_THE_SEA }, { id: giant-a, group: rod, kind: item, item: GIANT_FISHING_ROD }] }
  - { id: rod-parts-early, stage: water, group: rod, kind: manual, label: Speedy Line and Junk Sinker on your rod (Fishing 5) }
  - { id: rod-enchants, stage: water, group: rod, kind: manual, label: "Expertise, Angler, Lure, Piscary, Flash and Quick Bite on your rod", note: The most important rod enchants. Apply five Wet Books too. }
  - { id: angler-armor, stage: water, group: armor, kind: any_of, label: Full Angler Armor or better, options: [{ id: angler-chest, group: armor, kind: item, item: ANGLER_CHESTPLATE }, { id: backwater-a, group: armor, kind: item, item: BACKWATER_CHESTPLATE }, { id: salmon-a, group: armor, kind: item, item: SALMON_CHESTPLATE_NEW }, { id: sponge-a, group: armor, kind: item, item: SPONGE_CHESTPLATE }, { id: shark-a, group: armor, kind: item, item: SHARK_SCALE_CHESTPLATE }, { id: thunder-a, group: armor, kind: item, item: THUNDER_CHESTPLATE }, { id: magma-a, group: armor, kind: item, item: MAGMA_LORD_CHESTPLATE }] }
  - { id: squid-boots, stage: water, group: armor, kind: item, item: SQUID_BOOTS, priority: optional, note: Replaced by Salmon Boots. }
  - { id: hydra-helmet, stage: water, group: armor, kind: item, item: WATER_HYDRA_HEAD, priority: optional, note: Replaced by the Sponge Helmet. }
  - { id: backwater-equipment, stage: water, group: equipment, kind: any_of, label: Backwater Equipment or better (Fishing 5), options: [{ id: backwater-belt, group: equipment, kind: item, item: BACKWATER_BELT }, { id: ichthyic-a, group: equipment, kind: item, item: ICHTHYIC_BELT }, { id: finwave-a, group: equipment, kind: item, item: FINWAVE_BELT }, { id: gillsplash-a, group: equipment, kind: item, item: GILLSPLASH_BELT }] }
  - { id: salmon-armor, stage: water, group: armor, kind: any_of, label: "Salmon Boots, Leggings and Chestplate or better (Fishing 13)", options: [{ id: salmon-new, group: armor, kind: item, item: SALMON_CHESTPLATE_NEW }, { id: salmon-old, group: armor, kind: item, item: SALMON_CHESTPLATE }, { id: sponge-b, group: armor, kind: item, item: SPONGE_CHESTPLATE }, { id: shark-b, group: armor, kind: item, item: SHARK_SCALE_CHESTPLATE }, { id: thunder-b, group: armor, kind: item, item: THUNDER_CHESTPLATE }, { id: magma-b, group: armor, kind: item, item: MAGMA_LORD_CHESTPLATE }] }
  - { id: champ-rod, stage: water, group: rod, kind: any_of, label: Rod of Champions or better (Fishing 15), options: [{ id: champ, group: rod, kind: item, item: CHAMP_ROD }, { id: legend-b, group: rod, kind: item, item: LEGEND_ROD }, { id: sea-b, group: rod, kind: item, item: ROD_OF_THE_SEA }, { id: giant-b, group: rod, kind: item, item: GIANT_FISHING_ROD }] }
  - { id: starter-lava, stage: water, group: rod, kind: item, item: STARTER_LAVA_ROD, note: "Fishing 10. Keep a clean one: Vanille needs it for Trophy Fishing." }
  - { id: sponge-armor, stage: water, group: armor, kind: any_of, label: Full Sponge Armor or better (Fishing 17), options: [{ id: sponge-c, group: armor, kind: item, item: SPONGE_CHESTPLATE }, { id: shark-c, group: armor, kind: item, item: SHARK_SCALE_CHESTPLATE }, { id: thunder-c, group: armor, kind: item, item: THUNDER_CHESTPLATE }, { id: magma-c, group: armor, kind: item, item: MAGMA_LORD_CHESTPLATE }] }
  - { id: dolphin, stage: water, group: pet, kind: any_of, label: Epic Dolphin or better, options: [{ id: dolphin-pet, group: pet, kind: pet, pet: { type: DOLPHIN, minTier: EPIC, level: 1 } }, { id: ammonite-a, group: pet, kind: pet, pet: { type: AMMONITE, minTier: LEGENDARY, level: 1 } }], note: With a Washed-up Souvenir. }
  # Fishing 19 to 28
  - { id: topaz-rod, stage: first-lava, group: rod, kind: any_of, label: "Topaz Rod or better (Fishing 19, HOTM 5)", options: [{ id: topaz, group: rod, kind: item, item: POLISHED_TOPAZ_ROD }, { id: magma-rod-a, group: rod, kind: item, item: MAGMA_ROD }, { id: inferno-a, group: rod, kind: item, item: INFERNO_ROD }, { id: hellfire-a, group: rod, kind: item, item: HELLFIRE_ROD }] }
  - { id: legend-rod, stage: first-lava, group: rod, kind: any_of, label: Rod of Legends or better (Fishing 20), options: [{ id: legend, group: rod, kind: item, item: LEGEND_ROD }, { id: sea-c, group: rod, kind: item, item: ROD_OF_THE_SEA }, { id: giant-c, group: rod, kind: item, item: GIANT_FISHING_ROD }] }
  - { id: rod-parts-hotspot, stage: first-lava, group: rod, kind: manual, label: "Stingy Sinker, and Hotspot Hook and Sinker for Hotspot fishing (Fishing 20)" }
  - { id: ichthyic, stage: first-lava, group: equipment, kind: any_of, label: "Ichthyic Gloves, Belt and Cloak or better", options: [{ id: ichthyic-belt, group: equipment, kind: item, item: ICHTHYIC_BELT }, { id: finwave-b, group: equipment, kind: item, item: FINWAVE_BELT }, { id: gillsplash-b, group: equipment, kind: item, item: GILLSPLASH_BELT }] }
  - { id: flying-fish, stage: first-lava, group: pet, kind: pet, pet: { type: FLYING_FISH, minTier: LEGENDARY, level: 1 }, label: Legendary Flying Fish, note: With Edible Seaweed. See the pets section below. }
  - { id: shark-armor, stage: first-lava, group: armor, kind: any_of, label: Full Shark Scale Armor or better (Fishing 24), options: [{ id: shark-d, group: armor, kind: item, item: SHARK_SCALE_CHESTPLATE }, { id: thunder-d, group: armor, kind: item, item: THUNDER_CHESTPLATE }, { id: magma-d, group: armor, kind: item, item: MAGMA_LORD_CHESTPLATE }] }
  - { id: sea-rod, stage: first-lava, group: rod, kind: any_of, label: Rod of the Sea or better (Fishing 24), options: [{ id: sea, group: rod, kind: item, item: ROD_OF_THE_SEA }, { id: giant-d, group: rod, kind: item, item: GIANT_FISHING_ROD }] }
  - { id: magma-rod, stage: first-lava, group: rod, kind: any_of, label: Magma Rod or better (Fishing 27), options: [{ id: magma-rod-b, group: rod, kind: item, item: MAGMA_ROD }, { id: inferno-b, group: rod, kind: item, item: INFERNO_ROD }, { id: hellfire-b, group: rod, kind: item, item: HELLFIRE_ROD }] }
  - { id: slug-boots, stage: first-lava, group: armor, kind: any_of, label: Slug Boots or better (Fishing 27), options: [{ id: slug, group: armor, kind: item, item: SLUG_BOOTS }, { id: thunder-boots-a, group: armor, kind: item, item: THUNDER_BOOTS }, { id: magma-boots-a, group: armor, kind: item, item: MAGMA_LORD_BOOTS }] }
  - { id: moogma-leggings, stage: first-lava, group: armor, kind: any_of, label: Moogma Leggings or better (Fishing 28), options: [{ id: moogma, group: armor, kind: item, item: MOOGMA_LEGGINGS }, { id: thunder-legs-a, group: armor, kind: item, item: THUNDER_LEGGINGS }, { id: magma-legs-a, group: armor, kind: item, item: MAGMA_LORD_LEGGINGS }] }
  # Fishing 28 to 45
  - { id: inferno-rod, stage: crimson, group: rod, kind: any_of, label: Inferno Rod or better (Fishing 30), options: [{ id: inferno, group: rod, kind: item, item: INFERNO_ROD }, { id: hellfire-c, group: rod, kind: item, item: HELLFIRE_ROD }] }
  - { id: titan-line, stage: crimson, group: rod, kind: manual, label: Titan Line on your best rod (Fishing 30) }
  - { id: finwave, stage: crimson, group: equipment, kind: any_of, label: "Finwave Gloves, Belt and Cloak or better", options: [{ id: finwave-belt, group: equipment, kind: item, item: FINWAVE_BELT }, { id: gillsplash-c, group: equipment, kind: item, item: GILLSPLASH_BELT }] }
  - { id: lava-weapon, stage: crimson, group: tools, kind: any_of, label: A high damage weapon for lava Sea Creatures, options: [{ id: hyperion, group: tools, kind: item, item: HYPERION }, { id: flay, group: tools, kind: item, item: FLAMING_FLAY }, { id: whip, group: tools, kind: item, item: SOUL_WHIP }], note: The guide says a fully scrolled Hyperion is what beats Stridersurfers for XP here. }
  - { id: flaming-chest, stage: crimson, group: armor, kind: any_of, label: Flaming Chestplate or better (Fishing 33), options: [{ id: flaming, group: armor, kind: item, item: FLAMING_CHESTPLATE }, { id: thunder-e, group: armor, kind: item, item: THUNDER_CHESTPLATE }, { id: magma-e, group: armor, kind: item, item: MAGMA_LORD_CHESTPLATE }] }
  - { id: taurus-helmet, stage: crimson, group: armor, kind: any_of, label: Taurus Helmet or better (Fishing 35), options: [{ id: taurus, group: armor, kind: item, item: TAURUS_HELMET }, { id: thunder-helm-a, group: armor, kind: item, item: THUNDER_HELMET }, { id: magma-helm-a, group: armor, kind: item, item: MAGMA_LORD_HELMET }] }
  - { id: hellfire-rod, stage: crimson, group: rod, kind: item, item: HELLFIRE_ROD, note: Fishing 35. }
  - { id: bronze-hunter, stage: crimson, group: progress, kind: any_of, label: Bronze Trophy Hunter or better, options: [{ id: bronze-helm, group: progress, kind: item, item: BRONZE_HUNTER_HELMET }, { id: silver-helm-a, group: progress, kind: item, item: SILVER_HUNTER_HELMET }, { id: gold-helm-a, group: progress, kind: item, item: GOLD_HUNTER_HELMET }, { id: diamond-helm-a, group: progress, kind: item, item: DIAMOND_HUNTER_HELMET }], note: "15 unique Trophy Fish. Unlocks Thunder. Player lookup checks for the armor, so a sold set shows as missing. See Trophy Fishing." }
  - { id: thunder-armor, stage: crimson, group: armor, kind: any_of, label: Full Thunder Armor or better (Fishing 36), options: [{ id: thunder-f, group: armor, kind: item, item: THUNDER_CHESTPLATE }, { id: magma-f, group: armor, kind: item, item: MAGMA_LORD_CHESTPLATE }] }
  - { id: thunder-necklace, stage: crimson, group: equipment, kind: any_of, label: Thunderbolt Necklace or better (Fishing 36), options: [{ id: thunderbolt, group: equipment, kind: item, item: THUNDERBOLT_NECKLACE }, { id: magma-necklace-a, group: equipment, kind: item, item: MAGMA_LORD_GAUNTLET }] }
  - { id: ammonite, stage: crimson, group: pet, kind: pet, pet: { type: AMMONITE, minTier: LEGENDARY, level: 1 }, label: Legendary Ammonite, note: "Forged at HOTM 4, but only better than a Dolphin once your HOTM, Mining and Fishing levels are high. See the pets section below." }
  - { id: silver-hunter, stage: crimson, group: progress, kind: any_of, label: Silver Trophy Hunter or better, options: [{ id: silver-helm, group: progress, kind: item, item: SILVER_HUNTER_HELMET }, { id: gold-helm-b, group: progress, kind: item, item: GOLD_HUNTER_HELMET }, { id: diamond-helm-b, group: progress, kind: item, item: DIAMOND_HUNTER_HELMET }], note: 18 unique Trophy Fish at Silver or higher. Unlocks Lord Jawbus. }
  # Fishing 45
  - { id: gillsplash, stage: end, group: equipment, kind: item, item: GILLSPLASH_BELT, label: "Gillsplash Gloves, Belt and Cloak" }
  - { id: magma-helmet, stage: end, group: armor, kind: item, item: MAGMA_LORD_HELMET }
  - { id: magma-chestplate, stage: end, group: armor, kind: item, item: MAGMA_LORD_CHESTPLATE }
  - { id: magma-leggings, stage: end, group: armor, kind: item, item: MAGMA_LORD_LEGGINGS }
  - { id: magma-boots, stage: end, group: armor, kind: item, item: MAGMA_LORD_BOOTS }
  - { id: magma-necklace, stage: end, group: equipment, kind: item, item: MAGMA_LORD_GAUNTLET, note: The old Magma Lord Gauntlet. Crafted from 5 Magma Lord Fragments. }
  - { id: giant-rod, stage: end, group: rod, kind: item, item: GIANT_FISHING_ROD, note: The top water rod. }
  - { id: reforges, stage: end, group: armor, kind: manual, label: "Submerged armor, Snowy equipment and a Pitchin' rod", note: "Deep Sea Orb, Terry's Snowglobe and Pitchin' Koi. Calcified (Calcified Heart) is the cheaper armor reforge." }
  - { id: fish-affinity, stage: end, group: accessories, kind: accessory, item: FISH_AFFINITY_TALISMAN }
  - { id: sea-creature-accessory, stage: end, group: accessories, kind: any_of, label: Sea Creature Artifact, options: [{ id: sea-artifact, group: accessories, kind: accessory, item: SEA_CREATURE_ARTIFACT }, { id: sea-ring, group: accessories, kind: accessory, item: SEA_CREATURE_RING }] }
  - { id: chumming, stage: end, group: accessories, kind: accessory, item: CHUMMING_TALISMAN }
  - { id: agarimoo, stage: end, group: accessories, kind: accessory, item: AGARIMOO_ARTIFACT }
  - { id: seal, stage: end, group: accessories, kind: accessory, item: SEAL_RING }
  - { id: odger, stage: end, group: accessories, kind: accessory, item: ODGERS_DIAMOND_TOOTH, note: "From Odger, not the Auction House, as you reach each Trophy Fish tier." }
  # Temporary buffs
  - { id: god-potion, stage: buffs, group: consumables, kind: manual, label: God Potion, note: +20 Fishing Wisdom. }
  - { id: cookie, stage: buffs, group: consumables, kind: manual, label: Booster Cookie, note: +25 Fishing Wisdom. }
  - { id: mush-mixin, stage: buffs, group: consumables, kind: manual, label: Glowing Mush Mixin, note: +30 Fishing Speed. }
  - { id: beacon, stage: buffs, group: consumables, kind: manual, label: Beacon with a Scorched Power Crystal, note: +1 to 6 Sea Creature Chance. }
  - { id: sea-emperor-cake, stage: buffs, group: consumables, kind: manual, label: Sea Emperor Century Cake (dark blue), note: +1 Sea Creature Chance. }
---

## How to level

The order is the guide's, best first. It was written before the Minister Update, see the update below.

### Fishing 0 to 19

1. Fill the Fish Family at [Coral](https://wiki.hypixel.net/Coral) in Galatea. It exchanges money for XP: 20 "The Fish" items for Fishing 19, or 27 for Fishing 20.
2. Open [Can of Worms](https://wiki.hypixel.net/Can_Of_Worms), about 753 for this stretch at roughly 428 XP each.
3. Fill Empty Chum Buckets with [Chum](https://wiki.hypixel.net/Chum), a cheap and profitable way to get XP. Have a player place the buckets while you fill them, which needs a Luminous Bracelet. Key-binding `/gfs chum 60` makes it semi-AFK and needs a Fishing Sack.

The other options are Water Hotspot fishing in the Backwater Bayou, or [Fishing Minions](https://wiki.hypixel.net/Fishing_Minion) with a Super Compactor, Minion Expander and Large Storage.

### Fishing 19 to 28

1. [Stridersurfers](/guides/stridersurfer-fishing/) in Galatea.
2. [Magma Fields](/guides/magma-fields-fishing/) in the Crystal Hollows, once you have HOTM 6 and the Subterranean Fisher perk.
3. Water Hotspot fishing in the Backwater Bayou.

### Fishing 28 to 50

1. Lava fishing on the Crimson Isle. It takes a fully scrolled Hyperion to beat Stridersurfers for XP.
2. [Stridersurfers](/guides/stridersurfer-fishing/) in Galatea.
3. Lava Hotspot fishing on the Crimson Isle, the worst for XP but highly profitable. It also takes a fully scrolled Hyperion.

To catch Thunder and Lord Jawbus you need Bronze and Silver Trophy Hunter, see [Trophy Fishing](/guides/trophy-fishing/).

## Water or lava

For water Sea Creatures, get as much Sea Creature Chance as you can. Most Sea Creatures unlock as your Fishing level goes up: `/scg` shows the Sea Creature Guide in game.

Lava works the same way, except you need high damage gear to kill what you catch. The usual midgame weapon is the Hyperion, but any strong mage weapon works, such as a Midas Staff, a Soul Whip or a Flamin' Flay. Area damage like Fire Veil or Fire Fury kills most Sea Creatures faster. With a Hyperion, an Implosion Belt adds damage.

Lava fishing on the Crimson Isle starts at Fishing 27 with the Magma Rod, and brings [Trophy Fishing](/guides/trophy-fishing/) with it.

On Ironman, Salty on rods is a good substitute for rod reforges.

## Pets

Use an Epic [Dolphin](https://wiki.hypixel.net/Dolphin_Pet) with a Washed-up Souvenir until a Legendary [Ammonite](https://wiki.hypixel.net/Ammonite_Pet) with a Washed-up, then Hephaestus Souvenir, beats it. That takes HOTM 10 and depends on how many players you fish with:

- 4 players: Mining 60, Fishing 41
- 3 players: Mining 50, Fishing 31
- 2 players: Mining 40, Fishing 21
- 1 other player: Mining 21, Fishing 20
- Alone: Fishing 21

A Legendary [Flying Fish](https://wiki.hypixel.net/Flying_Fish_Pet) with Edible Seaweed maximises your stats. Set an Auto-Pet Rule to equip it on rod cast, then press a key-bind for `/pets` and switch to your main pet after you cast. You keep the Fishing Speed from the Flying Fish and the Sea Creature Chance from your main pet. Use Odin for the pet bind, Skytils for the key-bind and SkyHanni to lock the screen with `/shlockmouse`.

For Sea Creature XP, add a Squid pet with auto-rules from the Bits Shop: **On throw fishing hook: Flying Fish** and **Enter combat: Squid**. Killing Sea Creatures is your main source of XP, so this adds a lot.

For events use a Legendary Reindeer for Jerry fishing, a Mythic Bat for Spooky fishing and a Legendary Megalodon for Shark fishing, with a Washed-up Souvenir, Hephaestus Souvenir or Burnt Texts.

## Bait

When you are more than 25 Fishing Speed below the cap, use Fish Bait. Within 25 of it, use Glowy Chum Bait, or Whale Bait if there are rare Sea Creatures to catch. Baits now live in the Bait Sack, and shift-clicking one there favours it.

## Mods

- [ChatTriggers](https://www.chattriggers.com/) with `/ct import FeeshNotifier`
- [SkyHanni](https://modrinth.com/mod/skyhanni)
- [Skytils](https://github.com/Skytils/SkytilsModReleases/tags)
- [Odin](https://github.com/odtheking/Odin)

## Updates since the guide

Checked against the [Hypixel SkyBlock Wiki](https://hypixelskyblock.minecraft.wiki/w/Changelog). Corrected in the text above unless noted.

- **Magma Lord Gauntlet (May 2026):** now the Magma Lord Necklace, with +2.5 Sea Creature Chance. It does not build from the Thunderbolt Necklace.
- **Sea Creature cap (May 2026):** 10 per player on every island, on top of the 60 per server.
- **Lotus Atoll (May 2026):** a new island reached by Ship, with its own Sea Creatures and Trophy Frogs. Thunder is now Legendary, and Fishing Hotspots were added to The Park. No Casters guide covers these yet.
- **Backwater Bayou (May 2026):** the Fishing Speed cap dropped from 300 to 200, and only Bayou and Hotspot Sea Creatures can be caught there.
- **Hotspot accessories (Oct 2026):** the Hotspot Talisman line and Hotspot Tonic Mixin are new.
- **Fishing XP (Oct 2026, Minister Update):** Sea Creature XP now follows mob level. A Flaming Worm gives 1,150 XP from Fishing 19, a Stridersurfer 775, and Lava Blaze and Lava Pigman 500. That makes [Worm Fishing](/guides/worm-fishing/) a real option from Fishing 19, which the XP order above does not show yet.
- **Salty (Oct 2026):** Salt Cube's base Sea Creature Chance was lowered, and its Salty Bonus doubles its stats on Jerry Island. The Ironman tip above is from before this.
- **Rod Parts (Sep 2026):** they can no longer be Recombobulated, and removing one now costs 10,000 to 1,000,000 coins by rarity.
- **Weather (Oct 2026):** Fishing Speed, Sea Creature Chance and Trophy Chance bonuses by island. The [changelog](https://hypixelskyblock.minecraft.wiki/w/Changelog/2026/October_6) has the table.
