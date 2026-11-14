import type { Page } from '@playwright/test';

/** Third-party analytics scripts. Tests must never send fake visits to the real dashboards. */
const ANALYTICS_URL = /googletagmanager\.com|google-analytics\.com|\/_vercel\/(insights|speed-insights)\//;

export const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send';

/** The smallest valid glTF 2.0 file: a scene with no nodes. */
const EMPTY_GLTF = JSON.stringify({ asset: { version: '2.0' }, scene: 0, scenes: [{ nodes: [] }] });

/** Replies to analytics requests with an empty script so pages behave normally without tracking. */
export async function stubAnalytics(page: Page): Promise<void> {
  await page.route(ANALYTICS_URL, route =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }),
  );
}

/**
 * Replaces the 3D models with an empty scene.
 *
 * The desktop PC model is heavy, and CI machines render WebGL on the CPU, so
 * loading it makes every test slow. The 3D scene itself is covered by the API
 * tests (model files are valid and complete) and by the resilience tests.
 */
export async function stub3DModels(page: Page): Promise<void> {
  await page.route(/\.gltf$/, route =>
    route.fulfill({ status: 200, contentType: 'model/gltf+json', body: EMPTY_GLTF }),
  );
}

export type EmailJsPayload = {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: Record<string, string>;
};

const CORS_HEADERS = { 'Access-Control-Allow-Origin': '*' };

/**
 * Intercepts the EmailJS "send" call and answers it locally.
 * Returns the list of payloads the page tried to send, so tests can assert on them.
 */
export async function mockEmailJs(page: Page, { status = 200 }: { status?: number } = {}) {
  const sent: EmailJsPayload[] = [];

  await page.route(EMAILJS_SEND_URL, async route => {
    sent.push(route.request().postDataJSON() as EmailJsPayload);
    await route.fulfill({
      status,
      contentType: 'text/plain',
      headers: CORS_HEADERS,
      body: status === 200 ? 'OK' : 'Bad Request',
    });
  });

  return sent;
}

/**
 * Like mockEmailJs, but the request stays pending until the test calls `respond()`.
 * This makes "while sending" states testable without timing guesses (no fixed delays).
 */
export async function mockPendingEmailJs(page: Page) {
  let respond!: () => void;
  const responded = new Promise<void>(resolve => (respond = resolve));

  await page.route(EMAILJS_SEND_URL, async route => {
    await responded;
    await route.fulfill({ status: 200, contentType: 'text/plain', headers: CORS_HEADERS, body: 'OK' });
  });

  return { respond };
}
