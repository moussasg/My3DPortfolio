import { test, expect } from '../fixtures/test';
import { PAGE_TITLE, sectionHeadings } from '../data/portfolio';

test.describe('Smoke', { tag: '@smoke' }, () => {
  // The smoke tests load the page as a real visitor would, 3D scene included.
  test.use({ webgl: true });

  test('home page loads with the expected title and hero', async ({ portfolio, page }) => {
    await portfolio.goto();

    await expect(page).toHaveTitle(PAGE_TITLE);
    await expect(portfolio.heroHeading).toBeVisible();
    await expect(portfolio.heroSection).toContainText('Moussa');
    await expect(portfolio.heroSection).toContainText('QA Automation Engineer');
  });

  test('every main section is rendered', async ({ portfolio, page }) => {
    await portfolio.goto();

    for (const heading of sectionHeadings) {
      await expect(page.getByRole('heading', { name: heading, exact: true }), `section "${heading}"`).toBeVisible();
    }
  });

  test('page loads without JavaScript errors', async ({ portfolio, page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await portfolio.goto();
    await portfolio.scrollThroughPage();

    expect(errors).toEqual([]);
  });

  test('3D hero scene is mounted on desktop', async ({ portfolio }) => {
    await portfolio.goto();

    await expect(portfolio.heroSection.locator('canvas')).toBeVisible();
  });
});
