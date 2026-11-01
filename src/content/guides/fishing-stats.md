---
title: Fishing Stats and Formulas
category: fishing-basics
summary: The seven fishing stats and their caps, where each one comes from, and how catch time and loot are worked out.
authors:
  - { id: the-ultimate-non, role: Full Fishing Guide }
contributors:
  - { id: minerle, role: Calculations }
  - { id: lemoneater, role: Calculations }
source: { name: "Casters Fishing Community, last edited November 2025" }
updated: 2026-11-01
where: Everywhere you fish.
blocks:
  - "Fishing Speed: 300, or 350 on the Crimson Isle, 250 at Lotus Atoll and 200 in the Backwater Bayou"
  - "Sea Creature Chance and Double Hook Chance: 100%"
  - "Trophy Chance: 150%"
  - "Treasure Chance: 100%"
  - "Fishing Wisdom and Magic Find: no cap"
rates: []
requirements: []
---

## The stats

- **[Fishing Speed](https://wiki.hypixel.net/Fishing_Speed)** makes you catch faster, up to the cap for the island.
- **[Sea Creature Chance](https://wiki.hypixel.net/Sea_Creature_Chance)** is the chance to fish up a Sea Creature. It stops mattering once you hit the Sea Creature cap.
- **[Double Hook Chance](https://wiki.hypixel.net/Double_Hook_Chance)** is the chance to fish up two Sea Creatures in one catch. With Marina as mayor, you gain 1 for every 10 Sea Creature Chance.
- **[Trophy Chance](https://wiki.hypixel.net/Trophy_Fish_Chance)** raises the chance of every Trophy Fish on the Crimson Isle. Eligible fish roll from lowest chance to highest.
- **[Treasure Chance](https://wiki.hypixel.net/Treasure_Chance)** raises the chance of a Treasure. The Treasure rolls, then its type, then a Treasure Dye; if the dye fails, you get the Treasure.
- **[Fishing Wisdom](https://wiki.hypixel.net/Fishing_Wisdom)** raises the Fishing XP you gain.
- **[Magic Find](https://wiki.hypixel.net/Magic_Find)** raises rare drops from mobs with a base chance under 5%. See [Fishing Magic Find](/guides/fishing-magic-find/).

## Catch time

```
MaxValue = 400 - (200 * Lure%)
# Lure VI is 30%, so 0.3 in the formula.

BaseTicks = random number from 200 to MaxValue

FinalTicks = BaseTicks - ((FishingSpeed + BaitFishingSpeed) / FishingSpeedCap * BaseTicks)
# FinalTicks is 1 if Flash procs.

Seconds = FinalTicks / 20

AverageCatchTime = Seconds + (2.5 - (2.5 * QuickBite%))
# Quick Bite V is 25%, so 0.25 in the formula.
```

After a fish arrives it takes 1 to 4 seconds before you can reel in, 2.5 on average. Flash always gives you the lowest reel time. Fishing Speed does not change this wait, so at the cap Quick Bite and Flash are what still save time.

Hypixel made Fishing Speed scaling "more linear" in August and October 2026. The wiki's current formula matches the one above, but it marks that section as needing an update.

## Other formulas

```
TrophyChance = BaseChance * (1 + TrophyFishChance / 100)

FishingXP = BaseFishingXP * (1 + FishingWisdom / 100)
```

Loot works differently above and below a 5% chance:

```
LootChance = BaseChance * (1 + Looting% + Luck%)
# Looting V is 75%, so 0.75. Luck VII is 35%, so 0.35. Luck only counts on armor pieces.

# Above 5%
Loot = Amount * LootChance

# Below 5%
Loot = Amount * (LootChance * (1 + (MagicFind + PetLuck) / 100))
# PetLuck only counts on pets.
```

The guide's [full formula sheet](https://pastebin.com/MV66J0Sk) has more on XP per catch, loot per catch, Sea Creature chance and profit. It predates the changes below.

## Sea Creature XP

Since the October 2026 Minister Update, a Sea Creature's Fishing XP, coins and experience follow its mob level, by rarity:

- Common: level × 7.5 XP
- Uncommon: level × 10 XP
- Rare: level × 12.5 XP
- Epic: level × 15 XP
- Legendary: level × 20 XP
- Mythic: level × 25 XP, at 1.5 times the mob level

The minimum is 25 Fishing XP. A few are set by hand, such as Lava Blaze and Lava Pigman at 500.

## Accessories

- Fish Affinity Talisman: +10 Fishing Speed
- Sea Creature Talisman to Artifact: +0.1 to 0.3 Sea Creature Chance
- Chumming Talisman: +1 Fishing Speed, +1 Fishing Wisdom
- Agarimoo Talisman to Artifact: +1 to 3 Fishing Speed, up to +1 Fishing Wisdom
- Seal Talisman to Ring: +0.5 to 1 Sea Creature Chance, +0.1 to 0.2 Treasure Chance
- Odger's Bronze to Diamond Tooth: +0.5 to 2 Sea Creature Chance. These can't be bought on the Auction House.
- Emperor Talisman to Artifact: +0.5 to 1.5 Sea Creature Chance
- Lighter Blue Abicase: +1.5 Fishing Wisdom
- Magic 8 Ball (seasonal): up to +25 Fishing Speed and +1 Fishing Wisdom
- Hotspot Talisman: +2.5 Fishing Speed in a Fishing Hotspot, more at higher tiers

Sea Creature Enrichments add +0.3 Sea Creature Chance each. They only go on Legendary or Mythic accessories.

## Other sources

- God Potion: +20 Fishing Wisdom
- Booster Cookie: +25 Fishing Wisdom
- Sea Emperor Century Cake (dark blue): +1 Sea Creature Chance
- Glowing Mush Mixin: +30 Fishing Speed
- Beacon I to V with a Scorched Power Crystal: +1 to 6 Sea Creature Chance
- Empty Chumcap Bucket: +4 Fishing Speed each
- Moby Duck: Collector's Edition: +30 Fishing Wisdom for an hour, +1 on first use

## Double Hook Chance

- Marina's Double Trouble perk: +1 for every 10 Sea Creature Chance
- Burnt Texts: +5, but -50 Fishing Speed
- Titan Line: +2
- The Hook attributes: +5 each, see [Fishing Attributes](/guides/fishing-attributes/)
- Ammonite: +0.5 per HOTM level in the Crystal Hollows
- Bobbin' Time III to V: some extra fishing stats and Double Hook Chance
