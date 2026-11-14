import { expect, type Locator, type Page } from '@playwright/test';
import { ContactForm } from './components/ContactForm';
import { Navbar } from './components/Navbar';

export class PortfolioPage {
  readonly navbar: Navbar;
  readonly contactForm: ContactForm;

  readonly heroSection: Locator;
  readonly heroHeading: Locator;
  readonly scrollDownLink: Locator;
  readonly scrollToTopButton: Locator;

  readonly aboutSection: Locator;
  readonly experienceSection: Locator;
  readonly skillsSection: Locator;
  readonly projectsSection: Locator;
  readonly contactSection: Locator;

  /** "Download CV" buttons in the hero and in the contact section. */
  readonly heroCvButton: Locator;
  readonly contactCvButton: Locator;
  readonly viewQaProjectButton: Locator;
  readonly educationSection: Locator;

  constructor(readonly page: Page) {
    this.navbar = new Navbar(page);
    this.contactForm = new ContactForm(page);

    this.heroHeading = page.getByRole('heading', { name: "Hi, I'm Moussa", level: 1 });
    this.heroSection = page.locator('section').filter({ has: this.heroHeading });
    this.scrollDownLink = page.getByRole('link', { name: 'Scroll Down' });
    this.scrollToTopButton = page.getByRole('button', { name: 'To Top' });

    this.aboutSection = page.locator('section#about');
    this.experienceSection = page.locator('section#work');
    this.skillsSection = page.locator('section#skills');
    this.projectsSection = page.locator('section#projects');
    this.contactSection = page.locator('section#contact');

    this.heroCvButton = this.heroSection.getByRole('link', { name: 'Download CV' });
    this.contactCvButton = this.contactSection.getByRole('link', { name: 'Download CV' });
    this.viewQaProjectButton = this.heroSection.getByRole('link', { name: 'View QA Project' });
    this.educationSection = page.locator('section#education');
  }

  /** A QA automation project card (the whole card is one link), found by its title. */
  qaProjectCard(title: string): Locator {
    return this.projectsSection
      .getByRole('link')
      .filter({ has: this.page.getByRole('heading', { name: title, exact: true }) });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.heroHeading).toBeVisible();
  }

  /** The "visit website" link that covers a project's picture. */
  projectLink(projectName: string): Locator {
    return this.projectsSection.getByRole('link', { name: `Visit the ${projectName} website` });
  }

  experienceDates(): Locator {
    return this.experienceSection.locator('.vertical-timeline-element-date');
  }

  /**
   * The timeline library keeps each entry hidden (visibility: hidden) until it
   * has been scrolled into view, so scroll through it before reading it.
   */
  async revealExperienceTimeline(): Promise<void> {
    // Scroll to each entry in turn: a fast scroll can skip one before the browser's
    // IntersectionObserver notices it (seen in Firefox).
    for (const entry of await this.experienceSection.locator('.vertical-timeline-element').all()) {
      await entry.scrollIntoViewIfNeeded();
      await expect(entry.locator('.vertical-timeline-element-content')).not.toHaveClass(/is-hidden/);
    }
  }

  /**
   * Scrolls through the whole page in steps. Sections fade in only once they
   * have been on screen, so this makes all of them render their final state.
   */
  async scrollThroughPage(): Promise<void> {
    const height = await this.page.evaluate(() => document.body.scrollHeight);
    const step = await this.page.evaluate(() => window.innerHeight);
    for (let y = 0; y <= height; y += step) {
      await this.page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), y);
      await this.page.waitForTimeout(100); // give scroll listeners and in-view animations a frame to react
    }
  }

  async scrollTo(y: number): Promise<void> {
    await this.page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), y);
  }

  async scrollY(): Promise<number> {
    return this.page.evaluate(() => Math.round(window.scrollY));
  }
}
