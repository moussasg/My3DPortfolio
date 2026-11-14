import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures/test';

const WCAG_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

test.describe('Accessibility', { tag: '@a11y' }, () => {
  // A freshly loaded page: keyboard tests must start from the top of the document.
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
  });

  // Regression test for BUG-07 (images without alt text, icon links without a name).
  test('page has no WCAG 2.1 AA violations', async ({ portfolio, page }, testInfo) => {
    // Sections fade in when scrolled into view, so reveal them all before scanning.
    await portfolio.scrollThroughPage();
    await portfolio.scrollTo(0);

    const results = await new AxeBuilder({ page }).withTags(WCAG_AA).exclude('canvas').analyze();
    await testInfo.attach('axe-results.json', {
      body: JSON.stringify(results.violations, null, 2),
      contentType: 'application/json',
    });

    // A compact summary that reads well in the report if this ever fails.
    const violations = results.violations.map(v => ({
      rule: v.id,
      impact: v.impact,
      elements: v.nodes.map(n => n.target.join(' ')),
    }));
    expect(violations).toEqual([]);
  });

  test('navbar can be used with the keyboard only', async ({ portfolio, page }) => {
    const expectedOrder = [/Moussa/, /^About$/, /^Work$/, /^Projects$/, /^Contact$/];

    for (const name of expectedOrder) {
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toHaveAccessibleName(name);
    }

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#contact$/);
    await expect(portfolio.contactSection.getByRole('heading', { name: 'Contact.' })).toBeInViewport();
  });

  test('contact form fields have accessible labels', async ({ portfolio }) => {
    await expect(portfolio.contactForm.nameInput).toBeVisible();
    await expect(portfolio.contactForm.emailInput).toHaveAttribute('type', 'email');
    await expect(portfolio.contactForm.messageInput).toBeVisible();
  });

  // Regression test for BUG-08 ("To Top" was a clickable <div>).
  test('"To Top" button works with the keyboard', async ({ portfolio }) => {
    await portfolio.scrollTo(1500);

    await portfolio.scrollToTopButton.focus();
    await portfolio.page.keyboard.press('Enter');

    await expect.poll(() => portfolio.scrollY()).toBe(0);
  });
});
