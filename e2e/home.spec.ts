import { test, expect } from '@playwright/test';

test('User journey: home → projects → project → contact form', async ({
  page,
}) => {
  // Home: load and wait for hero text
  await page.goto('/');
  await expect(page).toHaveTitle(/Haider Nadeem/i);
  await expect(page.getByRole('heading', { name: /hi, i'm/i })).toBeVisible();

  // Navigate to Projects via main navigation
  await page.getByRole('link', { name: /^projects$/i }).click();
  await expect(page).toHaveURL(/\/projects/);

  // Open first project via modal "View Details" then go to detail page
  const firstCard = page.locator('article').first();
  await expect(firstCard).toBeVisible();
  await firstCard.getByRole('button', { name: /view details/i }).click();

  // In modal, click "View Full Details" to navigate to /projects/[slug]
  await page.getByRole('link', { name: /view full details/i }).click();
  await expect(page).toHaveURL(/\/projects\/.+/);

  // Navigate to Contact via header nav
  await page.getByRole('link', { name: /contact/i }).click();
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
