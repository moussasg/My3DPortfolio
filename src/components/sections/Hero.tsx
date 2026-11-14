import { motion, useReducedMotion } from "framer-motion";
import { Hand, MapPin, Rotate3d } from "lucide-react";
import { useEffect, useState } from "react";
import { config } from "../../constants/config";
import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";

/** True when the browser can draw the 3D model (the hint would be misleading otherwise). */
const supportsWebGL = () => {
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext(); // free the test context right away
    return gl !== null;
  } catch {
    return false;
  }
};

const Hero = () => {
  const [showRotationHint, setShowRotationHint] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!supportsWebGL()) return;
    const timeoutId = setTimeout(() => setShowRotationHint(true), 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    // min-h-screen with the text in normal flow: on short screens the hero grows instead of overlapping.
    <section className="relative mx-auto min-h-screen w-full">
      {/* The 3D scene fills the hero behind the text. */}
      {/* The hint has done its job once the visitor grabs the model. */}
      <div className="absolute inset-0" onPointerDown={() => setShowRotationHint(false)}>
        <ComputersCanvas />
      </div>

      {/* z-10 keeps the text above the 3D scene; pointer-events-none still lets visitors drag the model behind it. */}
      <div
        className={`pointer-events-none relative z-10 mx-auto flex max-w-7xl flex-row items-start gap-5 pb-64 pt-[120px] xs:pb-44 ${styles.paddingX}`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div className="flex flex-col gap-y-2 sm:gap-y-4">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915eff]">Moussa</span>
          </h1>
          <p className={`${styles.heroSubText} font-semibold`}>{config.hero.p[0]}</p>
          <p className={styles.heroSubText}>{config.hero.p[1]}</p>
          <p className="text-secondary flex items-start gap-2 text-[14px] sm:text-[16px]">
            <MapPin size={18} className="mt-[2px] shrink-0" aria-hidden="true" />
            <span>
              {config.hero.location} · {config.hero.availability}
            </span>
          </p>

          <div className="pointer-events-auto mt-2 flex flex-wrap gap-3">
            <a
              href={config.html.cvUrl}
              download
              className="rounded-xl bg-[#7c3aed] px-6 py-3 text-[16px] font-bold text-white shadow-md transition-colors hover:bg-[#6d28d9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Download CV
            </a>
            <a
              href="#projects"
              className="rounded-xl border-2 border-[#915eff] bg-primary/80 px-6 py-[10px] text-[16px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-[#7c3aed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View QA Project
            </a>
          </div>
        </div>
      </div>

      {/* "Drag to rotate" hint next to the 3D model (screens where the model is shown). */}
      {showRotationHint && (
        <motion.div
          aria-hidden="true" // a mouse/touch hint; the 3D model is not keyboard-operable
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute bottom-48 right-[6%] z-10 hidden items-center gap-3 rounded-full border border-[#915eff]/60 bg-primary/75 py-2 pl-3 pr-4 text-white shadow-lg shadow-[#915eff]/25 backdrop-blur-sm sm:flex"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c3aed]">
            <Rotate3d aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#c4b5fd]">Interactive 3D</span>
            <span className="text-[14px] font-medium">Drag to rotate</span>
          </span>
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { x: [-6, 6, -6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#c4b5fd]"
          >
            <Hand className="h-5 w-5" />
          </motion.span>
        </motion.div>
      )}

      <div className="xs:bottom-10 absolute bottom-32 z-10 flex w-full items-center justify-center">
        <a href="#about" className="flex flex-col items-center gap-y-2">
          <span>Scroll Down</span>
          <div className="border-secondary flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary mb-1 h-3 w-3 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
