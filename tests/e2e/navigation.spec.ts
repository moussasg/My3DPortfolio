import { test, expect } from '../fixtures/test';
import { navLinks } from '../data/portfolio';

const WHITE = 'rgb(255, 255, 255)';
const SECONDARY = 'rgb(170, 166, 195)'; // tailwind `text-secondary` (#aaa6c3)
const PRIMARY_BG = 'rgb(5, 8, 22)'; // tailwind `bg-primary` (#050816)

test.describe('Desktop navigation', () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
  });

  // Includes "Projects", which had no anchor and no navbar entry before BUG-13 was fixed.
  for (const { title, sectionId, heading } of navLinks) {
    test(`"${title}" link scrolls to the ${heading} section`, { tag: '@smoke' }, async ({ portfolio, page }) => {
      await portfolio.navbar.link(title).click();

      await expect(page).toHaveURL(new RegExp(`#${sectionId}$`));
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeInViewport();
    });
  }

  test('clicked link is highlighted, the others are not', async ({ portfolio }) => {
    await portfolio.navbar.link('Contact').click();

    await expect(portfolio.navbar.linkItem('Contact')).toHaveCSS('color', WHITE);
    for (const other of ['About', 'Work', 'Projects']) {
      await expect(portfolio.navbar.linkItem(other)).toHaveCSS('color', SECONDARY);
    }
  });

  test('navbar background turns solid after scrolling', async ({ portfolio }) => {
    await expect(portfolio.navbar.root).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');

    await portfolio.scrollTo(500);

    await expect(portfolio.navbar.root).toHaveCSS('background-color', PRIMARY_BG);
  });

  test('logo link brings the visitor back to the top', async ({ portfolio, page }) => {
    await portfolio.scrollTo(2000);

    await portfolio.navbar.logoLink.click();

    await expect.poll(() => portfolio.scrollY()).toBe(0);
    await expect(page).toHaveURL(/\/$/);
  });

  test('"Scroll Down" indicator jumps to the About section', async ({ portfolio, page }) => {
    await portfolio.scrollDownLink.click();

    await expect(page).toHaveURL(/#about$/);
    await expect(page.getByRole('heading', { name: 'Overview.' })).toBeInViewport();
  });

  test('"To Top" button appears after scrolling and returns to the top', async ({ portfolio }) => {
    await expect(portfolio.scrollToTopButton).toBeHidden();

    await portfolio.scrollTo(1500);
    await expect(portfolio.scrollToTopButton).toBeVisible();

    await portfolio.scrollToTopButton.click();
    await expect.poll(() => portfolio.scrollY()).toBe(0);
    await expect(portfolio.scrollToTopButton).toBeHidden();
  });
});
