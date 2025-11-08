import { defineConfig } from '@playwright/test';

// Resolve headless setting with this precedence:
// 1. If PLAYWRIGHT_HEADLESS is explicitly set, use it ("1"/"true" => headless, "0"/"false" => headed)
// 2. Otherwise, run headless in CI (when CI env var is set)
const _env = (globalThis as any).process?.env || {};
let _headless: boolean;
if (_env.PLAYWRIGHT_HEADLESS !== undefined) {
  const v = String(_env.PLAYWRIGHT_HEADLESS).toLowerCase();
  _headless = v === '1' || v === 'true';
} else {
  _headless = !!_env.CI;
}

export default defineConfig({
  testDir: 'tests',
  timeout: 5000, // max time per test (ms)
  expect: { timeout: 5000 },
  reporter: [['list'], ['html']],
  use: {
    // Base URL for relative `page.goto()` calls in tests
    baseURL: 'https://apidetarefas.docs.apiary.io',
    // Resolved headless value (can be overridden via PLAYWRIGHT_HEADLESS env var)
    headless: _headless,
    actionTimeout: 5000,
    navigationTimeout: 5000,
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ],
});
