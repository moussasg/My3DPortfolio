import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures';

test('page has no accessibility violations (WCAG 2.1 AA)', async ({ page }) => {
  test.skip(test.info().project.name !== 'chromium', 'One browser is enough for the accessibility scan');

  console.log('1. Opening the home page...');
  await page.goto('/');

  // axe-core checks the page against the WCAG rules (contrast, labels, alt text...).
  console.log('2. Running the axe-core accessibility scan...');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .exclude('canvas') // the 3D scenes
    .analyze();

  console.log(`3. Scan finished: ${results.passes.length} rules passed, ${results.violations.length} violations found`);
  for (const violation of results.violations) {
    console.log(`   - ${violation.id}: ${violation.help} (${violation.nodes.length} element(s))`);
  }

  expect(results.violations.map(violation => violation.id)).toEqual([]);
});
