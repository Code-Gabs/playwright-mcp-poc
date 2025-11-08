import { test, expect } from '@playwright/test';

test.use({ headless: false });

test('Reference root -> Login section shows expected anchors', async ({ page }) => {
  const resp = await page.goto('/#reference/0');
  if (resp) expect(resp.status()).toBeLessThan(400);

  const loginLink = page.getByRole('link', { name: /Login/i });
  await expect(loginLink.first()).toBeVisible({ timeout: 4000 });
  await loginLink.first().click();

  await expect(page.getByRole('heading', { name: /Login/i, level: 2 })).toBeVisible({ timeout: 4000 });

  const loginAnchor = page.getByRole('link', { name: /Login|Logout/i });
  const hasAnchor = await loginAnchor.first().isVisible().catch(() => false);
  expect(hasAnchor).toBeTruthy();
});
