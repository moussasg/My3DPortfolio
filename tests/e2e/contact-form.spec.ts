import { test, expect } from '../fixtures';

// The form sends messages to the FormSubmit service. Tests intercept this request,
// so no real email is ever sent.
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/**';

test.describe('Contact form', () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
    await portfolio.sendButton.scrollIntoViewIfNeeded();
  });

  test('empty form shows an error message', async ({ portfolio }) => {
    await portfolio.sendButton.click();

    await expect(portfolio.errorMessage).toHaveText('Please fill in all the fields before submitting.');
  });

  test('valid message is sent and a confirmation is shown', async ({ portfolio, page }) => {
    // Fake a successful answer from FormSubmit and remember what the page sent.
    const sentEmails: string[] = [];
    await page.route(FORMSUBMIT_URL, async route => {
      sentEmails.push(route.request().postData() ?? '');
      await route.fulfill({ json: { success: 'true' }, headers: { 'Access-Control-Allow-Origin': '*' } });
    });

    await portfolio.fillContactForm('Jane Recruiter', 'jane@example.com', 'Hello Moussa!');
    await portfolio.sendButton.click();

    await expect(portfolio.successMessage).toContainText('Your message has been sent');
    expect(sentEmails).toHaveLength(1);
    expect(sentEmails[0]).toContain('Hello Moussa!');
    await expect(portfolio.messageInput).toHaveValue(''); // the form is cleared
  });
});
