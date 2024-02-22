import { technologies } from "../../constants";
import { config } from "../../constants/config";
import { styles } from "../../constants/styles";

const Tech = () => {
  return (
    <>
    <section className="sm:px-16 px-6 sm:py-16 py-10 relative z-0 mx-auto max-w-7xl"> 
    <h1 className={`${styles.sectionHeadText}`}> {config.sections.skills.h2}</h1>
    <br></br>
      <div className={`flex flex-row flex-wrap justify-center gap-10`}>
        {technologies.map((technology) => (
          <div className="h-28 w-28" key={technology.name}>
            <p className="text-center">{technology.name}</p>
            <img src={technology.icon} alt={technology.name} />
          </div>
        ))}
      </div>
      </section>
    </>
  );
};
export default Tech;
