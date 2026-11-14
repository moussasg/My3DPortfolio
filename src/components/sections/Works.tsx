import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { ViewMyweb } from "../../assets";
import { SectionWrapper } from "../../hoc";
import { projects, qaProjects } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TProject } from "../../types";
import QAProjectCard from "../atoms/QAProjectCard";

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  tags,
  image,
  url,
}) => {
  return (
    // A short stagger: with 0.5 s per card the last card only arrived ~4 s after the section appeared.
    <motion.div variants={fadeIn("up", "spring", index * 0.15, 0.75)}>
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
        glareColor="#aaa6c3"
      >
        <div className="bg-tertiary w-full rounded-2xl p-5 sm:w-[300px]">
          <div className="relative h-[230px] w-full">
            <img
              src={image}
              alt={name}
              className="h-full w-full rounded-2xl object-cover"
            />
            {/* The link covers the picture; the round icon is only a visual hint. */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the ${name} website`}
              className="card-img_hover absolute inset-0 m-3 flex justify-end"
            >
              <div className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full">
                <img
                  src={ViewMyweb}
                  alt=""
                  className="h-1/2 w-1/2 object-contain"
                />
              </div>
            </a>
          </div>
          <div className="mt-5">
            <h3 className="text-[24px] font-bold text-white">{name}</h3>
            <p className="text-secondary mt-2 text-[14px]">
              {description
                .split(
                  /(Designed by me, developed from scratch by me, from concept to final implementation\.|Designed and developed from scratch by me|Designed by me)/
                )
                .map((part, i) =>
                  /^(Designed by me, developed from scratch by me, from concept to final implementation\.|Designed and developed from scratch by me|Designed by me)$/.test(
                    part
                  ) ? (
                    <span
                      key={i}
                      className="font-semibold bg-gradient-to-r from-[#915eff] via-[#00c2cb] to-[#915eff] bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(145,94,255,0.6)]"
                    >
                      {part}
                    </span>
                  ) : (
                    part
                  )
              )}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.works} />

      <h3 className="mt-10 text-[24px] font-bold text-white">1. QA Automation</h3>
      <div className="mt-5 flex flex-wrap gap-7">
        {qaProjects.map((project) => (
          <QAProjectCard key={project.title} {...project} />
        ))}
      </div>

      <h3 className="mt-16 text-[24px] font-bold text-white">2. Front-End Development</h3>
      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-4 sm:gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
