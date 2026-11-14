import { test, expect } from '../fixtures/test';

/**
 * Visual regression: compares sections against reviewed baseline screenshots.
 *
 * Fonts render differently on each OS, so baselines are stored per platform
 * (e.g. *-chromium-win32.png). They are skipped on CI, which runs on Linux.
 * Update them after an intended design change with: npm run test:visual:update
 */
// Capturing large sections while WebGL renders in the background is slow on CPU-only machines.
const SCREENSHOT_TIMEOUT = 30_000;

test.describe('Visual regression', { tag: '@visual' }, () => {
  test.skip(Boolean(process.env.CI), 'Screenshot baselines are OS-specific; run locally');

  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
    await portfolio.scrollThroughPage();
  });

  test('Technical Skills grid', async ({ portfolio }) => {
    await expect(portfolio.skillsSection).toHaveScreenshot('skills-section.png', { timeout: SCREENSHOT_TIMEOUT });
  });

  test('QA automation project card', async ({ portfolio }) => {
    await expect(portfolio.qaProjectCard('Portfolio Test Suite')).toHaveScreenshot('qa-project-card.png', {
      timeout: SCREENSHOT_TIMEOUT,
    });
  });

  test('contact form', async ({ portfolio }) => {
    await expect(portfolio.contactForm.form).toHaveScreenshot('contact-form.png', { timeout: SCREENSHOT_TIMEOUT });
  });
});
