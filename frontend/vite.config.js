import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import path from "path";

const repoBase = process.env.GITHUB_REPOSITORY?.split("/")[1];

export default defineConfig({
  plugins: [svelte()],
  root: ".", // run from frontend/ by default
  // Use repo-relative base on GitHub Pages, otherwise relative paths for local preview
  base: process.env.GITHUB_ACTIONS && repoBase ? `/${repoBase}/` : "./",
  build: {
    outDir: "../site",
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
