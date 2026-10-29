import { useEffect, useState } from 'react';

// @ts-nocheck
// Splash screen — shows briefly on load, then fades out automatically.
const Splash = ({ onDone }: { onDone: () => void }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Fade start after 2.2s, fade duration 0.6s → total ~2.8s
    const fadeTimer = setTimeout(() => setFading(true), 2200);
    const doneTimer = setTimeout(() => onDone(), 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816] transition-opacity duration-[600ms] ease-out ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Glow ring */}
      <div className="relative flex h-[120px] w-[120px] items-center justify-center">
        <div className="splash-ring absolute inset-0 rounded-full" />
        <div className="splash-ring splash-ring-delay absolute inset-0 rounded-full" />
        <h1 className="splash-text splash-text-name bg-gradient-to-r from-[#915eff] via-[#00c2cb] to-[#915eff] bg-clip-text text-[32px] font-extrabold text-transparent">
          M
        </h1>
      </div>

      {/* Title */}
      <h2 className="splash-text splash-text-title mt-6 text-[20px] font-semibold text-white">
        Moussa<span className="text-[#915eff]"> <span> </span> Souag</span>
      </h2>
      {/* Progress line */}
      <div className="splash-line mt-8 h-[3px] w-[140px] rounded-full bg-[#1a1a2e]">
        <div className="splash-progress h-full rounded-full bg-gradient-to-r from-[#915eff] to-[#00c2cb]" />
      </div>
    </div>
  );
};

export default Splash;
