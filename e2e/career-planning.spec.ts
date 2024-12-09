import { expect, test } from '@playwright/test';

// TODO: Figure out a way to test the flow without clicking so much
// test('career planning can be navigated through', async ({ page }) => {
//   await page.goto('/urataidot/');
//   await page.getByRole('link', { name: 'Syvenny urasuunnitteluun:' }).click();
//   await page.getByRole('link', { name: 'Aloitetaan!' }).click();
//   while (await page.getByRole('link', { name: 'Seuraava' }).isVisible()) {
//     await page.getByRole('link', { name: 'Seuraava' }).click();
//   }
//   await expect(page.getByRole('heading', { name: 'Palaute' })).toBeVisible();
// });

test('career planning copied link can be opened', async ({ page }) => {
  await page.goto(
    'http://localhost:5173/urataidot/fi/tuo#eyJkYXRhIjpbWzAsMSwxLDJdLFswLDIsMSwyXSxbMCwyLDIsMl0sWzAsMywxLDJdLFswLDQsMSwyXSxbMCw1LDEsMl0sWzAsNSwyLDJdLFswLDYsMSwyXSxbMCw3LDEsMl0sWzEsMSwxLDJdLFsxLDIsMSwyXSxbMSwzLDEsMl0sWzEsNCwxLDJdLFsxLDUsMSwyXSxbMiwxLDEsMl0sWzIsMiwxLDJdLFsyLDMsMSwyXSxbMiw0LDEsMl0sWzIsNSwxLDJdLFsyLDYsMSwyXSxbMiw3LDEsMl0sWzIsOCwxLDJdLFszLDEsMSwyXSxbMywyLDEsMl0sWzMsMywxLDJdLFszLDQsMSwyXSxbMyw1LDEsMl0sWzQsMSwxLDJdLFs0LDIsMSwyXSxbNCwzLDEsMl0sWzQsMywyLDJdLFs0LDQsMSwyXSxbNCw1LDEsMl0sWzQsNiwxLDJdLFs1LDEsMSwyXSxbNSwyLDEsMl0sWzUsMywxLDJdXSwidmVyc2lvbiI6MX0=',
  );
  await expect(page.getByRole('heading', { name: 'Palaute' })).toBeVisible();
});
