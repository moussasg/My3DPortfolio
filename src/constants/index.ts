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
  gogo,
  twentyoneia,
  oiltrading,
  ucfashion,
  gogowalpaper,
  magazine,
  Nextjs,
  botstrap,
  express,
  damac,
  Freelancer,
  seo,
  cloud,
  architecture,
  content,
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
  {
    id: "blogs",
    title: "Blogs",
    className: "absolute right-0 top-1/2 transform -translate-y-1/2 fas fa-chevron-down",
    subtitle: [
      { 
        name: "gogovillage",
        className: "block nav-link",
        href: "https://www.gogovilage.com/blog"
      },
      {  
        name: "be1luxury",
        className: "block nav-link",
        href: "https://www.be1luxury.com/blog"
      }
    ]
  }
];

const services: TService[] = [
  {
    title: "UI/UX Developer",
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
    title: "Cybersecurity",
    icon: creator,
  },
  {
    title: "Cloud Technology",                
    icon: cloud,
  },
  {
    title: "System Architecture",
    icon: architecture,
  },
  {
    title: "Search Engine Optimization",               
    icon: seo,
  },
  {
    title: "Content Creator",
    icon: content,
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
//Software Engineer
const experiences: TExperience[] = [
  {
    title: "Software Engineer",
    companyName: "Freelancer",
    icon: Freelancer,
    iconBg: "#383E56",
    date: "2021-2022",
    points: [
      "Boosted efficiency with scalable architectures for enterprise clients",
      "Enhanced release cycles and reliability with CI/CD strategies",
    ],
    link:"https://www.freelancer.com",
  },
  {
    title: "Data Aquisition engineer, USA",
    companyName: "Halliburton - Leader Multinational Petroleum",
    icon: Halliburton,
    iconBg: "#E6DEDD",
    date: "2022-2023",
    points: [
      "Enhanced server performance by optimizing configurations and implementing regular updates",
      "Designed secure network architecture, mitigating potential risks and vulnerabilities",
      "Simplified upgrades and maintenance with detailed database architecture documentation",
    ],
    link:"https://www.halliburton.com/",
  },
  {
    title: "Software Engineer, Dubai",
    companyName: "Avidhilda",
    icon: Avidhilda,
    iconBg: "#383E56",
    date: "2023 - 2024",
    points: [
      "Collaborated with cross-functional teams to design innovative software solutions",
      "Developed scalable and maintainable code, ensuring long-term stability of the software",
      "Maintained detailed documentation of development, enhancing team knowledge sharing",
      "Optimized algorithms for faster processing, reducing overall computation time.",
    ],
    link:"https://avidhilda.com",
  },
  {
    title: "Web Developer",
    companyName: "gogovillage dubai",
    icon: gogo,
    iconBg: "#383E56",  
    date: "Present",
    points: [
      "Optimize Online Presence and Performance using Wix, Google Ads campaigns.      ",
      "Develop and Execute Integrated Digital Marketing Strategies Utilizing Google Analytics",
      "Designed and implemented UI/UX.",
    ],
    link:"https://www.gogovilage.com",
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
    name: "DAMAC UAE", //
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
      },//
    ], //
    image: damac,
    url: "https://damacproperties.vercel.app",
  },
  {
    name: "Magazine",
    description:
      "engaging platform for readers to explore diverse content, stay informed on current events, trends, and topics of interest, while fostering a sense of community and offering a visually appealing and user-friendly experience.",
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
    url: "https://profile.avidhilda.com",
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
    url: "https://www.gogovilage.com",
  },
];

export { services, technologies, experiences,  projects };
