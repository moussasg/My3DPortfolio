import type { Locator, Page } from '@playwright/test';

export type ContactDetails = { name: string; email: string; message: string };

export class ContactForm {
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.form = page.locator('#contact form');
    this.nameInput = this.form.getByLabel('Your Name');
    this.emailInput = this.form.getByLabel('Your Email');
    this.messageInput = this.form.getByLabel('Your Message');
    // The button label changes while sending, so locate it by role only.
    this.submitButton = this.form.getByRole('button');
  }

  async fill({ name, email, message }: Partial<ContactDetails>): Promise<void> {
    if (name !== undefined) await this.nameInput.fill(name);
    if (email !== undefined) await this.emailInput.fill(email);
    if (message !== undefined) await this.messageInput.fill(message);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Submits the form and returns the text of the next window.alert().
   * The alert is accepted automatically so the page is never left blocked.
   */
  async submitAndCaptureAlert(): Promise<string> {
    const alertText = new Promise<string>(resolve => {
      this.page.once('dialog', async dialog => {
        resolve(dialog.message());
        await dialog.accept();
      });
    });
    await this.submit();
    return alertText;
  }

  /** Whether the browser's built-in validation accepts the e-mail field. */
  async isEmailValid(): Promise<boolean> {
    return this.emailInput.evaluate(input => (input as HTMLInputElement).validity.valid);
  }
}
