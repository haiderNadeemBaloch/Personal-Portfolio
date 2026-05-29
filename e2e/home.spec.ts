import { test, expect } from '@playwright/test';

test('User journey: home → projects → project → contact form', async ({
  page,
}) => {
  // Home: load and wait for hero text
  await page.goto('/');
  await expect(page).toHaveTitle(/Haider Nadeem/i);
  await expect(page.getByRole('heading', { name: /hi, i'm/i })).toBeVisible();

  // Navigate to Projects via main navigation
  await page
    .getByLabel('Main navigation')
    .getByRole('link', { name: /^projects$/i })
    .click();

  await expect(page).toHaveURL(/\/projects/);

  // Open first project detail page from the grid
  const firstProjectLink = page
    .locator('article')
    .first()
    .getByRole('link')
    .first();
  await expect(firstProjectLink).toBeVisible();
  await firstProjectLink.click();
  await expect(page).toHaveURL(/\/projects\/.+/);

  // Navigate to Contact via main navigation
  await page
    .getByLabel('Main navigation')
    .getByRole('link', { name: /contact/i })
    .click();
  await expect(page).toHaveURL(/\/contact/);

  // Fill contact form and submit
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill(
    'textarea[name="message"]',
    'This is a test message for Playwright.'
  );

  await page.getByRole('button', { name: /send message/i }).click();

  // Wait for success toast text
  await expect(page.getByText(/message sent successfully/i)).toBeVisible({
    timeout: 7000,
  });
});
