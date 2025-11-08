import { test, expect } from '@playwright/test';

test.use({ headless: false });

test('Usuários -> Criar Usário page shows example and capture screenshot', async ({ page }) => {
  // Start from the reference root, navigate into Usuários, then into the Criar Usário action
  const resp = await page.goto('/#reference/0');
  if (resp) expect(resp.status()).toBeLessThan(400);

  const usuariosLink = page.getByRole('link', { name: /Usuário|Usuários/i }).first();
  await expect(usuariosLink).toBeVisible({ timeout: 4000 });
  await usuariosLink.click();

  // Click the Criar Usário anchor if present
  const criarAnchor = page.getByRole('link', { name: /Criar Us(á|a)rio|Criar Usario/i }).first();
  const hasCriarAnchor = await criarAnchor.isVisible().catch(() => false);
  if (hasCriarAnchor) {
    await criarAnchor.click();
  }

  // Capture full-page screenshot regardless of assertions so we always have evidence
  const outPath = 'screenshots/usuarios-criar-usario.png';
  const buffer = await page.screenshot({ path: outPath, fullPage: true });
  await test.info().attach('usuarios-criar-usario.png', { body: buffer, contentType: 'image/png' });

  // Expect the action heading (often an H4) or a code example to be present
  const headingVisible = await page.getByRole('heading', { name: /Criar Us(á|a)rio|Criar Usario/i, level: 4 }).first().isVisible().catch(() => false);
  const codeExampleVisible = await page.locator('text=curl').first().isVisible().catch(() => false) || await page.locator('pre').first().isVisible().catch(() => false);

  expect(headingVisible || codeExampleVisible).toBeTruthy();
});
