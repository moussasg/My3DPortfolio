import { test, expect } from '../fixtures';

test.describe('Home page', () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
  });

  test('page has the right title', async ({ page }) => {
    await expect(page).toHaveTitle('Moussa Souag | Junior QA Automation Engineer');
  });

  test('hero shows my name and role', async ({ portfolio, page }) => {
    await expect(portfolio.heroHeading).toBeVisible();
    await expect(page.getByText('Junior QA Automation Engineer · Playwright')).toBeVisible();
  });

  test('every section is on the page', async ({ portfolio }) => {
    const sections = [
      'Overview.',
      'Work Experience.',
      'Technical Skills',
      'Projects.',
      'Education & Certifications.',
      'Contact.',
    ];
    for (const section of sections) {
      await expect(portfolio.sectionHeading(section)).toBeVisible();
    }
  });

  test('"Download CV" button links to my CV', async ({ portfolio }) => {
    await expect(portfolio.downloadCvButton).toHaveAttribute('href', '/Moussa_Souag_Junior_QA_Automation_CV.pdf');
  });
});
