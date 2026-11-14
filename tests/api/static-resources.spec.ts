import { test, expect } from '@playwright/test';
import { CV_PATH, PRODUCTION_URL } from '../data/portfolio';

/**
 * HTTP-level checks with Playwright's `request` fixture: fast, no browser needed.
 */
test.describe('Static resources', { tag: '@api' }, () => {
  test('home page is served as HTML with the app root', async ({ request }) => {
    const response = await request.get('/');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
    expect(await response.text()).toContain('<div id="root">');
  });

  test('robots.txt allows crawling and points to the sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const body = await response.text();

    expect(response.status()).toBe(200);
    expect(body).toMatch(/User-agent: \*/);
    expect(body).toContain(`Sitemap: ${PRODUCTION_URL}sitemap.xml`);
  });

  test('sitemap.xml is valid and lists the production URL', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();

    expect(response.status()).toBe(200);
    expect(body).toMatch(/^<\?xml version="1\.0"/);
    expect(body).toContain('<urlset');
    expect(body).toContain(`<loc>${PRODUCTION_URL}</loc>`);
  });

  test('CV is served as a valid PDF', async ({ request }) => {
    const response = await request.get(CV_PATH);
    const body = await response.body();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect(body.subarray(0, 5).toString()).toBe('%PDF-'); // every PDF file starts with this signature
  });

  for (const model of ['desktop_pc', 'earth_hologram']) {
    test(`3D model "${model}" is a valid glTF and all its files exist`, async ({ request }) => {
      const response = await request.get(`/${model}/scene.gltf`);
      expect(response.status()).toBe(200);

      const gltf = await response.json();
      expect(gltf.asset.version).toBe('2.0');

      // A glTF file references its geometry (.bin) and textures by relative URI.
      const files: string[] = [
        ...(gltf.buffers ?? []).map((b: { uri: string }) => b.uri),
        ...(gltf.images ?? []).map((i: { uri: string }) => i.uri),
      ];
      expect(files.length).toBeGreaterThan(0);

      for (const file of files) {
        const fileResponse = await request.head(`/${model}/${encodeURI(file)}`);
        expect(fileResponse.status(), `${model}/${file}`).toBe(200);
      }
    });
  }
});
