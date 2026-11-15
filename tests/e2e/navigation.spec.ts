import { test, expect } from '../fixtures';

// Each navbar link and the section title it should scroll to.
const links = [
  { link: 'About', section: 'Overview.' },
  { link: 'Work', section: 'Work Experience.' },
  { link: 'Projects', section: 'Projects.' },
  { link: 'Contact', section: 'Contact.' },
];

test.describe('Navigation', () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
  });

  test('navbar links scroll to their sections', async ({ portfolio, isMobile }) => {
    test.skip(isMobile, 'Phones use the hamburger menu (next test)');

    for (const { link, section } of links) {
      await portfolio.navLink(link).click();
      await expect(portfolio.sectionHeading(section)).toBeInViewport();
    }
  });

  test('hamburger menu opens and its links work', async ({ portfolio, page, isMobile }) => {
    test.skip(!isMobile, 'Only phones have the hamburger menu');

    await portfolio.menuButton.click();
    await expect(portfolio.mobileMenu).toBeVisible();

    await portfolio.navLink('Contact').click();

    await expect(page).toHaveURL(/#contact$/);
    await expect(portfolio.sectionHeading('Contact.')).toBeInViewport();
  });
});
