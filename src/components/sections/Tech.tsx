import { skillGroups, technologies } from "../../constants";
import { config } from "../../constants/config";
import { styles } from "../../constants/styles";

export const Tech = () => {
  return (
    <section id="skills" className="sm:px-16 px-2 sm:py-16 py-10 relative z-0 mx-auto max-w-7xl">
      <h2 className={`${styles.sectionHeadText}`}>{config.sections.skills.h2}</h2>
      <br />
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div className="flex h-36 w-28 flex-col items-center" key={technology.name}>
            <p className="mb-2 min-h-[2.5rem] text-center text-sm leading-tight">{technology.name}</p>
            <img src={technology.icon} alt={technology.name} className="h-16 w-16 object-contain" />
          </div>
        ))}
      </div>

      {/* The same skill groups as in the CV */}
      <dl className="mt-10 grid gap-4 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="bg-tertiary rounded-2xl p-5">
            <dt className="mb-2 font-bold text-white">{group.title}</dt>
            <dd className="text-secondary text-[15px] leading-6">{group.skills}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
