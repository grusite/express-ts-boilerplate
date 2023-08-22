import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      exclude: ['**/types/**', '**/config/**', '**/__tests__/**'],
      reporter: ['text', 'lcov'],
    },
    passWithNoTests: true,
  },
});
