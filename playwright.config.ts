import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 5000, // max time per test (ms)
  expect: { timeout: 5000 },
  reporter: [['list'], ['html']],
  use: {
    // Base URL for relative `page.goto()` calls in tests
    baseURL: 'https://apidetarefas.docs.apiary.io',
    headless: false,
    actionTimeout: 5000,
    navigationTimeout: 5000,
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ],
});
