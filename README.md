# QA Automation Portfolio: Playwright tests for my 3D portfolio site

[![Playwright Tests](https://github.com/moussasg/My3DPortfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/moussasg/My3DPortfolio/actions/workflows/playwright.yml)

**Moussa Souag, Junior QA Automation Engineer** (Playwright · TypeScript · JavaScript)
🌐 [Live site](https://moussasg.vercel.app/) · 📄 [CV](https://moussasg.vercel.app/Moussa_Souag_Junior_QA_Automation_CV.pdf) · 💼 [LinkedIn](https://www.linkedin.com/in/moussasouag) · 🐞 [Bug reports](docs/BUG_REPORTS.md)

This repository contains my portfolio website **and a Playwright test suite** (TypeScript) that checks it on desktop browsers and on iOS and Android phones. GitHub Actions runs the tests automatically.

**Testing found 16 real bugs in this site, and all of them are fixed.** Each one is written up in [docs/BUG_REPORTS.md](docs/BUG_REPORTS.md) with steps to reproduce, expected vs actual result, root cause and fix.

## 🧪 Automated Tests

### What is tested

| Test file | What it checks |
|---|---|
| `e2e/home.spec.ts` | Page title, my name and role, every section is on the page, "Download CV" link |
| `e2e/navigation.spec.ts` | Navbar links scroll to their sections (desktop), hamburger menu works (phones) |
| `e2e/contact-form.spec.ts` | Empty form shows an error; a valid message is sent and confirmed (checks the ready-to-send `mailto:` email link) |
| `e2e/responsive.spec.ts` | No sideways scrolling, name and "Download CV" visible on the first screen |
| `e2e/accessibility.spec.ts` | WCAG 2.1 AA scan with axe-core |
| `api/api.spec.ts` | HTTP checks without a browser: home page, CV PDF, 3D model files |

### Where it runs

| Desktop browsers | iOS phones (WebKit) | Android phones (Chromium) |
|---|---|---|
| Chromium, Microsoft Edge, Firefox, WebKit (Safari engine) | iPhone SE (small), iPhone 14 (medium), iPhone 15 Pro Max (large) | Galaxy S24 (small), Pixel 7 (medium), Pixel 9 Pro XL (large) |

The devices are listed in `playwright.config.ts`. Each one is a Playwright "project", so every test runs on every device.

### How it is built

- **Page Object Model:** all locators are in `tests/pages/PortfolioPage.ts`, so the tests read like plain steps.
- **Custom fixture** (`tests/fixtures.ts`): gives each test a ready `portfolio` page object, blocks analytics (test runs never count as visits) and blocks the heavy 3D files (faster tests).
- **User-facing locators:** `getByRole`, `getByLabel` and `getByText`, the way a visitor finds things.
- **Network blocking:** `page.route()` blocks analytics and the heavy 3D files, so tests are fast and never count as real visits.
- **CI:** `.github/workflows/playwright.yml` runs the whole suite on every pull request and push to `main`, and keeps the HTML report.

### Run the tests

```bash
npm install
npx playwright install          # first time only: downloads the browsers

npm test                        # everything: all browsers and phones + API
npm run test:ui                 # Playwright UI mode: watch and debug tests step by step
npm run test:headed             # see the browsers while the tests run
npm run test:chromium           # one browser only (fastest)
npm run test:desktop            # Chromium, Edge, Firefox, WebKit
npm run test:mobile             # the 6 phones
npm run test:api                # HTTP checks only
npm run test:report             # open the last HTML report
```

### Test project structure

```text
tests/
├── fixtures.ts               # custom `test`: page object + blocked analytics and 3D files
├── pages/
│   └── PortfolioPage.ts      # Page Object Model
├── e2e/                      # browser tests (desktop and phones)
└── api/                      # HTTP tests (no browser)
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
| `mailto:` link | Contact form opens the visitor's email app (no email service needed) |
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

The contact form needs no email service, key or `.env` file: after "Send", a link opens the visitor's own email app with the message ready to send.

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

I'm Moussa, a **Junior QA Automation Engineer** looking for my next role (remote & on-site roles: UAE, Europe, worldwide). I have:

- **1.5+ years of hands-on QA** on a media platform with 6 billion views in its first year: 5,000+ verified defects across web, mobile and TV
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
