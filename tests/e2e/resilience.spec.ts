import { test, expect } from '../fixtures/test';

test.describe('Resilience', () => {
  test('page still works when analytics are blocked (e.g. by an ad blocker)', async ({ portfolio, page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    // Registered after the fixture's stub, so this route wins: analytics requests now fail.
    await page.route(/googletagmanager\.com|google-analytics\.com|\/_vercel\//, route => route.abort('blockedbyclient'));

    await portfolio.goto();

    await expect(portfolio.navbar.root).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  test('page content is complete when the browser has no WebGL', async ({ portfolio }) => {
    // The fixture turns WebGL off by default, as on old or locked-down devices.
    await portfolio.goto();

    await expect(portfolio.heroSection.locator('canvas')).toHaveCount(0);
    await expect(portfolio.heroCvButton).toBeVisible();
    await expect(portfolio.contactForm.form).toBeAttached();
  });

  test.describe('when a 3D model fails to load', () => {
    test.use({ stub3D: false, webgl: true });

    // Regression test for BUG-02 (a failed model request unmounted the whole app).
    test('the rest of the page is still shown', async ({ portfolio, page }) => {
      await page.route(/\.gltf$/, route => route.abort('failed'));
      const modelRequestFailed = page.waitForEvent('requestfailed', request => request.url().endsWith('.gltf'));

      await page.goto('/');
      await modelRequestFailed;
      // The page renders first and the failure arrives a moment later,
      // so give it time to take effect before checking that the content survived.
      await page.waitForTimeout(1_500);

      await expect(portfolio.heroHeading).toBeVisible();
      await expect(portfolio.contactForm.form).toBeAttached();
    });
  });
});
