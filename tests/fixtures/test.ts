import { test as base, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';
import { stub3DModels, stubAnalytics } from '../utils/network';
import { disableWebGL } from '../utils/webgl';

type Options = {
  /** Replace the heavy 3D models with an empty scene (default: true). */
  stub3D: boolean;
  /** Let the page use WebGL (default: false; see utils/webgl.ts for why). */
  webgl: boolean;
};

type Fixtures = {
  portfolio: PortfolioPage;
};

/**
 * Project-wide `test`. Every spec imports from here instead of '@playwright/test', so:
 *  - analytics are always stubbed (tests never pollute real traffic data),
 *  - WebGL is off unless a test opts in with `test.use({ webgl: true })`,
 *  - 3D models are stubbed unless a test opts out with `test.use({ stub3D: false })`,
 *  - the `portfolio` page object is ready to use.
 */
export const test = base.extend<Options & Fixtures>({
  stub3D: [true, { option: true }],
  webgl: [false, { option: true }],

  page: async ({ page, stub3D, webgl }, use) => {
    await stubAnalytics(page);
    if (!webgl) await disableWebGL(page);
    if (stub3D) await stub3DModels(page);
    await use(page);
  },

  portfolio: async ({ page }, use) => {
    await use(new PortfolioPage(page));
  },
});

export { expect };

/**
 * Marks a test as covering a known, reported bug (see docs/BUG_REPORTS.md).
 *
 * The test still asserts the *correct* behaviour and is expected to fail.
 * Once the bug is fixed the test passes, Playwright reports it as
 * "unexpectedly passed", and the marker should be removed.
 */
export function knownBug(id: string, summary: string): void {
  test.info().annotations.push({ type: 'known bug', description: `${id}: ${summary}` });
  test.fail();
}
