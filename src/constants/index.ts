import type {
  TNavLink,
  TService,
  TTechnology,
  TSkillGroup,
  TExperience,
  TProject,
  TQAProject,
  TEducation,
} from "../types";
import portfolioTestReport from "../assets/portfolio-test-report.png";

import {
  mobile,
  javascript,
  typescript,
  html,
  css,
  nodejs,
  Avidhilda,
  Halliburton,
  twentyoneia,
  oiltrading,
  ucfashion,
  gogowalpaper,
  magazine,
  playwright,
  git,
  githubactions,
  postman,
  damac,
  seo,
  Blinx,
  Blinxhome,
  swagger,
  katalon,
  cloud,
  docker,
  jira,
  mysql,
  reactjs,
  Nextjs,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

// Everything below mirrors the CV (public/Moussa_Souag_Junior_QA_Automation_CV.pdf).
// Update both together so recruiters see the same story in both places.

const services: TService[] = [
  {
    title: "Test Automation",
    icon: mobile,
  },
  {
    title: "Manual & Exploratory Testing",
    icon: cloud,
  },
  {
    title: "Front-End Development",
    icon: seo,
  },
];

const technologies: TTechnology[] = [
  { name: "Playwright", icon: playwright },
  { name: "TypeScript", icon: typescript },
  { name: "JavaScript", icon: javascript },
  { name: "Node.js", icon: nodejs },
  { name: "REST API", icon: swagger },
  { name: "Postman", icon: postman },
  { name: "Git", icon: git },
  { name: "GitHub Actions", icon: githubactions },
  { name: "Docker", icon: docker },
  { name: "Jira", icon: jira },
  { name: "SQL", icon: mysql },
  { name: "React", icon: reactjs },
  { name: "Next.js", icon: Nextjs },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "Katalon", icon: katalon },
];

/** The skill groups from the CV, shown as text under the logos (also helps keyword searches). */
const skillGroups: TSkillGroup[] = [
  {
    title: "Test Automation",
    skills: "Playwright (TypeScript/JS), Page Object Model, API testing with Playwright, cross-browser testing (Chromium, Firefox, WebKit, Edge), responsive & mobile emulation, role-based locators, flaky-test handling, Trace Viewer, HTML & Allure reports, Katalon Studio (basic)",
  },
  {
    title: "CI/CD & DevOps",
    skills: "GitHub Actions, automated pipeline triggers, regressions on pull requests, Docker (basic), Git, GitHub, Bitbucket, VS Code, Chrome DevTools",
  },
  {
    title: "Manual Testing & QA",
    skills: "Functional, regression, smoke & exploratory testing, cross-platform testing (web, mobile, TV), test case design & execution, defect lifecycle management, Jira, Confluence",
  },
  {
    title: "API, Data & Web Stack",
    skills: "Postman, REST APIs, SQL (basic), TypeScript, JavaScript (ES6+), Node.js, React, Next.js, HTML5, CSS3",
  },
];

const experiences: TExperience[] = [
  {
    title: "QA Engineer (Manual + Automation)",
    companyName: "Blinx — UAE",
    icon: Blinx,
    iconBg: "#383E56",
    date: "Apr 2025 - Present",
    points: [
      "Reported, tracked and verified fixes for 5,000+ defects across web, mobile and TV applications of a media platform that crossed 5 billion views in its first year.",
      "Designed and executed test cases for every release, covering functional, regression, smoke and exploratory testing.",
      "Validated end-to-end user flows across web, mobile and TV platforms to safeguard continuous release stability.",
      "Automated navigation, responsive UI and HTTP 200 checks using Playwright (TypeScript) with the Page Object Model, reducing repetitive manual regression work by 40%.",
      "Joined a technical meeting with TikTok in Dubai about support for the Blinx website: CDN, storage, video transcoding and recommendation engine.",
    ],
    link: "https://blinx.com",
  },
  {
    title: "SEO Specialist",
    companyName: "Blinx — UAE",
    icon: Blinx,
    iconBg: "#383E56",
    date: "May 2024 - Apr 2025",
    points: [
      "Built an AI-powered script that generated missing meta descriptions and keywords from article titles and bodies, pushing 20,000+ metadata entries live to improve search visibility.",
      "Applied technical and on-page SEO to optimize website performance and search indexability.",
    ],
    link: "https://blinx.com",
  },
  {
    title: "Frontend Developer",
    companyName: "Avidhilda — Dubai, UAE",
    icon: Avidhilda,
    iconBg: "#383E56",
    date: "Oct 2023 - Mar 2024",
    points: [
      "Built responsive, accessible web interfaces using JavaScript, TypeScript, React.js, Next.js, HTML and CSS with Git version control.",
      "Collaborated with product designers to translate UI/UX wireframes into production web applications.",
    ],
    link: "https://ucfashion.vercel.app",
  },
  {
    title: "Data Quality Assurance",
    companyName: "Well Test Operations (Oil & Gas) — Algeria",
    icon: Halliburton,
    iconBg: "#E6DEDD",
    date: "Feb 2023 - Aug 2023",
    points: [
      "Performed operational data validation, accuracy checks and quality control on-site for a major US multinational petroleum company.",
    ],
    link: "https://www.halliburton.com/",
  },
];

const education: TEducation[] = [
  {
    title: "Master's Degree in Geology of Sedimentary Basins",
    place: "USTHB, Algeria",
    detail: "Graduated 2022 · Grade 16/20 (UAE attested)",
  },
  {
    title: "Full-Stack JavaScript Development Bootcamp",
    place: "GOMYCODE, Algeria",
    detail: "6 months",
  },
];

const certifications: TEducation[] = [
  { title: "Build Your First End-to-End Test with Playwright", place: "Microsoft" },
  { title: "Full-Stack Development with React & Next.js 14", place: "Udemy", detail: "40.5 hours" },
  { title: "JavaScript and Data Structures", place: "freeCodeCamp", detail: "300 hours" },
];

const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "French", level: "Fluent" },
];


const qaProjects: TQAProject[] = [
  {
    title: "Portfolio Test Suite",
    description:
      "Automated tests for this website: E2E, cross-browser, iOS and Android phones, API and accessibility checks in GitHub Actions. Found and fixed 16 real bugs.",
    url: "https://github.com/moussasg/My3DPortfolio",
    image: portfolioTestReport,
    imageAlt: "Playwright test report of this website",
    tags: ["Playwright", "axe-core", "GitHub Actions", "Bug Reports"],
  },
];

const projects: TProject[] = [
  // those are my front end projects that I have done for my clients and for my personal projects
  {
    name: "First Digital Storytelling Hub in MENA",
    description:
      "Headquartered in Dubai Media City, blinx will target Gen Z and Millennials in the Middle East and beyond, on multiple platforms, soon.",
    tags: [
      {
        name: "Next.Js",
        color: "blue-text-gradient",
      },
      {
        name: "Node.Js",
        color: "green-text-gradient",
      },
      {
        name: "Flutter",
        color: "pink-text-gradient",
      },
      {
        name: "Java",
        color: "white",
      },
      {
        name: "PostgreSQL",
        color: "black",
      },
      {
        name: "Chakra UI",
        color: "purple",
      },
    ],
    image: Blinxhome,
    url: "https://blinx.com",
  },
  {
    name: "Artificial intelligence",
    description:
      "Designed by me, 21AI Research stands as a beacon of innovation in the field of Artificial Intelligence and Machine Learning, nestled in the vibrant business landscape of Dubai, UAE.",
    tags: [
      {
        name: "Next.Js",
        color: "blue-text-gradient",
      },
      {
        name: "PHP",
        color: "green-text-gradient",
      },
      {
        name: "FireBase",
        color: "pink-text-gradient",
      },
    ],
    image: twentyoneia,
    url: "https://twentyoneia.vercel.app",
  },
  {
    name: "Universal Couture",
    description:
      "Universal Couture is a premier exhibition organizing company based in the vibrant city of Dubai, at the crossroads of innovation and commerce. With an unwavering commitment to excellence and a track record of successful events",
    tags: [
      {
        name: "React.Js",
        color: "blue-text-gradient",
      },
      {
        name: "TypeScript",
        color: "green-text-gradient",
      },
      {
        name: "MySQL",
        color: "pink-text-gradient",
      },
    ],
    image: ucfashion,
    url: "https://ucfashion.vercel.app",
  },
  {
    name: "Oil Trading",
    description:
      "Empowering startups and emerging businesses, Al-Tafkeer al-Hadeth oil trading company fosters growth and enhances sales through contemporary knowledge and business strategies.",
    tags: [
      {
        name: "Next.Js",
        color: "blue-text-gradient",
      },
      {
        name: "Tailwind.css",
        color: "pink-text-gradient",
      },
    ],
    image: oiltrading,
    url: "https://oiltrading.vercel.app",
  },
  {
    name: "DAMAC UAE",
    description:
      "Designed and developed from scratch by me, from concept to final implementation. DAMAC Properties is a leading luxury real estate developer in the Middle East, with a track record of delivering some of the most iconic and innovative properties in the region. Founded in 2002, the company has quickly become a household name in the industry",
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "Bootstrap",
        color: "green-text-gradient",
      },//
    ], //
    image: damac,
    url: "https://real-estate-dm51ghx5p-moussasg.vercel.app/",
  },
  {
    name: "GogoVillage",
    description:
      "Gogo Village is a family-owned and operated business based in the UAE, creating fun, creative, nature-inspired play spaces with cleanliness, safety and affordability for crawlers to preteens alike.",
    tags: [
      {
        name: "Wix",
        color: "blue-text-gradient",
      },
    ],
    image: gogowalpaper,
    url: "https://gogovillage.ae",
  },
  {
    name: "Magazine",
    description:
      "Designed by me, developed from scratch by me, from concept to final implementation. An engaging platform for readers to explore diverse content, stay informed on current events, trends, and topics of interest, while fostering a sense of community and offering a visually appealing and user-friendly experience.",
    tags: [
      {
        name: "Turn.js",
        color: "blue-text-gradient",
      },//
      {
        name: "PHP",
        color: "green-text-gradient",
      },
    ],
    image: magazine,
    url: "https://mymagazine.vercel.app/", ////
  }
];

export {
  services,
  technologies,
  skillGroups,
  experiences,
  qaProjects,
  projects,
  education,
  certifications,
  languages,
};
