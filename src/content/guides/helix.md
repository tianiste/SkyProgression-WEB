---
title: Helix
category: foraging
summary: The toughest and most profitable wood, on Torrhus Canyon, cut beige first and red second.
authors:
  - { id: foraging-community, role: Guide }
source: { name: Foraging community Discord }
updated: 2026-11-01
where: Torrhus Canyon. Every tree on the island is Helix.
blocks:
  - "Toughness 150: under 800 Sweep you won't have a good time"
  - "Cut all the beige wood first, then the red, or you take a -50% Sweep penalty"
  - "Not recommended for money above 150 ping"
rates:
  - { label: High-level foragers, value: "50m to 65m per hour", note: from logs and drops alone }
  - { label: With a Jade Dragon, value: "95m to 100m per hour", note: "adding around 45m pet XP per hour at 1 coin per XP" }
  - { label: Collection, value: "1.3m to about 2.2m per hour", note: "depends on skill, setup, ping and how many people cut your route" }
ratesMeasured: These are experienced players. With enough time and practice this is what you can expect.
requirements:
  - { id: sweep-shards, tier: budget, group: attributes, kind: manual, label: Every Sweep-related shard, note: Very important. }
  - { id: helix-armor-budget, tier: budget, group: armor, kind: item, item: HELIX_ARMOR_CHESTPLATE, label: Sweep and fortune boosted Helix armor }
  - { id: helix-axe-budget, tier: budget, group: axe, kind: item, item: HELIX_CHOPPER, label: Sweep and fortune boosted Helix Chopper }
  - { id: pet-budget, tier: budget, group: pet, kind: any_of, label: Jade Dragon or Legendary Frog, note: "If you followed the upgrade path you should already have the Jade Dragon, which is better.", options: [{ id: jade-budget, group: pet, kind: pet, pet: { type: JADE_DRAGON, minTier: LEGENDARY, level: 1 } }, { id: frog-budget, group: pet, kind: pet, pet: { type: FROG, minTier: LEGENDARY, level: 1 } }] }
  - { id: attributes-200, tier: max, group: attributes, kind: manual, label: "200+ maxed attributes, aim for 280" }
  - { id: max-armor, tier: max, group: armor, kind: manual, label: Max Helix armor }
  - { id: max-axe, tier: max, group: axe, kind: manual, label: Max axe }
  - { id: jade-dragon, tier: max, group: pet, kind: pet, pet: { type: JADE_DRAGON, minTier: LEGENDARY, level: 1 }, label: Jade Dragon }
  - { id: hotf-8, tier: max, group: progress, kind: manual, label: Maxed HotF 8 tree }
  - { id: instant-felling, tier: max, group: other, kind: manual, label: All sources of instant felling trees }
  - { id: wisdom, tier: max, group: other, kind: manual, label: All sources of Foraging Wisdom }
  - { id: leveling-pet, group: pet, kind: manual, priority: optional, label: "For pet leveling, a pet of your choice with a 50% foraging XP boost", note: "With all sources of Sweep and fortune outside of the Jade Dragon, and all sources of Foraging and Taming Wisdom." }
---

## Style

Helix trees have two colours of wood, beige and red. Cut all of the beige, then start on the red. Get it wrong and you
take the -50% Sweep penalty. If that doesn't click, turn on sweep details in `/treegifts`.

## Toughness and ping

Helix has a toughness of 150, so you need a lot of Sweep to cut it effectively. You can't instabreak Helix logs, so rates
depend on your gear, skill and ping, which plays a part through tick speeds even though some players overcome it. Above
150 ping, Mangrove and Fig suit you better for money.

Whispers from Helix go to Desert Whispers; see [Heart of the Forest](/guides/heart-of-the-forest/).
