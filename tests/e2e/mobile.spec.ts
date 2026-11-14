import { test, expect } from '../fixtures/test';
import { contactAlerts, validContactMessage } from '../data/portfolio';
import { isRemoteTarget } from '../data/test-env';
import { mockEmailJs } from '../utils/network';

/**
 * Phone-only behaviour. These tests run only in the phone-* projects
 * (iPhone SE to iPhone 15 Pro Max, Pixel 7, Galaxy S24; see playwright.config.ts).
 * Layout checks shared with tablets and desktops live in tests/responsive/.
 */
test.describe('Mobile layout', { tag: '@mobile' }, () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
  });

  test('desktop navigation links are replaced by the hamburger menu', async ({ portfolio }) => {
    await expect(portfolio.navbar.root.locator('ul').first()).toBeHidden();
    await expect(portfolio.navbar.menuToggle).toBeAttached();
  });

  // Regression test for BUG-01 (the long title squeezed the menu button to 0px width).
  test('visitor can navigate with the hamburger menu', async ({ portfolio, page }) => {
    const toggle = portfolio.navbar.menuToggle;
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await portfolio.navbar.openMobileMenu();
    await expect(portfolio.navbar.mobileMenu).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await portfolio.navbar.link('Contact').click();

    await expect(page).toHaveURL(/#contact$/);
    await expect(portfolio.navbar.mobileMenu).toBeHidden();
  });

  test('navbar title fits on the screen', async ({ portfolio }) => {
    const box = await portfolio.navbar.logoLink.boundingBox();
    const toggleBox = await portfolio.navbar.menuToggle.boundingBox();

    expect(box).not.toBeNull();
    expect(toggleBox).not.toBeNull();
    expect(box!.x + box!.width, 'title must end before the menu button').toBeLessThanOrEqual(toggleBox!.x);
  });

  test('heavy 3D computer model is not rendered on phones', async ({ portfolio }) => {
    await expect(portfolio.heroSection.locator('canvas')).toHaveCount(0);
  });

  test('contact form works on a phone', async ({ portfolio, page }) => {
    test.skip(isRemoteTarget, 'Needs the local test build with fake EmailJS keys');
    await mockEmailJs(page);
    await portfolio.contactForm.form.scrollIntoViewIfNeeded();
    await portfolio.contactForm.fill(validContactMessage);

    const alert = await portfolio.contactForm.submitAndCaptureAlert();

    expect(alert).toBe(contactAlerts.success);
  });
});
