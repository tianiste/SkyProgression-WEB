import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://skyprogression.dev",
  output: "static",
  // Cloudflare Pages serves each page as a folder and redirects to the trailing-slash URL.
  trailingSlash: "always",
  integrations: [preact()],
  build: { inlineStylesheets: "always" },
  // Keep source whitespace: compression drops the space between text and a following link on a new line.
  compressHTML: false,
});
