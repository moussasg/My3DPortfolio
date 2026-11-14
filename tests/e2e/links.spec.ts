import { test, expect } from '../fixtures/test';
import { projects, socialLinks } from '../data/portfolio';

test.describe('External links', () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
  });

  test('GitHub and LinkedIn icons point to the right profiles', async ({ portfolio }) => {
    for (const { href } of socialLinks) {
      await expect(portfolio.contactSection.locator(`a[href="${href}"]`)).toBeVisible();
    }
  });

  // Regression test for BUG-09 (target="blank" made every link reuse one named tab).
  test('external links open in a new tab with rel="noopener"', async ({ page }) => {
    const offenders = await page.locator('a[href^="http"]').evaluateAll(links =>
      links
        .filter(a => a.getAttribute('target') !== '_blank' || !/noopener/.test(a.getAttribute('rel') ?? ''))
        .map(a => `${a.getAttribute('href')} target=${a.getAttribute('target')} rel=${a.getAttribute('rel')}`),
    );
    expect(offenders).toEqual([]);
  });

  // Regression test for BUG-05 (the preview icon opened the project in two tabs).
  test('clicking a project picture opens the project in exactly one new tab', async ({ portfolio, context }) => {
    const project = projects[1];
    // Never leave the test environment: answer the external site with a stub page.
    await context.route(
      url => url.href.startsWith(project.url),
      route => route.fulfill({ contentType: 'text/html', body: '<h1>stub</h1>' }),
    );

    const newTab = context.waitForEvent('page');
    await portfolio.projectLink(project.name).click();
    const projectTab = await newTab;
    await projectTab.waitForLoadState();
    // We are checking that a *second* tab does NOT open, so we have to give it a moment to appear.
    await portfolio.page.waitForTimeout(1_500);

    expect(projectTab.url()).toContain(project.url);
    expect(context.pages()).toHaveLength(2); // the portfolio + one project tab
  });
});
