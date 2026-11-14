import { BrowserRouter } from "react-router-dom"; //
import 'animate.css';
import confetti from "canvas-confetti";
import { ArrowUp } from "lucide-react";
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
import SectionDivider from "./components/atoms/SectionDivider";

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
          aria-label="To Top"
          title="Back to top"
          className="group fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#7c3aed] text-white shadow-lg shadow-[#915eff]/40 ring-1 ring-white/20 transition hover:-translate-y-1 hover:bg-[#915eff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-8 sm:right-8 sm:h-12 sm:w-12"
        >
          <ArrowUp aria-hidden="true" strokeWidth={2.5} className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 sm:h-6 sm:w-6" />
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
        <SectionDivider />
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
