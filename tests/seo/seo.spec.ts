import { test, expect } from '../fixtures/test';
import { PAGE_TITLE, PRODUCTION_URL } from '../data/portfolio';

test.describe('SEO', { tag: '@seo' }, () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
  });

  test('title has a search-friendly length', async ({ page }) => {
    const title = await page.title();

    expect(title).toBe(PAGE_TITLE);
    expect(title.length).toBeLessThanOrEqual(60);
  });

  test('meta description is present and between 50 and 160 characters', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content');

    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThanOrEqual(50);
    expect(description!.length).toBeLessThanOrEqual(160);
  });

  test('document declares its language and a mobile viewport', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /width=device-width/);
  });

  test('favicon is served', async ({ page, request }) => {
    const href = await page.locator('link[rel="icon"]').getAttribute('href');
    expect(href).toBeTruthy();

    const response = await request.get(new URL(href!, page.url()).toString());
    expect(response.status()).toBe(200);
  });

  // Regression test for BUG-10 (three <h1> elements).
  test('page has exactly one <h1>, containing the name', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Moussa');
  });

  // Regression test for BUG-11 (index.html and config.ts had different titles).
  test('title in the HTML matches the title shown after JavaScript runs', async ({ page, request }) => {
    const html = await (await request.get('/')).text();
    const staticTitle = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];

    // Crawlers and link previews that do not run JavaScript only see the static title.
    expect(staticTitle).toBe(await page.title());
  });

  test('canonical URL and Open Graph tags are set for link previews', async ({ page, request }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', PRODUCTION_URL);
    for (const property of ['og:title', 'og:description', 'og:url', 'og:image']) {
      await expect(page.locator(`meta[property="${property}"]`), property).toHaveAttribute('content', /\S/);
    }

    // og:image is an absolute production URL; check that the same file exists in this build.
    const imageUrl = await page.locator('meta[property="og:image"]').getAttribute('content');
    const response = await request.get(new URL(imageUrl!).pathname);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });
});
