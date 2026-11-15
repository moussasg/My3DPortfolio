import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures';

test('page has no accessibility violations (WCAG 2.1 AA)', async ({ page }) => {
  test.skip(test.info().project.name !== 'chromium', 'One browser is enough for the accessibility scan');

  await page.goto('/');

  // axe-core checks the page against the WCAG rules (contrast, labels, alt text...).
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .exclude('canvas') // the 3D scenes
    .analyze();

  expect(results.violations.map(violation => violation.id)).toEqual([]);
});
