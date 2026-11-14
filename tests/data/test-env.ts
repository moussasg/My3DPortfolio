/**
 * Fake EmailJS credentials baked into the e2e build (see playwright.config.ts).
 * They let the contact form run end to end while every EmailJS request is
 * intercepted by the tests, so no real email is ever sent.
 */
export const TEST_EMAILJS = {
  serviceId: 'service_e2e_test',
  templateId: 'template_e2e_test',
  publicKey: 'public_key_e2e_test',
} as const;

/** True when the suite targets a deployed site (BASE_URL is set) instead of the local test build. */
export const isRemoteTarget = Boolean(process.env.BASE_URL);
