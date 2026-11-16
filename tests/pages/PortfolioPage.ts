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
  readonly pressSourceLink: Locator; // "Verified by Campaign Middle East" link after the 6 billion views claim

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
  readonly openEmailAppLink: Locator; // link shown after "Send": opens the visitor's email app

  constructor(page: Page) {
    this.page = page;

    this.heroHeading = page.getByRole('heading', { name: "Hi, I'm Moussa" });
    this.downloadCvButton = page.getByRole('link', { name: 'Download CV' }).first();
    this.pressSourceLink = page.getByRole('link', { name: 'Verified by Campaign Middle East' });

    this.menuButton = page.getByRole('button', { name: 'Open menu' });
    this.mobileMenu = page.locator('#mobile-menu');

    this.nameInput = page.getByLabel('Your Name');
    this.emailInput = page.getByLabel('Your Email');
    this.messageInput = page.getByLabel('Your Message');
    this.sendButton = page.getByRole('button', { name: 'Send' });
    this.successMessage = page.getByRole('status');
    this.errorMessage = page.getByRole('alert');
    this.openEmailAppLink = page.getByRole('link', { name: 'Click here to send it from your email app' });
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
