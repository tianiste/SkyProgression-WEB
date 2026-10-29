/** Site-wide settings. */
export const SITE = {
  name: "SkyProgression",
  url: "https://skyprogression.dev",
  description: "Mining guides for Hypixel SkyBlock: gear, Heart of the Mountain trees, attributes and rates, from the Mining Cult community.",
  /** Where the mod is downloaded. The Modrinth project is not public yet, so this is the latest GitHub release. */
  download: "https://github.com/tianiste/SkyProgression/releases/latest",
  /** The SkyProgression API (player lookup). PUBLIC_API_URL overrides it, e.g. a local `wrangler dev` on :8787. */
  api: (import.meta.env.PUBLIC_API_URL as string | undefined) ?? "https://api.skyprogression.dev",
  github: "https://github.com/tianiste/SkyProgression",
  webGithub: "https://github.com/tianiste/SkyProgression-WEB",
  /** Where the item and HOTM textures come from (used with permission). */
  furfsky: "https://furfsky.net",
  furfskyModrinth: "https://modrinth.com/resourcepack/furfsky-reborn",
  /** Mining Cult Discord invite. Leave empty until the invite link is confirmed; the server name is shown instead. */
  miningCultInvite: "",
};
