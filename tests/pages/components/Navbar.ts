import type { Locator, Page } from '@playwright/test';

export class Navbar {
  readonly root: Locator;
  readonly logoLink: Locator;
  /** Hamburger icon, only rendered for screens narrower than 640px. */
  readonly menuToggle: Locator;
  /** Drop-down list opened by the hamburger icon. */
  readonly mobileMenu: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByRole('navigation');
    this.logoLink = this.root.getByRole('link', { name: /Moussa/ });
    this.menuToggle = this.root.getByRole('button', { name: /menu/i });
    this.mobileMenu = this.root.locator('#mobile-menu');
  }

  /** A navigation link. Hidden links are ignored, so this finds whichever menu is showing. */
  link(title: string): Locator {
    return this.root.getByRole('link', { name: title, exact: true });
  }

  /** The <li> around a link: it carries the "active" highlight colour. */
  linkItem(title: string): Locator {
    // The `has` locator is searched inside each <li>, so it must not start from the <nav>.
    return this.root
      .getByRole('listitem')
      .filter({ has: this.page.getByRole('link', { name: title, exact: true }) });
  }

  async openMobileMenu(): Promise<void> {
    await this.menuToggle.click();
  }
}
