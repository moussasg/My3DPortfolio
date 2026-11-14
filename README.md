# QA Automation Portfolio: Playwright tests for my 3D portfolio site

[![Playwright Tests](https://github.com/moussasg/My3DPortfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/moussasg/My3DPortfolio/actions/workflows/playwright.yml)

**Moussa Souag, Junior QA Automation Engineer** (Playwright · TypeScript · JavaScript)
🌐 [Live site](https://moussasg.vercel.app/) · 📄 [CV](https://moussasg.vercel.app/Moussa_Souag_Junior_QA_Automation_CV.pdf) · 💼 [LinkedIn](https://www.linkedin.com/in/moussasouag) · 🐞 [Bug reports](docs/BUG_REPORTS.md)

This repository contains my portfolio website **and the automated test suite that protects it**: 241 Playwright tests in TypeScript, run by GitHub Actions on every push and pull request across Chromium, Firefox, WebKit, 5 phones and 2 tablets.

**The suite found 13 real bugs in this site, and all of them are fixed.** Each is written up as a bug report in [docs/BUG_REPORTS.md](docs/BUG_REPORTS.md) (steps to reproduce, expected vs actual, root cause, fix), and each has a regression test so it cannot come back. Highlights: the mobile menu was invisible on phones, one failed 3D download blanked the whole site, and the contact form sent the wrong EmailJS template ID.

## 🧪 Automated QA Test Suite

### What is tested

| Type | What it checks | Where |
|---|---|---|
| **Smoke** | Page loads, title, all sections render, no JavaScript errors | `tests/e2e/smoke.spec.ts` |
| **Functional E2E** | Navbar links, active link highlight, scroll-to-top, page content against expected data | `tests/e2e/navigation.spec.ts`, `content.spec.ts` |
| **Forms** | Contact form validation (empty, whitespace, invalid emails), success and server-error paths, the exact request sent to EmailJS | `tests/e2e/contact-form.spec.ts` |
| **Cross-browser** | All functional and layout tests on Chromium, Firefox and WebKit (Safari engine) | `playwright.config.ts` |
| **Responsive** | No horizontal scroll, nothing outside the screen, navigation reachable, CV button on the first screen, no overlapping elements. Runs on 5 phones (iPhone SE to iPhone 15 Pro Max, Pixel 7, Galaxy S24), 2 tablets (iPad Mini, Galaxy Tab S9), and a 320–1920 px viewport sweep | `tests/responsive/responsive.spec.ts` |
| **Mobile** | Hamburger menu, title fits next to it, no heavy 3D model on phones, contact form on a phone | `tests/e2e/mobile.spec.ts` |
| **Content vs CV** | Role, years of experience, location, skills, education and projects match the CV | `tests/e2e/content.spec.ts` |
| **Network mocking** | EmailJS and analytics intercepted with `page.route()`, external sites stubbed | `tests/utils/network.ts` |
| **Resilience** | Site behaviour when analytics are blocked or a 3D model fails to load | `tests/e2e/resilience.spec.ts` |
| **Accessibility** | WCAG 2.1 AA scan with axe-core, keyboard-only navigation, form labels | `tests/a11y/accessibility.spec.ts` |
| **SEO** | Title and description length, single `<h1>`, `lang`, favicon, canonical URL, Open Graph link previews | `tests/seo/seo.spec.ts` |
| **API / HTTP** | `robots.txt`, `sitemap.xml`, the CV PDF, and every file referenced by the 3D models (no browser) | `tests/api/static-resources.spec.ts` |
| **Visual regression** | Screenshot comparison of key sections (run locally) | `tests/visual/visual.spec.ts` |

### Design choices

- **Page Object Model:** locators and actions live in `tests/pages/`, so specs read like user stories.
- **Custom fixtures** (`tests/fixtures/test.ts`): every test starts with analytics stubbed and a ready `portfolio` page object.
- **User-facing locators:** `getByRole`, `getByLabel` and `getByText` instead of CSS classes wherever the markup allows it.
- **Separate test data** (`tests/data/`): the expected content is the specification, independent of the app's own constants.
- **Bug workflow:** a newly found bug gets a test that asserts the *correct* behaviour, marked `knownBug()` (`test.fail()`). The pipeline stays green while the bug is open, Playwright flags the test as soon as the bug is fixed, and the marker is then removed, so the test becomes a regression test.
- **Hermetic runs:** the suite builds the app and tests it on `localhost`, with fake EmailJS keys. No real emails and no analytics traffic.
- **Fast and stable:** CI machines render WebGL on the CPU, so UI tests run with WebGL turned off. The site then skips its 3D scenes, which also proves its no-WebGL fallback works. The smoke and resilience tests keep real WebGL, and the API tests check that the real 3D model files are valid and complete. Tests also run with `prefers-reduced-motion`, which the site honours by turning off smooth scrolling and confetti.
- **No fixed waits for async UI:** "while sending" states are tested with a mock that holds the request open until the test releases it, not with timers.

### Run the tests

```bash
npm install
npx playwright install          # first time only: downloads the browsers

npm test                        # everything: all browsers, phones, tablets + API
npm run test:smoke              # quick smoke check
npm run test:chromium           # one browser, includes a11y, SEO and visual tests
npm run test:cross-browser      # Chromium, Firefox, WebKit
npm run test:mobile             # 5 phones and 2 tablets
npm run test:responsive         # layout checks on every browser and device
npm run test:a11y               # accessibility only
npm run test:api                # HTTP checks only
npm run test:visual             # screenshot comparison (update with test:visual:update)
npm run test:report             # open the last HTML report
```

Run the smoke tests against the **live site** instead of a local build:

```bash
BASE_URL=https://moussasg.vercel.app npm run test:prod          # macOS / Linux / Git Bash
$env:BASE_URL="https://moussasg.vercel.app"; npm run test:prod  # PowerShell
```

### Test project structure

```text
tests/
├── fixtures/test.ts          # custom test fixture + knownBug() helper
├── pages/                    # Page Object Model
│   ├── PortfolioPage.ts
│   └── components/           # Navbar, ContactForm
├── data/                     # expected content + test environment
├── utils/network.ts          # route mocks: EmailJS, analytics, 3D models
├── e2e/                      # functional, mobile and resilience tests
├── responsive/               # layout checks for every screen size
├── a11y/                     # axe-core accessibility tests
├── seo/                      # SEO checks
├── api/                      # HTTP-level checks (no browser)
└── visual/                   # screenshot tests
```

## 📌 About the Project

This project is a personal 3D portfolio designed to present my professional experience and projects through an interactive and modern web experience.

The portfolio combines 3D elements, animations, responsive layouts, and modern front-end technologies to create an engaging experience for visitors and recruiters.

## ✨ Key Features

- **Interactive 3D Experience:** Immersive 3D elements and visual interactions.
- **Responsive Design:** Layout adapted to desktop, tablet, and mobile screens.
- **Smooth Animations:** Animated transitions and interactive UI elements.
- **Project Showcase:** Presentation of selected professional and personal projects.
- **Professional Background:** Overview of experience, skills, and technical expertise.
- **Contact Section:** A dedicated section for professional inquiries.
- **Modern UI:** Clean design with interactive components.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | UI development |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Three.js | 3D graphics |
| React Three Fiber | 3D rendering in React |
| Spline | Interactive 3D elements |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| EmailJS | Email integration |
| Vercel | Deployment |

## 📂 Project Structure

```text
My3DPortfolio/
│
├── public/              # Static assets
│
├── src/
│   ├── assets/          # Images and visual assets
│   ├── components/      # Reusable UI components
│   ├── constants/       # Static data and configuration
│   ├── hoc/             # Higher-order components
│   ├── utils/           # Utility functions
│   ├── styles/          # Styling
│   └── App.tsx          # Main application
│
├── index.html
├── package.json
├── tailwind.config.cjs
├── tsconfig.json
└── vite.config.js
```

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/moussasg/My3DPortfolio.git
```

### 2. Navigate to the project directory

```bash
cd My3DPortfolio
```

### 3. Install dependencies

```bash
npm install
```

To make the contact form work locally, copy `.env.example` to `.env` and fill in your EmailJS service ID, template ID and public key.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local URL displayed in your terminal (usually `http://localhost:5173`).

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build production application |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run ts:check` | Check TypeScript types |

## 🚀 Deployment

The portfolio is deployed using **Vercel**.

Live website: https://moussasg.vercel.app/

## 👨‍💻 About Me

I'm Moussa, a **Junior QA Automation Engineer** looking for my next role (remote or on-site: UAE, Europe, worldwide). I have:

- **1.5+ years of hands-on QA** on a media platform with 5 billion views in its first year: 5,000+ verified defects across web, mobile and TV
- **Test automation** with Playwright and TypeScript: Page Object Model, API tests, multi-browser runs and GitHub Actions CI/CD
- **Front-end development** experience (React, Next.js), which helps me write stable locators and understand what I test

## 📫 Connect With Me

- **Portfolio:** https://moussasg.vercel.app/
- **CV:** https://moussasg.vercel.app/Moussa_Souag_Junior_QA_Automation_CV.pdf
- **GitHub:** https://github.com/moussasg
- **LinkedIn:** https://www.linkedin.com/in/moussasouag

---

<p align="center">
  ⭐ If you find this project interesting, feel free to explore the repository!
</p>
