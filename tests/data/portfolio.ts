/**
 * Expected content of the portfolio.
 *
 * This file is the "specification" the tests check the site against. It is kept
 * separate from src/constants on purpose: if someone accidentally deletes a
 * project or breaks a link in the app, the tests will notice.
 */

export const PRODUCTION_URL = 'https://moussasg.vercel.app/';

export const PAGE_TITLE = 'Moussa Souag | Junior QA Automation Engineer';

/** Facts that must match the CV (public/Moussa_Souag_Junior_QA_Automation_CV.pdf). */
export const cvFacts = {
  role: 'Junior QA Automation Engineer',
  experience: '1.5+ years',
  defects: '5,000+',
  location: 'Algiers, Algeria',
} as const;

export const navLinks = [
  { title: 'About', sectionId: 'about', heading: 'Overview.' },
  { title: 'Work', sectionId: 'work', heading: 'Work Experience.' },
  { title: 'Projects', sectionId: 'projects', heading: 'Projects.' },
  { title: 'Contact', sectionId: 'contact', heading: 'Contact.' },
] as const;

export const sectionHeadings = [
  'Overview.',
  'Work Experience.',
  'Technical Skills',
  'Projects.',
  'Education & Certifications.',
  'Contact.',
] as const;

export const services = ['Test Automation', 'Manual & Exploratory Testing', 'Front-End Development'] as const;

export const experiences = [
  { title: 'QA Engineer (Manual + Automation)', company: 'Blinx — UAE', link: 'https://blinx.com' },
  { title: 'SEO Specialist', company: 'Blinx — UAE', link: 'https://blinx.com' },
  { title: 'Frontend Developer', company: 'Avidhilda — Dubai, UAE', link: 'https://ucfashion.vercel.app' },
  {
    title: 'Data Quality Assurance',
    company: 'Well Test Operations (Oil & Gas) — Algeria',
    link: 'https://www.halliburton.com/',
  },
] as const;

export const skills = [
  'Playwright',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'REST API',
  'Postman',
  'Git',
  'GitHub Actions',
  'Docker',
  'Jira',
  'SQL',
  'React',
  'Next.js',
  'HTML 5',
  'CSS 3',
  'Katalon',
] as const;

export const skillGroups = ['Test Automation', 'CI/CD & DevOps', 'Manual Testing & QA', 'API, Data & Web Stack'] as const;

export const education = [
  "Master's Degree in Geology of Sedimentary Basins",
  'Full-Stack JavaScript Development Bootcamp',
] as const;

export const certifications = [
  'Build Your First End-to-End Test with Playwright',
  'Full-Stack Development with React & Next.js 14',
  'JavaScript and Data Structures',
] as const;

export const languages = ['Arabic', 'English', 'French'] as const;

export const qaProjects = [
  {
    name: 'Portfolio Test Suite',
    url: 'https://github.com/moussasg/My3DPortfolio',
    tags: ['Playwright', 'axe-core', 'GitHub Actions', 'Bug Reports'],
  },
] as const;

export const CV_PATH = '/Moussa_Souag_Junior_QA_Automation_CV.pdf';

export const projects = [
  { name: 'First Digital Storytelling Hub in MENA', url: 'https://blinx.com' },
  { name: 'Artificial intelligence', url: 'https://twentyoneia.vercel.app' },
  { name: 'Universal Couture', url: 'https://ucfashion.vercel.app' },
  { name: 'Oil Trading', url: 'https://oiltrading.vercel.app' },
  { name: 'DAMAC UAE', url: 'https://real-estate-dm51ghx5p-moussasg.vercel.app/' },
  { name: 'GogoVillage', url: 'https://gogovillage.ae' },
  { name: 'Magazine', url: 'https://mymagazine.vercel.app/' },
] as const;

export const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/moussasg' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/moussasouag' },
] as const;

/** Messages shown by the contact form through window.alert(). */
export const contactAlerts = {
  missingFields: 'Please fill in all the fields before submitting.',
  success: 'Thank you. I will get back to you as soon as possible.',
  failure: 'Something went wrong.',
} as const;

export const validContactMessage = {
  name: 'Jane Recruiter',
  email: 'jane.recruiter@example.com',
  message: 'Hi Moussa, we would like to invite you to an interview.',
} as const;
