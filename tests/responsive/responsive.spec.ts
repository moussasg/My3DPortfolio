import type { Page } from '@playwright/test';
import { test, expect } from '../fixtures/test';
import type { PortfolioPage } from '../pages/PortfolioPage';

/**
 * Layout checks that must hold on every screen: phones, tablets and desktops.
 * They run in every browser and device project (see playwright.config.ts).
 */

/** Visible content elements whose box sticks out of the screen horizontally. */
async function elementsOutsideViewport(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const selectors = 'h1, h2, h3, p, li, img, a, button, input, textarea, dt, dd';
    return [...document.querySelectorAll<HTMLElement>(selectors)]
      .filter(el => !el.closest('canvas, [aria-hidden="true"]'))
      .filter(el => {
        const box = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        if (box.width === 0 || box.height === 0 || style.visibility === 'hidden') return false;
        return box.left < -1 || box.right > width + 1;
      })
      .map(el => `<${el.tagName.toLowerCase()}> "${(el.textContent ?? el.getAttribute('alt') ?? '').trim().slice(0, 40)}"`);
  });
}

async function expectNavigationReachable(portfolio: PortfolioPage) {
  const { navbar } = portfolio;
  if (await navbar.menuToggle.isVisible()) {
    await navbar.openMobileMenu();
    await expect(navbar.mobileMenu).toBeVisible();
  }
  for (const title of ['About', 'Work', 'Projects', 'Contact']) {
    await expect(navbar.link(title), `"${title}" link`).toBeVisible();
  }
}

test.describe('Responsive layout', { tag: '@responsive' }, () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
  });

  test('page never scrolls horizontally', async ({ portfolio, page }) => {
    await portfolio.scrollThroughPage();

    const { pageWidth, viewportWidth } = await page.evaluate(() => ({
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(pageWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test('no text, image or button sticks out of the screen', async ({ portfolio, page }) => {
    await portfolio.scrollThroughPage();

    // Polled: some sections slide in from the side when they scroll into view.
    await expect.poll(() => elementsOutsideViewport(page)).toEqual([]);
  });

  test('every section can be reached from the navigation', async ({ portfolio }) => {
    await expectNavigationReachable(portfolio);
  });

  test('name, role and "Download CV" are visible on the first screen', async ({ portfolio }) => {
    await expect(portfolio.heroHeading).toBeInViewport();
    await expect(portfolio.heroCvButton).toBeInViewport();
  });

  test('hero buttons do not overlap the "Scroll Down" hint', async ({ portfolio }) => {
    const buttons = await portfolio.viewQaProjectButton.boundingBox();
    const hint = await portfolio.scrollDownLink.boundingBox();

    expect(buttons).not.toBeNull();
    expect(hint).not.toBeNull();
    expect(buttons!.y + buttons!.height, 'buttons must end above the hint').toBeLessThanOrEqual(hint!.y);
  });

  test('contact form fits the screen and can be filled in', async ({ portfolio }) => {
    const { contactForm } = portfolio;
    await contactForm.form.scrollIntoViewIfNeeded();

    await contactForm.fill({ name: 'Jane', email: 'jane@example.com', message: 'Hello' });

    await expect(contactForm.messageInput).toHaveValue('Hello');
    await expect(contactForm.submitButton).toBeInViewport();
  });
});

/** Common screen widths, from the smallest phones to large desktop monitors (Chromium only). */
const SWEEP_WIDTHS = [320, 360, 375, 414, 640, 768, 1024, 1280, 1440, 1920];

test.describe('Viewport sweep', { tag: ['@responsive', '@sweep'] }, () => {
  for (const width of SWEEP_WIDTHS) {
    test.describe(`${width}px wide`, () => {
      test.use({ viewport: { width, height: 800 } });

      test(`layout holds at ${width}px`, async ({ portfolio, page }) => {
        await portfolio.goto();
        await expect(portfolio.heroCvButton).toBeInViewport();
        await expectNavigationReachable(portfolio);

        await portfolio.scrollThroughPage();
        await expect.poll(() => elementsOutsideViewport(page)).toEqual([]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      });
    });
  }
});
