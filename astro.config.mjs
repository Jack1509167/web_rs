// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import dbInitializer from "./intergrations/db_initializer";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [dbInitializer(), react()],
  output: "server",
  adapter: vercel(),
});