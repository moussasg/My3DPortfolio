import type { Locator, Page } from '@playwright/test';

/**
 * Page Object Model (POM) for the portfolio.
 *
 * All locators live here, so the tests read like plain steps. If the website
 * changes, only this file needs updating, not every test.
 */
export class PortfolioPage {
  readonly page: Page;

  // Hero (first screen)
  readonly heroHeading: Locator;
  readonly downloadCvButton: Locator;

  // Navigation
  readonly menuButton: Locator; // hamburger button, phones only
  readonly mobileMenu: Locator;

  // Contact form
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heroHeading = page.getByRole('heading', { name: "Hi, I'm Moussa" });
    this.downloadCvButton = page.getByRole('link', { name: 'Download CV' }).first();

    this.menuButton = page.getByRole('button', { name: 'Open menu' });
    this.mobileMenu = page.locator('#mobile-menu');

    this.nameInput = page.getByLabel('Your Name');
    this.emailInput = page.getByLabel('Your Email');
    this.messageInput = page.getByLabel('Your Message');
    this.sendButton = page.getByRole('button', { name: 'Send' });
    this.successMessage = page.getByRole('status');
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/');
  }

  /** A link in the navbar, for example "About" or "Contact". */
  navLink(name: string): Locator {
    return this.page.getByRole('navigation').getByRole('link', { name, exact: true });
  }

  /** A section title, for example "Overview." or "Contact.". */
  sectionHeading(name: string): Locator {
    return this.page.getByRole('heading', { name, exact: true });
  }

  async fillContactForm(name: string, email: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }
}
