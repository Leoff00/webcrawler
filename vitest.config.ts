/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: { provider: "c8", reporter: ["html", "lcov", "text"] },
  },
});