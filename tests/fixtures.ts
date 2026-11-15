import { test as base, expect } from '@playwright/test';
import { PortfolioPage } from './pages/PortfolioPage';

/**
 * Our own `test`: every spec imports it from here instead of '@playwright/test'.
 * It gives each test a ready-to-use `portfolio` page object, and before each test it:
 *  - blocks analytics, so test runs never count as real visits,
 *  - blocks the heavy 3D model files, so tests are fast (the page works without them).
 */
export const test = base.extend<{ portfolio: PortfolioPage }>({
  page: async ({ page }, use) => {
    await page.route(/googletagmanager\.com|google-analytics\.com|\/_vercel\//, route => route.abort());
    await page.route(/\.gltf$/, route => route.abort());
    await use(page); // the test runs here
    // After the test: remove all routes so closing the page never waits on them.
    await page.unrouteAll({ behavior: 'ignoreErrors' });
  },

  portfolio: async ({ page }, use) => {
    await use(new PortfolioPage(page));
  },
});

export { expect };
