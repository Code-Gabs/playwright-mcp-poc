import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 5000, // max time per test (ms)
  expect: { timeout: 5000 },
  reporter: [['list'], ['html']],
  use: {
    // Base URL for relative `page.goto()` calls in tests
    baseURL: 'https://apidetarefas.docs.apiary.io',
  // Run headed locally by default, but run headless in CI (CI env var is set on GitHub Actions)
  // Use globalThis to avoid TypeScript "Cannot find name 'process'" in some setups
  headless: !!(globalThis as any).process?.env?.CI,
    actionTimeout: 5000,
    navigationTimeout: 5000,
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ],
});
