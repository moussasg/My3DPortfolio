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
    title: "My  3D Portfolio",
    fullName: "Moussa Souag",
    email: "johndoe@mail.com",
  },
  hero: { 
    name: "Moussa Souag",
    p: ["I Develop 3D Visuals, User", "Interfaces And Web Applications"],
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
      p: "Introduction",
      h2: "Overview.",
      content: "As a skilled Software Engineer, I bring expertise in TypeScript, JavaScript, React, and frameworks like Next.js. With experience in USA multinational petroleum companies and Dubai, I excel in creating efficient, scalable solutions. I'm known for quick learning and close collaboration with clients to solve real-world problems. Let's work together to bring your ideas to life ! ",
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
    and manage projects effectively. Click on the picture to navigate to my website.`,
    },
  },
};
