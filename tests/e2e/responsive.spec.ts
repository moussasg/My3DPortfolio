import { test, expect } from '../fixtures';

// These run on every browser and phone in playwright.config.ts, so each check
// is repeated on small, medium and large screens.
test.describe('Responsive layout', () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
  });

  test('page does not scroll sideways', async ({ page }) => {
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const screenWidth = page.viewportSize()!.width;

    expect(pageWidth).toBeLessThanOrEqual(screenWidth);
  });

  test('name and "Download CV" are visible on the first screen', async ({ portfolio }) => {
    await expect(portfolio.heroHeading).toBeInViewport();
    await expect(portfolio.downloadCvButton).toBeInViewport();
  });
});
