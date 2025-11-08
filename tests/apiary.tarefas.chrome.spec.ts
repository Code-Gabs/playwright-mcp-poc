import { test, expect } from '@playwright/test';

test.use({ headless: false });

test('Reference root -> Tarefas section shows expected anchors', async ({ page }) => {
  const resp = await page.goto('/#reference/0');
  if (resp) expect(resp.status()).toBeLessThan(400);

  const tarefasLink = page.getByRole('link', { name: /Tarefas/i });
  await expect(tarefasLink.first()).toBeVisible({ timeout: 4000 });
  await tarefasLink.first().click();

  await expect(page.getByRole('heading', { name: /Tarefas/i, level: 2 })).toBeVisible({ timeout: 4000 });

  const listar = page.getByRole('link', { name: /Listar Tarefas|Listar tarefas/i });
  const criar = page.getByRole('link', { name: /Criar Tarefas|Criar tarefas/i });
  const hasAny = await listar.first().isVisible().catch(() => false) || await criar.first().isVisible().catch(() => false);
  expect(hasAny).toBeTruthy();
});
