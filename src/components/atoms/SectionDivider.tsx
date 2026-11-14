/**
 * Decorative line between two page sections: a purple gradient that fades out
 * at both ends, with a small glowing diamond in the middle.
 */
const SectionDivider = () => (
  <div aria-hidden="true" className="mx-auto max-w-7xl px-6 sm:px-16">
    <div className="relative flex items-center justify-center">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#915eff]/70 to-transparent" />
      <div className="absolute h-2.5 w-2.5 rotate-45 rounded-[2px] bg-[#915eff] shadow-[0_0_12px_3px_rgba(145,94,255,0.55)]" />
    </div>
  </div>
);

export default SectionDivider;
