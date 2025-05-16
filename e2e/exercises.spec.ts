import { expect, test } from '@playwright/test';

test('exercises can be filtered and opened', async ({ page }) => {
  await page.goto('/urataidot/');
  await page.getByText('Valikko').click();
  await page.getByRole('link', { name: 'Tehtäväpankki' }).click();
  await page.getByRole('link', { name: 'Tehtävä Opi kuvailemaan' }).click();
  await expect(page.getByRole('heading', { name: 'Opi kuvailemaan ja jäsentelem' })).toBeVisible();
  await page.getByRole('button', { name: 'Takaisin' }).click();
  await page.getByText('Valitse').first().click();
  await page.getByRole('option', { name: 'Maailma ympärilläsi' }).click();
  await page
    .getByRole('link', { name: 'Tehtävä Opi tunnistamaan omaan tilanteeseen sopivia mahdollisuuksia Maailma ymp' })
    .click();
  await page.getByRole('button', { name: 'Valmis' }).click();
  await expect(page.getByRole('heading', { name: 'Palaute harjoitustehtävästä' })).toBeVisible();
  await page.getByRole('button', { name: 'Palaa takaisin' }).click();
  await expect(page.getByRole('heading', { name: 'Tehtäväpankki' })).toBeVisible();
});

test('exercise pdf can be downloaded', async ({ page }) => {
  await page.goto('http://localhost:5173/urataidot/fi/tehtavat');
  await page
    .getByRole('link', { name: 'Tehtävä Opi tunnistamaan omaan tilanteeseen sopivia mahdollisuuksia Maailma ymp' })
    .click();
  await page.getByRole('button', { name: 'Valmis' }).click();
  await page.getByRole('button', { name: 'Lataa tehtävä PDF:nä' }).click();
  const downloadPromise = page.waitForEvent('download');
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toEqual('Opi tunnistamaan omaan tilanteeseen sopivia mahdollisuuksia.pdf');
  await page.getByRole('button', { name: 'Palaa takaisin' }).click();
  await expect(page.getByRole('heading', { name: 'Tehtäväpankki' })).toBeVisible();
});
