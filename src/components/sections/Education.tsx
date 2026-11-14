import { certifications, education, languages } from "../../constants";
import { config } from "../../constants/config";
import { SectionWrapper } from "../../hoc";
import { TEducation } from "../../types";
import { Header } from "../atoms/Header";

const EntryList = ({ heading, entries }: { heading: string; entries: TEducation[] }) => (
  <div className="bg-tertiary rounded-2xl p-6">
    <h3 className="mb-4 text-[20px] font-bold text-white">{heading}</h3>
    <ul className="space-y-4">
      {entries.map((entry) => (
        <li key={entry.title}>
          <p className="font-semibold text-white">{entry.title}</p>
          <p className="text-secondary text-[14px]">
            {entry.place}
            {entry.detail && ` · ${entry.detail}`}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

const Education = () => {
  return (
    <>
      <Header useMotion={false} {...config.sections.education} />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <EntryList heading="Education" entries={education} />
        <EntryList heading="Certifications" entries={certifications} />
      </div>

      <div className="bg-tertiary mt-6 rounded-2xl p-6">
        <h3 className="mb-4 text-[20px] font-bold text-white">Languages</h3>
        <ul className="flex flex-wrap gap-3">
          {languages.map(({ name, level }) => (
            <li key={name} className="rounded-full bg-black-100 px-4 py-2 text-[14px] text-white">
              {name} <span className="text-secondary">· {level}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
