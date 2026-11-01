import { defineMiddleware } from "astro:middleware";
import { SKILLS } from "./lib/skills";

/**
 * Development only: /player/<name>/<view>/ is served by the static shell /player-page/<view>/, as public/_redirects
 * does on Cloudflare Pages. The built site has no server, so this never runs there.
 */
const VIEWS = ["gear", "upgrades", "methods", "start", "hotm", ...SKILLS.filter((s) => s.path).map((s) => s.page!)];
const PAGE = new RegExp(`^/player/([A-Za-z0-9_]{1,16})/(?:(${VIEWS.join("|")})/)?$`);

export const onRequest = defineMiddleware((context, next) => {
  if (!import.meta.env.DEV) return next();
  const match = PAGE.exec(context.url.pathname);
  return match ? context.rewrite(`/player-page/${match[2] ?? "overview"}/`) : next();
});
