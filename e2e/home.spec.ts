import { test, expect, type Page } from '@playwright/test';

async function dismissCookieBanner(page: Page) {
  const accept = page
    .getByLabel('Cookie consent banner')
    .getByRole('button', { name: /^accept$/i });
  if (await accept.isVisible()) {
    await accept.click();
  }
}

test('User journey: home → projects → project → contact form', async ({
  page,
}) => {
  // Home: load and wait for hero text
  await page.goto('/');
  await dismissCookieBanner(page);
  await expect(page).toHaveTitle(/Haider Nadeem/i);
  await expect(page.getByRole('heading', { name: /hi, i'm/i })).toBeVisible();

  // Navigate to Projects via main navigation
  await Promise.all([
    page.waitForURL(/\/projects\/?$/, { timeout: 15_000 }),
    page
      .getByLabel('Main navigation')
      .getByRole('link', { name: /^projects$/i })
      .click(),
  ]);

  // Open first project detail page from the grid
  const firstProjectLink = page
    .getByRole('main')
    .getByRole('article')
    .first()
    .getByRole('link');
  await expect(firstProjectLink).toBeVisible();
  await Promise.all([
    page.waitForURL(/\/projects\/.+/, { timeout: 15_000 }),
    firstProjectLink.click(),
  ]);

  // Navigate to Contact via main navigation
  await Promise.all([
    page.waitForURL(/\/contact\/?$/, { timeout: 15_000 }),
    page
      .getByLabel('Main navigation')
      .getByRole('link', { name: /^contact$/i })
      .click(),
  ]);

  // CI has no Resend key; stub the API so we only test the UI success path
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });

  // Fill contact form and submit
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill(
    'textarea[name="message"]',
    'This is a test message for Playwright.'
  );

  await page.getByRole('button', { name: /send message/i }).click();

  await expect(
    page.getByRole('status').getByText(/message sent successfully/i)
  ).toBeVisible({ timeout: 7000 });
});
