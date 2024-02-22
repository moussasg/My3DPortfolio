import { BallCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { technologies } from "../../constants";
import { config } from "../../constants/config";
import { styles } from "../../constants/styles";

const Tech = () => {
  return (
    <>
      <h2 className={styles.sectionHeadText}>{config.sections.skills.h2}</h2>
      <br></br>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div className="h-28 w-28" key={technology.name}>
            <BallCanvas icon={technology.icon}/>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
