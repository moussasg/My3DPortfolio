import { BrowserRouter } from "react-router-dom"; //
import 'animate.css';
import confetti from "canvas-confetti";
import scrolup from "./assets/scrolup.png";
import ReactGA from "react-ga" // this is for google analytics
import { inject } from '@vercel/analytics'; 
import {
  About,
  Contact,
  Experience, //
  Hero,
  Navbar,
  Works,
  StarsCanvas,
} from "./components";
import { useEffect, useState } from "react";
import { config } from "./constants/config";
import { Tech } from "./components/sections/Tech";
import Education from "./components/sections/Education";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

setTimeout(() => {
  confetti({ disableForReducedMotion: true });
}, 1000);

/** The "To Top" button appears once the visitor has scrolled this far (px). */
const SCROLL_TOP_THRESHOLD = 800;

const App = () => {
  const tracking_id = "G-X5S7FXJPC0";
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    ReactGA.initialize(tracking_id)
    ReactGA.pageview(window.location.pathname + window.location.search); // this is for google analytics
    inject(); // this is for web analytics for next.js
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
    const onScroll = () => setShowScrollTop(window.scrollY > SCROLL_TOP_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });

  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0">
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-14 right-1 z-40 flex flex-col items-center gap-y-1 opacity-75 sm:right-4 sm:opacity-100"
        >
          <img src={scrolup} alt="" className="h-4 w-4 sm:h-8 sm:w-8" />
          <span className="text-center text-xs">To Top</span>
        </button>
      )}
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech/>
        <Works />
        <Education />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
