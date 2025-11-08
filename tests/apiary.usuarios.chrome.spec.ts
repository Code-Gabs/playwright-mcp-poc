import { test, expect } from '@playwright/test';

// Use headed browser for this file to satisfy "use Chrome / headed" preference.
test.use({ headless: false });

test('Reference root -> Usuários section shows expected anchors', async ({ page }) => {
  // Load the reference landing page where section anchors are visible
  const resp = await page.goto('/#reference/0');
  if (resp) expect(resp.status()).toBeLessThan(400);

  // The left-nav contains a link named 'Usuários' (accented). Use role-based queries.
  const usuariosLink = page.getByRole('link', { name: /Usuário|Usuários|Usuários/i });
  await expect(usuariosLink.first()).toBeVisible({ timeout: 4000 });

  // Click into the Usuários section
  await usuariosLink.first().click();

  // After navigation, assert the section heading is visible
  await expect(page.getByRole('heading', { name: /Usuários/i })).toBeVisible({ timeout: 4000 });

  // Look for stable anchors under the Usuários section like 'Criar Usário' and 'Editar usuário'
  const criarLink = page.getByRole('link', { name: /Criar Us(á|a)rio|Criar Usuário|Criar Usario/i });
  const editarLink = page.getByRole('link', { name: /Editar usu/i });

  const hasCriar = await criarLink.first().isVisible().catch(() => false);
  const hasEditar = await editarLink.first().isVisible().catch(() => false);
  expect(hasCriar || hasEditar).toBeTruthy();

  // Check for a downloadable API blueprint link (present on the reference root)
  const downloadLink = page.getByRole('link', { name: /Download API Blueprint/i });
  const hasDownload = await downloadLink.first().isVisible().catch(() => false);
  // Accept either the explicit Download link or the literal 'API Blueprint' text on the page
  const hasBlueprintText = await page.locator('text=API Blueprint').first().isVisible().catch(() => false);
  expect(hasDownload || hasBlueprintText).toBeTruthy();
});
