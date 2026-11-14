import { test, expect } from '../fixtures/test';
import { contactMessages, validContactMessage } from '../data/portfolio';
import { isRemoteTarget, TEST_EMAILJS } from '../data/test-env';
import { mockEmailJs, mockPendingEmailJs } from '../utils/network';

test.describe('Contact form', () => {
  // Feedback must appear on the page, never as a blocking browser pop-up (window.alert).
  let popups: string[];

  test.beforeEach(async ({ portfolio, page }) => {
    popups = [];
    page.on('dialog', dialog => {
      popups.push(dialog.message());
      void dialog.dismiss();
    });
    await portfolio.goto();
    await portfolio.contactForm.form.scrollIntoViewIfNeeded();
  });

  test.afterEach(() => {
    expect(popups, 'browser pop-ups opened by the form').toEqual([]);
  });

  test.describe('validation', () => {
    test('empty form is rejected with a message and nothing is sent', async ({ portfolio, page }) => {
      const sent = await mockEmailJs(page);

      await portfolio.contactForm.submit();

      await expect(portfolio.contactForm.errorMessage).toHaveText(contactMessages.missingFields);
      expect(sent).toHaveLength(0);
    });

    test('form with one empty field is rejected', async ({ portfolio, page }) => {
      const sent = await mockEmailJs(page);
      await portfolio.contactForm.fill({ ...validContactMessage, message: '' });

      await portfolio.contactForm.submit();

      await expect(portfolio.contactForm.errorMessage).toHaveText(contactMessages.missingFields);
      expect(sent).toHaveLength(0);
    });

    test('whitespace-only fields count as empty', async ({ portfolio, page }) => {
      const sent = await mockEmailJs(page);
      await portfolio.contactForm.fill({ name: '   ', email: validContactMessage.email, message: '   ' });

      await portfolio.contactForm.submit();

      await expect(portfolio.contactForm.errorMessage).toHaveText(contactMessages.missingFields);
      expect(sent).toHaveLength(0);
    });

    test('error message disappears as soon as the visitor edits the form', async ({ portfolio }) => {
      await portfolio.contactForm.submit();
      await expect(portfolio.contactForm.errorMessage).toHaveText(contactMessages.missingFields);

      await portfolio.contactForm.fill({ name: 'Jane' });

      await expect(portfolio.contactForm.errorMessage).toBeEmpty();
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

      await portfolio.contactForm.submit();

      await expect(portfolio.contactForm.successMessage).toHaveText(contactMessages.success);
      await expect(portfolio.contactForm.errorMessage).toBeEmpty();
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

      await portfolio.contactForm.submit();
      await expect(portfolio.contactForm.successMessage).toHaveText(contactMessages.success);

      expect(sent[0]).toMatchObject({
        service_id: TEST_EMAILJS.serviceId,
        template_id: TEST_EMAILJS.templateId,
        user_id: TEST_EMAILJS.publicKey,
      });
    });

    test('server error shows a failure message and keeps the typed text', async ({ portfolio, page }) => {
      await mockEmailJs(page, { status: 400 });
      await portfolio.contactForm.fill(validContactMessage);

      await portfolio.contactForm.submit();

      await expect(portfolio.contactForm.errorMessage).toHaveText(contactMessages.failure);
      await expect(portfolio.contactForm.successMessage).toBeEmpty();
      await expect(portfolio.contactForm.messageInput).toHaveValue(validContactMessage.message);
      await expect(portfolio.contactForm.submitButton).toHaveText('Send');
    });

    // Regression test for BUG-04 (the button read "sent successfully" during the request).
    test('button shows a neutral, disabled "Sending..." state during the request', async ({ portfolio, page }) => {
      const emailJs = await mockPendingEmailJs(page);
      await portfolio.contactForm.fill(validContactMessage);

      await portfolio.contactForm.submit();

      // The request is still pending here, however slow the machine is.
      await expect(portfolio.contactForm.submitButton).toHaveText('Sending...');
      await expect(portfolio.contactForm.submitButton).toBeDisabled(); // prevents double submissions
      await expect(portfolio.contactForm.successMessage).toBeEmpty();

      emailJs.respond();

      await expect(portfolio.contactForm.successMessage).toHaveText(contactMessages.success);
      await expect(portfolio.contactForm.submitButton).toHaveText('Send');
      await expect(portfolio.contactForm.submitButton).toBeEnabled();
    });
  });
});
