import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Haider Nadeem/);
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=View My Work');
    await expect(page).toHaveURL(/.*projects/);
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Get In Touch');
    await expect(page).toHaveURL(/.*contact/);
  });
});

test.describe('Projects Flow', () => {
  test('should navigate to projects and open a project', async ({ page }) => {
    await page.goto('/projects');
    await expect(page).toHaveTitle(/Projects/);

    // Click on first project if available
    const firstProject = page.locator('article').first();
    if ((await firstProject.count()) > 0) {
      await firstProject.click();
      await expect(page).toHaveURL(/.*projects\/.*/);
    }
  });
});

test.describe('Contact Form', () => {
  test('should submit contact form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveTitle(/Contact/);

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');

    await page.click('button[type="submit"]');

    // Wait for success message
    await expect(page.locator('text=Message Sent!')).toBeVisible({
      timeout: 5000,
    });
  });
});
