import { test, expect } from '@playwright/test';

test('home page has heading', async ({ page }) => {
  await page.goto('/urataidot/');
  await page.getByText('Hyväksy kaikki').click();
  await expect(page.getByRole('heading', { name: 'Pohdi omaa suuntaasi Urataidot-työkalun avulla' })).toBeVisible();
});

test('home page has link cards', async ({ page }) => {
  await page.goto('/urataidot/');
  await page.getByText('Hyväksy kaikki').click();
  const main = page.getByRole('main');
  await expect(main.getByRole('link', { name: 'Urasuunnittelu-taitojen itsearviointi' })).toBeVisible();
  await expect(main.getByRole('link', { name: 'Pikaitsearviointi' })).toBeVisible();
  await expect(main.getByRole('link', { name: 'Urasuunnitelma' })).toBeVisible();
  await expect(main.getByRole('link', { name: 'Tehtäväpankki' })).toBeVisible();
  await page.getByText('Valikko').click();
  // Menu links share titles with the cards; exact match excludes the cards, whose names include the description
  await expect(page.getByRole('link', { name: 'Tehtäväpankki', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Urasuunnitelma', exact: true })).toBeVisible();
});
