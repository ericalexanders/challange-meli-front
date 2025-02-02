import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
// @ts-ignore
import path from "node:path";
// @ts-ignore
const root = path.resolve(__dirname, "src");
const components = path.resolve(root, "src/components");
const pages = path.resolve(root, "src/pages");
const assets = path.resolve(root, "src/assets");
const services = path.resolve(root, "src/services");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/setupTests.ts",
    exclude: [
      "node_modules",
      "dist",
      "coverage",
      "public",
      "build",
      "scripts",
      "**/__mocks__/**",
      "**/*.config.{js,ts}",
      "**/services/**",
      "**/routes/**",
      "**/types/**",
      "**/main.tsx",
      "**/components/index.ts",
      "**/components/Layout.tsx",
      "**/vite-env.d.ts",
    ],
    coverage: {
      exclude: [
        "node_modules",
        "dist",
        "coverage",
        "public",
        "build",
        "scripts",
        "**/__mocks__/**",
        "**/*.config.{js,ts}",
        "**/services/**",
        "**/routes/**",
        "**/types/**",
        "**/main.tsx",
        "**/components/index.ts",
        "**/components/Layout.tsx",
        "**/vite-env.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": root,
      "@components": components,
      "@pages": pages,
      "@assets": assets,
      "@services": services,
    },
  },
});
