import { test, expect } from '../fixtures/test';
import { contactAlerts, validContactMessage } from '../data/portfolio';
import { isRemoteTarget, TEST_EMAILJS } from '../data/test-env';
import { mockEmailJs, mockPendingEmailJs } from '../utils/network';

test.describe('Contact form', () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
    await portfolio.contactForm.form.scrollIntoViewIfNeeded();
  });

  test.describe('validation', () => {
    test('empty form is rejected with a message and nothing is sent', async ({ portfolio, page }) => {
      const sent = await mockEmailJs(page);

      const alert = await portfolio.contactForm.submitAndCaptureAlert();

      expect(alert).toBe(contactAlerts.missingFields);
      expect(sent).toHaveLength(0);
    });

    test('form with one empty field is rejected', async ({ portfolio, page }) => {
      const sent = await mockEmailJs(page);
      await portfolio.contactForm.fill({ ...validContactMessage, message: '' });

      const alert = await portfolio.contactForm.submitAndCaptureAlert();

      expect(alert).toBe(contactAlerts.missingFields);
      expect(sent).toHaveLength(0);
    });

    test('whitespace-only fields count as empty', async ({ portfolio, page }) => {
      const sent = await mockEmailJs(page);
      await portfolio.contactForm.fill({ name: '   ', email: validContactMessage.email, message: '   ' });

      const alert = await portfolio.contactForm.submitAndCaptureAlert();

      expect(alert).toBe(contactAlerts.missingFields);
      expect(sent).toHaveLength(0);
    });

    for (const email of ['not-an-email', 'jane@', '@example.com']) {
      test(`invalid email "${email}" is blocked by the browser`, async ({ portfolio, page }) => {
        const sent = await mockEmailJs(page);
        await portfolio.contactForm.fill({ ...validContactMessage, email });

        await portfolio.contactForm.submit();

        expect(await portfolio.contactForm.isEmailValid()).toBe(false);
        expect(sent).toHaveLength(0);
      });
    }
  });

  test.describe('sending', () => {
    test.skip(isRemoteTarget, 'Needs the local test build with fake EmailJS keys');

    test('valid message is sent and the form is reset', { tag: '@smoke' }, async ({ portfolio, page }) => {
      const sent = await mockEmailJs(page);
      await portfolio.contactForm.fill(validContactMessage);

      const alert = await portfolio.contactForm.submitAndCaptureAlert();

      expect(alert).toBe(contactAlerts.success);
      expect(sent).toHaveLength(1);
      expect(sent[0].template_params).toMatchObject({
        form_name: validContactMessage.name,
        from_email: validContactMessage.email,
        message: validContactMessage.message,
      });
      await expect(portfolio.contactForm.nameInput).toHaveValue('');
      await expect(portfolio.contactForm.emailInput).toHaveValue('');
      await expect(portfolio.contactForm.messageInput).toHaveValue('');
      await expect(portfolio.contactForm.submitButton).toHaveText('Send');
    });

    // Regression test for BUG-03 (the service ID was sent as the template ID).
    test('request uses the configured EmailJS service, template and key', async ({ portfolio, page }) => {
      const sent = await mockEmailJs(page);
      await portfolio.contactForm.fill(validContactMessage);

      await portfolio.contactForm.submitAndCaptureAlert();

      expect(sent[0]).toMatchObject({
        service_id: TEST_EMAILJS.serviceId,
        template_id: TEST_EMAILJS.templateId,
        user_id: TEST_EMAILJS.publicKey,
      });
    });

    test('server error shows a failure message and keeps the typed text', async ({ portfolio, page }) => {
      await mockEmailJs(page, { status: 400 });
      await portfolio.contactForm.fill(validContactMessage);

      const alert = await portfolio.contactForm.submitAndCaptureAlert();

      expect(alert).toBe(contactAlerts.failure);
      await expect(portfolio.contactForm.messageInput).toHaveValue(validContactMessage.message);
      await expect(portfolio.contactForm.submitButton).toHaveText('Send');
    });

    // Regression test for BUG-04 (the button read "sent successfully" during the request).
    test('button shows a neutral, disabled "Sending..." state during the request', async ({ portfolio, page }) => {
      const emailJs = await mockPendingEmailJs(page);
      await portfolio.contactForm.fill(validContactMessage);
      const alert = new Promise<string>(resolve =>
        page.once('dialog', async dialog => {
          resolve(dialog.message());
          await dialog.accept();
        }),
      );

      await portfolio.contactForm.submit();

      // The request is still pending here, however slow the machine is.
      await expect(portfolio.contactForm.submitButton).toHaveText('Sending...');
      await expect(portfolio.contactForm.submitButton).toBeDisabled(); // prevents double submissions

      emailJs.respond();

      expect(await alert).toBe(contactAlerts.success);
      await expect(portfolio.contactForm.submitButton).toHaveText('Send');
      await expect(portfolio.contactForm.submitButton).toBeEnabled();
    });
  });
});
