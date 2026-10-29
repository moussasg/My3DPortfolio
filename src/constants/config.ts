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
  };
  hero: {
    name: string;
    p: string[];
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
    works:TSection;
  };
};

export const config: TConfig = {
  html: {
    title: "Moussa | QA Automation Engineer – Playwright & TypeScript",
    fullName: "Moussa Souag",
    email: "moussaswag5@mail.com",
  },
  hero: { 
    name: "Moussa Souag",
    p: ["QA Automation Engineer with 3 years of experience and a software engineering background. I design maintainable Playwright and TypeScript test frameworks, run them in CI/CD pipelines, and turn complex user flows into stable, automated tests that protect product quality."],
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
      content: "Automated QA Engineer specializing in Playwright and TypeScript, with a developer’s background in React, Next.js and Node.js. I build Page Object Model test suites covering E2E, API, visual regression, and accessibility, run in CI/CD (GitHub Actions, Bitbucket), Linear for bug tracking. Experienced with a U.S. multinational petroleum company and Dubai media companies. Quick learner and collaborative. ! ",
    },
    experience: {
      p: "What I have done so far",
      h2: "Work Experience.",
      p2:"Click on the icons to navigate to the companies' websites."
    },
    skills: {
      h2: "Technical Skills",
    },
    works: {
      p: "My work",
      h2: "Projects.",  
      content: `Following projects showcases my skills and experience through
    real-world examples of my work. Each project is briefly described with
     live demos in it. It reflects my
    ability to solve complex problems, work with different technologies,
    and manage projects effectively. Click on the picture to navigate to colaborated website.`,
    },
  },
};
