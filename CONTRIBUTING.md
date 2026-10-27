# Contributing

Thanks for helping. Corrections to guides, new guides and fixes to the site are all welcome.

## Guide content

- Guide text belongs to its authors. To change what a guide recommends, ask its author in the Mining Cult Discord
  first, or open an issue and we will check with them.
- New guides need the author's permission to be published here. Say in the pull request that you have it.
- Keep numbers as the author wrote them and set `updated:` to the day you checked the guide.
- Use Hypixel IDs for items, pets, perks and attributes. The README explains the data format.

## Code

- Run `npm run build` before you open a pull request; it type-checks and validates every guide.
- Keep JavaScript out of pages unless something needs interaction; prefer plain HTML and CSS.
- Colours and sizes live as custom properties in `src/styles/global.css`. Check both themes and a 360 px wide screen.
- Small, focused commits with plain messages.
- Do not commit secrets or API keys. Textures come only through `scripts/import-icons.mjs` (FurfSky Reborn, Hypixel and Minecraft; see THIRD_PARTY_NOTICES.md).

## Reporting problems

Open an issue at <https://github.com/tianiste/SkyProgression-WEB/issues> with the page and what looks wrong.
