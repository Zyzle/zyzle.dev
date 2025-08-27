// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode, { ExpressiveCodeTheme } from "astro-expressive-code";
import fs from "node:fs";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";

import sitemap from "@astrojs/sitemap";

const jsoncString = fs.readFileSync(
  new URL(`./zyzle-code.jsonc`, import.meta.url),
  "utf-8"
);
const zyzleCode = ExpressiveCodeTheme.fromJSONString(jsoncString);

// https://astro.build/config
export default defineConfig({
  site: "https://zyzle.dev",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    expressiveCode({
      themes: [zyzleCode],
      styleOverrides: {
        codeFontFamily: "'Fira Code Variable', monospace",
      },
    }),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-GB",
        },
      },
    }),
  ],

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
