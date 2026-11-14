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

const desktop = [ // the desktop browsers (each one is a "project")
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } }, // Chrome
  { name: 'edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } }, // Microsoft Edge (installed on Windows and on GitHub's Ubuntu runners)
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } }, // Firefox
  { name: 'webkit', use: { ...devices['Desktop Safari'] } }, // Safari's engine
];

const mobile = [ // the phones (screen size, touch screen, user agent): iOS runs on WebKit, Android on Chromium
  { name: 'ios-small', use: { ...devices['iPhone SE'] } }, // 320×568
  { name: 'ios-medium', use: { ...devices['iPhone 14'] } }, // 390×664
  { name: 'ios-large', use: { ...devices['iPhone 15 Pro Max'] } }, // 430×739
  { name: 'android-small', use: { ...devices['Galaxy S24'] } }, // 360×780
  { name: 'android-medium', use: { ...devices['Pixel 7'] } }, // 412×839
  { name: 'android-large', use: { ...devices['Pixel 9 Pro XL'] } }, // 448×921
];

const tablets = [ // tablets get the desktop navbar
  { name: 'tablet-ios', use: { ...devices['iPad Mini'] } }, // 768×1024
  { name: 'tablet-android', use: { ...devices['Galaxy Tab S9'] } }, // 640×1024
];

// Which tests each kind of project runs, by tag:
//  - @mobile: phone-only behaviour (hamburger menu, no 3D model…), phones only
//  - @responsive: layout checks for every screen, all browsers and devices
//  - @sweep: the 320px–1920px viewport sweep, Chromium only (it sets its own viewport)
const BROWSER_TESTS = ['**/e2e/**/*.spec.ts', '**/responsive/**/*.spec.ts'];
const runs = {
  // Chromium runs everything except the phone-only tests: e2e, responsive (incl. the sweep), a11y, SEO, visual.
  everything: { testIgnore: '**/api/**', grepInvert: /@mobile/ },
  // The other desktop browsers: functional and layout tests.
  desktop: { testMatch: BROWSER_TESTS, grepInvert: /@mobile|@sweep/ },
  // Phones: phone-only tests plus the shared layout checks.
  phone: { testMatch: BROWSER_TESTS, grep: /@mobile|@responsive/, grepInvert: /@sweep/ },
  // Tablets: the shared layout checks.
  tablet: { testMatch: '**/responsive/**/*.spec.ts', grepInvert: /@sweep/ },
};

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
    { name: 'api', testMatch: '**/api/**/*.spec.ts' }, // HTTP-level checks: no browser needed
    ...desktop.map(browser => ({ ...browser, ...(browser.name === 'chromium' ? runs.everything : runs.desktop) })),
    ...mobile.map(phone => ({ ...phone, ...runs.phone })),
    ...tablets.map(tablet => ({ ...tablet, ...runs.tablet })),
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
