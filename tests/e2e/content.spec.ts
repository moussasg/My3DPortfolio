import { test, expect } from '../fixtures/test';
import {
  certifications,
  CV_PATH,
  cvFacts,
  education,
  experiences,
  languages,
  projects,
  qaProjects,
  services,
  skillGroups,
  skills,
} from '../data/portfolio';

test.describe('Page content', () => {
  test.beforeEach(async ({ portfolio }) => {
    await portfolio.goto();
  });

  test('hero states the same role, experience and location as the CV', { tag: '@smoke' }, async ({ portfolio }) => {
    for (const fact of Object.values(cvFacts)) {
      await expect(portfolio.heroSection, `hero should mention "${fact}"`).toContainText(fact);
    }
  });

  test('"View QA Project" button leads to the Projects section', async ({ portfolio, page }) => {
    await portfolio.viewQaProjectButton.click();

    await expect(page).toHaveURL(/#projects$/);
    await expect(portfolio.projectsSection.getByRole('heading', { name: 'Projects.' })).toBeInViewport();
  });

  test('About section lists every service', async ({ portfolio }) => {
    for (const service of services) {
      await expect(portfolio.aboutSection.getByRole('heading', { name: service })).toBeVisible();
    }
  });

  test('Experience timeline shows every position with its company', async ({ portfolio }) => {
    await portfolio.revealExperienceTimeline();

    for (const { title, company } of experiences) {
      await expect(portfolio.experienceSection.getByRole('heading', { name: title })).toBeVisible();
      await expect(portfolio.experienceSection.getByText(company, { exact: true }).first()).toBeVisible();
    }
  });

  test('company logos link to the company websites', async ({ portfolio }) => {
    await portfolio.revealExperienceTimeline();

    for (const { company, link } of experiences) {
      const logoLink = portfolio.experienceSection.getByRole('link', { name: company }).first();
      await expect(logoLink).toHaveAttribute('href', link);
    }
  });

  // Regression test for BUG-12 ("Mars 2024").
  test('experience dates use a consistent "Mon YYYY - Mon YYYY|Present" format', async ({ portfolio }) => {
    await portfolio.revealExperienceTimeline();
    const dates = portfolio.experienceDates();

    await expect(dates).toHaveCount(experiences.length);
    for (const date of await dates.all()) {
      await expect(date).toHaveText(/^[A-Z][a-z]{2} \d{4} - ([A-Z][a-z]{2} \d{4}|Present)$/);
    }
  });

  test('Technical Skills section shows every skill with its logo', async ({ portfolio }) => {
    for (const skill of skills) {
      await expect(portfolio.skillsSection.getByRole('img', { name: skill, exact: true })).toBeVisible();
    }
  });

  test('Technical Skills section lists the skill groups from the CV', async ({ portfolio }) => {
    for (const group of skillGroups) {
      await expect(portfolio.skillsSection.getByText(group, { exact: true })).toBeVisible();
    }
  });

  test('Education section lists degrees, certifications and languages', async ({ portfolio }) => {
    for (const entry of [...education, ...certifications]) {
      await expect(portfolio.educationSection.getByText(entry, { exact: true })).toBeVisible();
    }
    for (const language of languages) {
      await expect(portfolio.educationSection.getByRole('listitem').filter({ hasText: language })).toBeVisible();
    }
  });

  for (const { name, url, tags } of qaProjects) {
    test(`QA project card "${name}" links to its repository and lists its tools`, async ({ portfolio }) => {
      const card = portfolio.qaProjectCard(name);

      await expect(card).toHaveAttribute('href', url);
      await expect(card).toHaveAttribute('target', '_blank');
      for (const tag of tags) {
        await expect(card.getByText(tag, { exact: true })).toBeVisible();
      }
      // Regression check for BUG-06 (a "\" left in the JSX was rendered on the card).
      await expect(card).not.toContainText('\\');
    });
  }

  test('"Download CV" buttons download the CV as a PDF', { tag: '@smoke' }, async ({ portfolio, page }) => {
    for (const button of [portfolio.heroCvButton, portfolio.contactCvButton]) {
      await expect(button).toHaveAttribute('href', CV_PATH);
    }

    const download = page.waitForEvent('download');
    await portfolio.heroCvButton.click();

    expect((await download).suggestedFilename()).toMatch(/\.pdf$/);
  });

  test('every front-end project is listed with a link to its website', async ({ portfolio }) => {
    for (const { name, url } of projects) {
      await expect(portfolio.projectsSection.getByRole('heading', { name, exact: true })).toBeVisible();
      await expect(portfolio.projectLink(name)).toHaveAttribute('href', url);
    }
  });

  test('all images load successfully', async ({ portfolio, page }) => {
    await portfolio.scrollThroughPage();

    const broken = await page.locator('img').evaluateAll(images =>
      images
        .map(img => img as HTMLImageElement)
        .filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => img.src),
    );
    expect(broken, 'images that failed to load').toEqual([]);
  });
});
