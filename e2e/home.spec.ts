import { test, expect } from '@playwright/test';

test('home page has heading', async ({ page }) => {
  await page.goto('/urataidot/');
  await page.getByText('Hyväksy kaikki').click();
  await expect(
    page.getByRole('heading', { name: 'Tunnista vahvuutesi ja kehityskohteesi Urataitojen itsearvioinnin avulla' }),
  ).toBeVisible();
});

test('home page has link cards', async ({ page }) => {
  await page.goto('/urataidot/');
  await page.getByText('Hyväksy kaikki').click();
  await expect(page.getByRole('link', { name: 'Nopeasti alkuun' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Syvenny urasuunnitteluun' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Tehtäväpankki' })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Urasuunnitelma' })).toBeHidden();
  await page.getByText('Valikko').click();
  await expect(page.getByRole('link', { name: 'Tehtäväpankki' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Urasuunnitelma' })).toBeVisible();
});
