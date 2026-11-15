import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);
// 127.0.0.1 rather than "localhost": avoids random "connection refused" errors in Firefox.
const BASE_URL = 'http://127.0.0.1:5050';

const desktop = [ // the desktop browsers (each one is a "project")
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } }, // Chrome
  { name: 'edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } }, // Microsoft Edge
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } }, // Firefox
  { name: 'webkit', use: { ...devices['Desktop Safari'] } }, // Safari's engine
];

const mobile = [ // the phones (screen size, touch screen, user agent): iOS = WebKit, Android = Chromium
  { name: 'ios-small', use: { ...devices['iPhone SE'] } }, // 320×568
  { name: 'ios-medium', use: { ...devices['iPhone 14'] } }, // 390×664
  { name: 'ios-large', use: { ...devices['iPhone 15 Pro Max'] } }, // 430×739
  { name: 'android-small', use: { ...devices['Galaxy S24'] } }, // 360×780
  { name: 'android-medium', use: { ...devices['Pixel 7'] } }, // 412×839
  { name: 'android-large', use: { ...devices['Pixel 9 Pro XL'] } }, // 448×921
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI, // fail on CI if a test.only was left in the code
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  timeout: 60_000, // the site has 3D scenes, so give slow machines time
  expect: { timeout: 10_000 }, // each check can wait up to 10 s (default 5 s) for the page to settle

  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry', // a step-by-step recording when a test is retried
    screenshot: 'only-on-failure',
    reducedMotion: 'reduce', // no animations: scrolling is instant and tests do not wait on them
  },

  projects: [
    { name: 'api', testMatch: '**/api/*.spec.ts' }, // HTTP checks, no browser
    ...desktop.map(browser => ({ ...browser, testMatch: '**/e2e/*.spec.ts' })),
    ...mobile.map(phone => ({ ...phone, testMatch: '**/e2e/*.spec.ts' })),
  ],

  // Builds the site and starts it before the tests. The fake EmailJS keys let the
  // contact form run; the tests intercept the request, so no email is ever sent.
  webServer: {
    command: 'npx vite build --outDir dist-e2e --emptyOutDir && npx vite preview --outDir dist-e2e --host 127.0.0.1 --port 5050',
    url: BASE_URL,
    reuseExistingServer: !isCI,
    timeout: 300_000,
    env: {
      VITE_EMAILJS_SERVICE_ID: 'service_test',
      VITE_EMAILJS_TEMPLATE_ID: 'template_test',
      VITE_EMAILJS_ACCESS_TOKEN: 'public_key_test',
    },
  },
});
