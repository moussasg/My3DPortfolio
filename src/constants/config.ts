type TSection = {
  p:string;
  h2: string;
  content?: string;
  p2?: string;
};

type Tskils = {
  h2:string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
    /** Public path of the CV PDF (served from the /public folder). */
    cvUrl: string;
  };
  hero: {
    name: string;
    p: string[];
    location: string;
    availability: string;
  };
  social: {
    github: string;
    linkedin: string;
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: TSection;
    experience: TSection;
    skills: Required<Tskils>;
    education: TSection;
    works:TSection;
  };
};

export const config: TConfig = {
  html: {
    title: "Moussa Souag | Junior QA Automation Engineer",
    fullName: "Moussa Souag",
    email: "moussaswag5@mail.com",
    cvUrl: "/Moussa_Souag_Junior_QA_Automation_CV.pdf",
  },
  // Kept in line with the CV (Moussa_Souag_Junior_QA_Automation_CV.pdf).
  hero: {
    name: "Moussa Souag",
    p: [
      "Junior QA Automation Engineer · Playwright | TypeScript | JavaScript",
      "1.5+ years testing a media platform with 5 billion views in its first year: 5,000+ verified defects across web, mobile and TV.",
    ],
    location: "Algiers, Algeria",
    availability: "Open to remote & on-site roles (UAE, Europe, worldwide)",
  },
  social: {
    github: "https://github.com/moussasg",
    linkedin: "https://www.linkedin.com/in/moussasouag",
  },
  contact: {
    p: "Get in touch",
    h2: "Contact.",
    form: {
      name: {
        span: "Your Name",
        placeholder: "What's your name?",
      },
      email: { span: "Your Email", placeholder: "What's your email?" },
      message: {
        span: "Your Message",
        placeholder: "What do you want to say?",
      },
    },
  },
  sections: { // configs.sections.content
    about: {
      p: "Introduction", //
      h2: "Overview.",
      content: "QA Engineer with 1.5+ years of hands-on testing experience on a high-traffic media platform (5 billion views in its first year) across web, mobile and TV, reporting 5,000+ verified defects. Strong JavaScript/TypeScript foundation from front-end development (React, Next.js) and a 6-month full-stack JavaScript bootcamp. I build Playwright (TypeScript) test suites with the Page Object Model, API tests, multi-browser execution and automated GitHub Actions CI/CD workflows, with a focus on stable locators, flaky-test resolution and clear test reporting. Seeking a Junior QA Automation Engineer role.",
    },
    experience: {
      p: "What I have done so far",
      h2: "Work Experience.",
      p2:"Click on the icons to navigate to the companies' websites."
    },
    skills: {
      h2: "Technical Skills",
    },
    education: {
      p: "Learning path",
      h2: "Education & Certifications.",
    },
    works: {
      p: "My work",
      h2: "Projects.",  
      content: `The following projects showcase my skills and experience through
    real-world examples of my work. Each project is briefly described and
    links to its live website. They reflect my ability to solve complex
    problems, work with different technologies, and manage projects
    effectively. Click on a picture to open the website.`,
    },
  },
};
