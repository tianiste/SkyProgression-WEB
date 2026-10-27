import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://skyprogression.dev",
  output: "static",
  integrations: [preact()],
  build: { inlineStylesheets: "always" },
  // Keep source whitespace: compression drops the space between text and a following link on a new line.
  compressHTML: false,
});
