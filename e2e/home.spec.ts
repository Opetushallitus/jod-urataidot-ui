import { test, expect } from '@playwright/test';

test('home page has heading', async ({ page }) => {
  await page.goto('/urataidot/');
  await expect(page.getByRole('heading', { name: 'Urataidot' })).toBeVisible();
});

test('home page has link cards', async ({ page }) => {
  await page.goto('/urataidot/');
  await expect(page.getByRole('link', { name: 'pikaitsearviointi' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Syvenny urasuunnitteluun' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Tehtäväpankki' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Urasuunnitelma' })).toBeVisible();
});
