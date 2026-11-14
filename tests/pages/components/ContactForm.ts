import type { Locator, Page } from '@playwright/test';

export type ContactDetails = { name: string; email: string; message: string };

export class ContactForm {
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  /** Confirmation shown after a successful send (a polite live region). */
  readonly successMessage: Locator;
  /** Validation and sending errors (an assertive live region). */
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.form = page.locator('#contact form');
    this.nameInput = this.form.getByLabel('Your Name');
    this.emailInput = this.form.getByLabel('Your Email');
    this.messageInput = this.form.getByLabel('Your Message');
    // The button label changes while sending, so locate it by role only.
    this.submitButton = this.form.getByRole('button');
    this.successMessage = this.form.getByRole('status');
    this.errorMessage = this.form.getByRole('alert');
  }

  async fill({ name, email, message }: Partial<ContactDetails>): Promise<void> {
    if (name !== undefined) await this.nameInput.fill(name);
    if (email !== undefined) await this.emailInput.fill(email);
    if (message !== undefined) await this.messageInput.fill(message);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /** Whether the browser's built-in validation accepts the e-mail field. */
  async isEmailValid(): Promise<boolean> {
    return this.emailInput.evaluate(input => (input as HTMLInputElement).validity.valid);
  }
}
