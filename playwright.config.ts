import { defineConfig, devices } from '@playwright/test';
import { TEST_EMAILJS } from './tests/data/test-env';

/**
 * By default the suite builds the app and tests that local production build.
 * Set BASE_URL to run against a deployed site instead, for example:
 *   BASE_URL=https://moussasg.vercel.app npx playwright test --grep @smoke
 */
const PORT = 5050;
// 127.0.0.1 rather than "localhost": on some systems localhost resolves to IPv6 (::1) for the
// server but IPv4 for a browser, which causes random "connection refused" errors (seen in Firefox).
const HOST = '127.0.0.1';
const BASE_URL = process.env.BASE_URL ?? `http://${HOST}:${PORT}`;
const isCI = Boolean(process.env.CI);

// Which tests each kind of project runs:
//  - @mobile: phone-only behaviour (hamburger menu, no 3D model…), phones only
//  - @responsive: layout checks for every screen, all browsers and devices
//  - @sweep: the 320px–1920px viewport sweep, Chromium only (it sets its own viewport)
const BROWSER_TESTS = ['**/e2e/**/*.spec.ts', '**/responsive/**/*.spec.ts'];
const RESPONSIVE_TESTS = '**/responsive/**/*.spec.ts';

/** A phone: phone-only tests plus the shared layout checks. */
const phone = (name: string, device: string) => ({
  name: `phone-${name}`,
  use: { ...devices[device] },
  testMatch: BROWSER_TESTS,
  grep: /@mobile|@responsive/,
  grepInvert: /@sweep/,
});

/** A tablet: tablets get the desktop navbar, so only the shared layout checks apply. */
const tablet = (name: string, device: string) => ({
  name: `tablet-${name}`,
  use: { ...devices[device] },
  testMatch: RESPONSIVE_TESTS,
  grepInvert: /@sweep/,
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  timeout: 60_000,

  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
      // Hides the WebGL canvases and confetti, which never render identically twice.
      stylePath: './tests/visual/screenshot.css',
    },
  },

  reporter: isCI
    ? [['github'], ['list'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // No video: encoding a recording of a WebGL page on the CPU slows every test down.
    // The trace (recorded on retry) holds DOM snapshots, network and console instead.
    video: 'off',
    // Turns off smooth scrolling and confetti (the site honours prefers-reduced-motion),
    // so scrolls finish instantly and tests do not wait on animations.
    reducedMotion: 'reduce',
  },

  projects: [
    // HTTP-level checks: no browser needed.
    { name: 'api', testMatch: '**/api/**/*.spec.ts' },

    // Chromium runs everything: e2e, responsive (incl. the viewport sweep), a11y, SEO and visual tests.
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: '**/api/**',
      grepInvert: /@mobile/,
    },

    // Cross-browser: functional and layout tests on Firefox and WebKit (Safari's engine).
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: BROWSER_TESTS,
      grepInvert: /@mobile|@sweep/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: BROWSER_TESTS,
      grepInvert: /@mobile|@sweep/,
    },

    // Phones, from the smallest to the largest common screens (iOS = WebKit, Android = Chromium).
    phone('iphone-se', 'iPhone SE'), // 320×568
    phone('iphone-14', 'iPhone 14'), // 390×664
    phone('iphone-15-pro-max', 'iPhone 15 Pro Max'), // 430×739
    phone('pixel-7', 'Pixel 7'), // 412×839
    phone('galaxy-s24', 'Galaxy S24'), // 360×780

    // Tablets.
    tablet('ipad-mini', 'iPad Mini'), // 768×1024
    tablet('galaxy-tab-s9', 'Galaxy Tab S9'), // 640×1024
  ],

  // Build into a separate folder so the real `dist/` is never overwritten,
  // with fake EmailJS keys so the contact form can be tested end to end.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npx vite build --outDir dist-e2e --emptyOutDir && npx vite preview --outDir dist-e2e --host ${HOST} --port ${PORT} --strictPort`,
        url: BASE_URL,
        reuseExistingServer: !isCI,
        timeout: 300_000,
        env: {
          VITE_EMAILJS_SERVICE_ID: TEST_EMAILJS.serviceId,
          VITE_EMAILJS_TEMPLATE_ID: TEST_EMAILJS.templateId,
          VITE_EMAILJS_ACCESS_TOKEN: TEST_EMAILJS.publicKey,
        },
      },
});
