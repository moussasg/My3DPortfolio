import { BrowserRouter } from "react-router-dom";
import 'animate.css';
import confetti from "canvas-confetti";
import scrolup from "./assets/scrolup.png";
import ReactGA from "react-ga" // this is for google analytics
import { inject } from '@vercel/analytics'; 
 
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Works,
  StarsCanvas,
} from "./components";
import { useEffect, useState } from "react";
import { config } from "./constants/config";
import { Tech } from "./components/sections/Tech";
setTimeout(()=> {
  confetti()
} , 1000)
// Fonction pour suivre le défilement


// Attacher un gestionnaire d'événements pour suivre le défilement
const App = () => {
  const tracking_id = "G-X5S7FXJPC0"; 
  const [Arrow , setarrow] = useState(false)  
  useEffect(() => {
    ReactGA.initialize(tracking_id)
    ReactGA.pageview(window.location.pathname + window.location.search); // this is for google analytics
    inject(); // this is for web analytics for next.js
    if (document.title !== config.html.title) {
      document.title = config.html.title;   
    }
    function trackScrollHeight() {
      // Obtenir la hauteur actuelle du défilement vertical
      const scrollHeight = window.scrollY;
    
      // Faites quelque chose avec la hauteur du défilement
      console.log('Hauteur du défilement vertical:', scrollHeight);
      if (scrollHeight > 800) {
        setarrow(!Arrow)
      } else {
        setarrow(false)
      }
    }
    window.addEventListener('scroll', trackScrollHeight);
  }, []);

  const Scrolupp = (id:any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0">
        <div id="firstpage"></div>
      {Arrow ? 
      <div className="flex flex-col items-center gap-y-1 fixed bottom-14 z-40 ... w-4 h-4 sm:w-8 sm:h-8 right-1 sm:right-4 opacity-75 sm:opacity-100" onClick={() => Scrolupp("firstpage")}>
      <img src={scrolup}></img>
      <p className="text-center fs-16 text-xs">To Top</p>
      </div> 
      : ""}
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech/>
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
