import { expect, test } from '@playwright/test';

test('career planning copied link can be opened', async ({ page }) => {
  await page.goto(
    'http://localhost:5173/urataidot/fi/tuo#eyJkYXRhIjpbWzAsMSwxLDJdLFswLDIsMSwyXSxbMCwyLDIsMl0sWzAsMywxLDJdLFswLDQsMSwyXSxbMCw1LDEsMl0sWzAsNSwyLDJdLFswLDYsMSwyXSxbMCw3LDEsMl0sWzEsMSwxLDJdLFsxLDIsMSwyXSxbMSwzLDEsMl0sWzEsNCwxLDJdLFsxLDUsMSwyXSxbMiwxLDEsMl0sWzIsMiwxLDJdLFsyLDMsMSwyXSxbMiw0LDEsMl0sWzIsNSwxLDJdLFsyLDYsMSwyXSxbMiw3LDEsMl0sWzIsOCwxLDJdLFszLDEsMSwyXSxbMywyLDEsMl0sWzMsMywxLDJdLFszLDQsMSwyXSxbMyw1LDEsMl0sWzQsMSwxLDJdLFs0LDIsMSwyXSxbNCwzLDEsMl0sWzQsMywyLDJdLFs0LDQsMSwyXSxbNCw1LDEsMl0sWzQsNiwxLDJdLFs1LDEsMSwyXSxbNSwyLDEsMl0sWzUsMywxLDJdXSwidmVyc2lvbiI6MX0=',
  );
  await expect(page.getByRole('heading', { name: 'Palaute' })).toBeVisible();
});
