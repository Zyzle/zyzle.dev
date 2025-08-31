// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode, { ExpressiveCodeTheme } from "astro-expressive-code";
import fs from "node:fs";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import wasm from "vite-plugin-wasm";
import { loadEnv } from "vite";

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

import algolia from "./src/utils/algolia-integration";

const jsoncString = fs.readFileSync(
  new URL(`./zyzle-code.jsonc`, import.meta.url),
  "utf-8"
);
const zyzleCode = ExpressiveCodeTheme.fromJSONString(jsoncString);

const {
  VITE_PUBLIC_ALGOLIA_APP_ID,
  ALGOLIA_WRITE_API_KEY,
  VITE_PUBLIC_ALGOLIA_INDEX_NAME,
} = loadEnv("", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: "https://zyzle.dev",
  vite: {
    plugins: [wasm(), tailwindcss()],
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
    react(),
    algolia({
      appId: VITE_PUBLIC_ALGOLIA_APP_ID,
      apiKey: ALGOLIA_WRITE_API_KEY,
      indexName: VITE_PUBLIC_ALGOLIA_INDEX_NAME,
      baseUrl: "https://zyzle.dev/",
      isProduction: process.env.NODE_ENV === "production",
    }),
  ],

  markdown: {
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
