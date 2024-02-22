import { motion } from "framer-motion";
import TextTransition, { presets } from 'react-text-transition';
import IndicatorRotation from "../../assets/rotation.png"
import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";
import {useState , useEffect} from "react"
import { config } from "../../constants/config";
const Hero = () => {
  const TEXTS = ['Souag', 'Moussa'];
  const [index, setIndex] = useState(0);
  const [RotationLogo , setRotationLogo] = useState(false)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 1000);
  
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setRotationLogo(true)
    }, 2000);
  
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <section className={`relative mx-auto h-screen w-full`}>
      <div
        className={`absolute inset-0 top-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div className="flex flex-col gap-y-2 sm:gap-y-4">
          <div className="flex gap-x-2 sm:gap-x-4"> 
        <h1 className={`${styles.heroHeadText} text-white animate__animated animate__bounceInLeft animate__slow whitespace-nowrap`}>
            Hi, I'm 
          </h1>
          <div className={`${styles.heroHeadText} text-white`}>
          <span className="text-[#915eff]">Moussa</span>
          </div>
          </div>
          <div className={`${styles.heroSubText} items-start w-[100%] animate__animated animate__backInUp animate__slow`}>
            {config.hero.p[0]} <br/>
            {config.hero.p[1]}
          </div>
          <div className="w-[100%] relative mt-[20%] hidden sm:flex sm:justify-end opacity-75">
          {RotationLogo && <img src={IndicatorRotation} className="w-[50px] h-[50px] w-[100%] flex items-center justify-center"></img> } 
          </div>
          </div>  
      </div>

      <ComputersCanvas />


      
      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center">
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
