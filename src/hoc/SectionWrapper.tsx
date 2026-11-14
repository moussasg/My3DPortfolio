import { motion } from "framer-motion";

import { styles } from "../constants/styles";

interface Props {
  Component: React.ElementType;
  idName: string;
}

const SectionWrapper = (
  Component: Props["Component"],
  idName: Props["idName"]
) =>
  function HOC() {
    return (
      <motion.section
        initial="hidden"
        whileInView="show"
        // Start the entrance animation once the section's top is 10% into the screen.
        // (A share of the section, like the old `amount: 0.25`, can never be on screen
        // for very tall sections on phones, which left their content stuck out of place.)
        viewport={{ once: true, amount: "some", margin: "0px 0px -10% 0px" }}
        className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
        id={idName}
      >
        <span className="hash-span">&nbsp;</span>

        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
