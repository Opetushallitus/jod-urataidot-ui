import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/urataidot/');
  await expect(page).toHaveTitle(/Urataidot/);
});
