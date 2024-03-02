import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TProject,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  Avidhilda,
  Halliburton,
  Freelancer,
  twentyoneia,
  oiltrading,
  ucfashion,
  avidhildaWeb,
  magazine,
  Nextjs,
  botstrap,
  express,
  damac
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
    id: "contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Front End Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },

  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  }, 
  {
    name: "Next.Js",
    icon: Nextjs,
  },
  {
    name: "Bootsrtap",
    icon: botstrap,
  },
  {
    name: "Express.Js",
    icon: express,
  },
];

const experiences: TExperience[] = [
  {
    title: "Data Aquisition operator, USA",
    companyName: "Halliburton - Leader Multinational Petroleum",
    icon: Halliburton,
    iconBg: "#E6DEDD",
    date: "2022-2023",
    points: [
      "Data Integration, Analysis and Database Management",
      "Problem Solving, Automation, Quality Control",
      "Real-time Updates, Data Validation",
      "Documentation Debugging, Data Security",
    ],
    link:"https://www.halliburton.com/",
  },
  {
    title: "Front End Developer , Dubai",
    companyName: "Avidhilda",
    icon: Avidhilda,
    iconBg: "#383E56",
    date: "2023 - 2024",
    points: [
      "Implementing Artificial Intelligence in website design",
      "Integrating Third-Party APIs for Enhanced Functionality",
      "Developing 3D Websites using Spline 3D and Three.js",
      "Participating in code reviews and providing constructive feedback to other developers.",
      "Customizing and Extending UI Components",
      "Designing and Developing Oil Trading Websites to Drive Business Success",
    ],
    link:"https://avidhilda.com",
  },
  {
    title: "Web Developer Freelancer",
    companyName: "Freelancer",
    icon: Freelancer,
    iconBg: "#383E56",
    date: "Present",
    points: [
      "Developed 35 diverse software projects (front-end and back-end).",
      "Created a dynamic full-stack website for Furnio Company.",
      "Collaborated on open-source projects.",
      "Designed and implemented UI/UX.",
    ],
    link:"https://www.freelancer.com",
  },
];


const projects: TProject[] = [
  {
    name: "Artificial intelligence",
    description:
      "21AI Research stands as a beacon of innovation in the field of Artificial Intelligence and Machine Learning, nestled in the vibrant business landscape of Dubai, UAE.",
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
    url: "https://www.twenty-one-ai.com",
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
    url: "https://ucfashionweek.com",
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
    url: "https://thoiltrading.com",
  },
  {
    name: "Avidhilda",
    description:
      "Avid Hilda is a premier exhibition organizing company based in the vibrant city of Dubai, at the crossroads of innovation and commerce",
    tags: [
      {
        name: "React.Js",
        color: "blue-text-gradient",
      },
      {
        name: "Laravel",
        color: "green-text-gradient",
      },
      {
        name: "MySQL",
        color: "pink-text-gradient",
      },
    ],
    image: avidhildaWeb,
    url: "https://avidhilda.com",
  },
  {
    name: "DAMAC UAE",
    description:
      "DAMAC Properties is a leading luxury real estate developer in the Middle East, with a track record of delivering some of the most iconic and innovative properties in the region. Founded in 2002, the company has quickly become a household name in the industry",
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "Bootsrap",
        color: "green-text-gradient",
      },
    ],
    image: damac,
    url: "https://real-estate-moussasg.vercel.app",
  },
  {
    name: "Magazine",
    description:
      "engaging platform for readers to explore diverse content, stay informed on current events, trends, and topics of interest, while fostering a sense of community and offering a visually appealing and user-friendly experience.",
    tags: [
      {
        name: "Turn.js",
        color: "blue-text-gradient",
      },
      {
        name: "PHP",
        color: "green-text-gradient",
      },
    ],
    image: magazine,
    url: "https://profile.avidhilda.com",
  },
];

export { services, technologies, experiences,  projects };
