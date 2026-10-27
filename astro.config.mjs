import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://skyprogression.dev",
  output: "static",
  integrations: [preact()],
  build: { inlineStylesheets: "always" },
});
