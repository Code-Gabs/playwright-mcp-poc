import { test, expect } from '@playwright/test';

test.use({ headless: false });

test('Reference root -> Contatos section shows expected anchors', async ({ page }) => {
  const resp = await page.goto('/#reference/0');
  if (resp) expect(resp.status()).toBeLessThan(400);

  const contatosLink = page.getByRole('link', { name: /Contatos/i });
  await expect(contatosLink.first()).toBeVisible({ timeout: 4000 });
  await contatosLink.first().click();

  await expect(page.getByRole('heading', { name: /Contatos/i, level: 2 })).toBeVisible({ timeout: 4000 });

  const listar = page.getByRole('link', { name: /Listar Contatos|Listar contato/i });
  const criar = page.getByRole('link', { name: /Criar Contato|Criar Contatos/i });
  const hasAny = await listar.first().isVisible().catch(() => false) || await criar.first().isVisible().catch(() => false);
  expect(hasAny).toBeTruthy();
});
