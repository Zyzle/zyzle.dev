// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import expressiveCode from "astro-expressive-code";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    expressiveCode({
      themes: ["one-dark-pro"],
      styleOverrides: {
        codeFontFamily: "'Fira Code Variable', monospace",
      },
    }),
    mdx(),
  ],
});
