import { test, expect } from '../fixtures';

// The form uses no email service: after "Send", a link opens the visitor's email app
// with a ready-to-send email (a `mailto:` link). Tests check that link, so no email is ever sent.

test.describe('Contact form', () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
    await portfolio.sendButton.scrollIntoViewIfNeeded();
  });

  test('empty form shows an error message', async ({ portfolio }) => {
    await portfolio.sendButton.click();

    await expect(portfolio.errorMessage).toHaveText('Please fill in all the fields before submitting.');
  });

  test('valid message shows a confirmation and a ready-to-send email', async ({ portfolio }) => {
    await portfolio.fillContactForm('Jane Recruiter', 'jane@example.com', 'Hello Moussa!');
    await portfolio.sendButton.click();

    await expect(portfolio.successMessage).toContainText('Thank you! Your message is ready.');
    // The email link holds the visitor's message (spaces are written as %20 in a link).
    await expect(portfolio.openEmailAppLink).toHaveAttribute('href', /^mailto:.+Hello%20Moussa!/);
    await expect(portfolio.messageInput).toHaveValue(''); // the form is cleared
  });
});
