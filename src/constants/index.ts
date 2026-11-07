import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TProject,
} from "../types";

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
  linear,
  swagger,
  katalon,
  cloud
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
    title: "QA Automation",
    icon: mobile,
  },
  {
    title: "Front End",
    icon: cloud,
  },
  {
    title: "Search Engine Optimization",               
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
  { name: "Linear", icon: linear},
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "Katalon", icon: katalon }
];
//Software Engineer
const experiences: TExperience[] = [
  {
    title: "Manual QA Engineer, Dubai",
    companyName: "Blinx, UAE company",
    icon: Blinx,
    iconBg: "#383E56",  
    date: "Apr 2025 - Nov 2026", 
    points: [
      "Reported and tracked 5,000+ defects across web, mobile and TV applications, and verified fixes after resolution.",
 "Designed and executed test cases for every release, covering functional, regression, smoke and exploratory testing. ",
"Validated end-to-end user flows on web, mobile and TV platforms." ,
"Automated navigation, responsive and page/image HTTP 200 checks with Playwright (TypeScript), reducing repetitive manual regression work. ",
"Took part in a meeting with TikTok in Dubai to discuss technical support for the Blinx website: CDN, storage, video transcoding and a recommendation engine",
    ],
    link:"https://blinx.com",
  },
  {
    title: "SEO Specialist, Dubai",
    companyName: "Blinx, UAE company",
    icon: Blinx,
    iconBg: "#383E56",  
    date: "May 2024 - Apr 2025", 
    points: [
      "Built an AI-powered script that generated missing meta descriptions and keywords from article titles and bodies, and pushed 20,000+ metadata entries to improve search visibility.",
"Applied technical and on-page SEO to optimise the website."
    ],
    link:"https://blinx.com",
  },
  {
    title: "Front End Developer, Dubai",
    companyName: "Avidhilda",
    icon: Avidhilda,
    iconBg: "#383E56",
    date: "Oct 2023 - Mars 2024",
    points: [
      "Collaborated with cross-functional teams to design innovative software solutions,resulting in a 85% increase in project efficiency and on-time delivery.",
      "Developed scalable and maintainable code, ensuring long-term stability of the software",
      "Optimized algorithms for faster processing, reducing overall computation time.",
      "Maintained detailed documentation of development, enhancing team knowledge sharing."
    ],
    link:"https://ucfashion.vercel.app",
  },
  {
    title: "Data Quality Assurance — Well Test Operations, USA",
    companyName: "Halliburton - Leader Multinational Petroleum",
    icon: Halliburton,
    iconBg: "#E6DEDD",
    date: "Feb 2023 - Aug 2023",
    points: [
      "Performed operational data validation, accuracy checks and quality control on-site for a major usa multinational petroleum company."
    ],
    link:"https://www.halliburton.com/",
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
    name: "DAMAC UAE,", //
    description:
      "Designed and developed from scratch by me, from concept to final implementation. DAMAC Properties is a leading luxury real estate developer in the Middle East, with a track record of delivering some of the most iconic and innovative properties in the region. Founded in 2002, the company has quickly become a household name in the industry",
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "Bootsrap",
        color: "green-text-gradient",
      },//
    ], //
    image: damac,
    url: "https://real-estate-dm51ghx5p-moussasg.vercel.app/",
  },
  {
    name: "GogoVillage",
    description:
      "Gogo village, is a family owned & operated business with LOVE  to create fun ,creative & nature with cleanliness safety & affordability for crawlers to preteens alike. based in uae",
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

export { services, technologies, experiences,  projects };
