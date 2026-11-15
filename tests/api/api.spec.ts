import { test, expect } from '@playwright/test';

// API tests: plain HTTP requests with Playwright's `request` fixture. No browser, so they are very fast.
test.describe('API', () => {
  test('home page returns 200 and HTML', async ({ request }) => {
    const response = await request.get('/');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
  });

  test('CV is available as a PDF', async ({ request }) => {
    const response = await request.get('/Moussa_Souag_Junior_QA_Automation_CV.pdf');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
  });

  test('3D model files are available', async ({ request }) => {
    for (const model of ['/desktop_pc/scene.gltf', '/earth_hologram/scene.gltf']) {
      const response = await request.get(model);
      expect(response.status(), model).toBe(200);
    }
  });
});
