# Third-party notices

The MIT License in [LICENSE](LICENSE) covers this project's code and its own content. The following are included under
their own terms.

## FurfSky Reborn textures

Files: `public/icons/items/*.png`, `public/icons/hotm/*.png`

Item textures by the FurfSky Reborn team, used with permission (granted to the SkyProgression project on 2026-10-27).
Taken from the FurfSky Reborn resource pack, version 1.9.2 "New Leaf"
(<https://modrinth.com/resourcepack/furfsky-reborn>, Modrinth version `8DzcDe5O`). The pack's credits read: art and pack
compilation by the Reborn Team; other contributors are listed at <https://furfsky.net>.

These textures are not covered by the MIT License. All rights remain with the FurfSky Reborn team; do not reuse them
outside this site without their permission.

## Hypixel SkyBlock textures

Files: `public/icons/hypixel/*.png` (from the Hypixel SkyBlock Resource Pack, downloaded from the Hypixel API endpoint
`/v2/resources/packs`) and `public/icons/heads/*.png` (item and pet player head skins drawn as small cubes; item skins
from the Hypixel API items resource `/v2/resources/skyblock/items`, pet skins found through SkyCrypt's pet table).

Copyright © 2026 Hypixel Inc. Used under the Hypixel SkyBlock Resource Pack License 1.0, which allows Hypixel-related
websites to use the pack's assets as long as access is not sold or charged for. The head skins are Hypixel's art served
through its public API rather than files in the pack. SkyProgression does not claim these textures as its own, is free,
and is not affiliated with or endorsed by Hypixel. These textures are not covered by the MIT License.

## SkyCrypt

The pet head icons use the head skin IDs from SkyCrypt's pet table (`src/constants/pets.js` at commit
`48fc9bfb4b774768ef9aee1ff7a1002fd3a254e0`, <https://github.com/SkyCryptWebsite/SkyCrypt>). Heads are drawn as
isometric cubes the way SkyCrypt's renderer draws them (which builds on Crafatar, <https://github.com/crafatar/crafatar>);
our renderer in `scripts/import-icons.mjs` is our own code.

> MIT License
>
> Copyright (c) 2019-present Lea Seibert and other contributors
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
> documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
> rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
> persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
> Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
> WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
> OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The pet skins themselves are Hypixel's art, served by Mojang's skin server; see "Hypixel SkyBlock textures" above.

## Minecraft textures

Files: `public/icons/minecraft/*.png`, taken from the official Minecraft 26.3 client (`assets/minecraft/textures`).

© Mojang Studios. Used for a few block and material icons on this free, non-commercial fan site, following the
Minecraft Usage Guidelines. SkyProgression is not an official Minecraft product and is not approved by or associated
with Mojang or Microsoft. These textures are not covered by the MIT License.

## Pixelify Sans

File: `public/fonts/pixelify-sans-600.woff2`

Copyright 2021 The Pixelify Sans Project Authors (<https://github.com/eifetx/Pixelify-Sans>). Licensed under the SIL
Open Font License 1.1; the full license is in `public/fonts/OFL.txt`.

## Guide content

The guides in `src/content/guides/` and the references in `src/content/attributes.yaml` and `src/content/stats.yaml`
come from the Mining Cult Discord community and are published with the authors' permission. Each guide names its
authors. The text belongs to them and is not covered by the MIT License.
