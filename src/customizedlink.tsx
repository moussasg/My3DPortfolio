
import { ExternalLink, PlayCircle } from "lucide-react";

export default function QAAutomationCard() {
  return (
    <a
      href="https://github.com/moussasg/qa-automation-portfolio"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block max-w-md overflow-hidden
      rounded-2xl border border-blue-500/20 bg-slate-950
      shadow-xl transition-all duration-500
      hover:-translate-y-2 hover:border-cyan-400/60
      hover:shadow-cyan-500/20"
    >
      {/* Background image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="/src/assets/qa-automated.jpeg"
          alt="QA Automation project"
          className="h-full w-full object-cover transition-transform
          duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t
          from-slate-950 via-slate-950/30 to-transparent" />

        <div className="absolute right-4 top-4 rounded-full
          border border-cyan-400/30 bg-slate-950/70 p-3
          text-cyan-400 backdrop-blur-md">
          <PlayCircle size={22} />
        </div>\

        <span className="absolute bottom-4 left-5 rounded-full
          bg-cyan-400/10 px-3 py-1 text-xs font-semibold
          text-cyan-300 ring-1 ring-cyan-400/30">
          QA AUTOMATION
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white
            group-hover:text-cyan-300 transition-colors">
            Playwright Test Suite
          </h3>
        </div>

        <p className="mb-5 text-sm leading-6 text-slate-400">
          End-to-end testing with Playwright, TypeScript,
          cross-browser validation and responsive testing.
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {["Playwright", "TypeScript", "React", "E2E Testing"].map(
            (tech) => (
              <span
                key={tech}
                className="rounded-md bg-slate-800 px-3 py-1
                text-xs text-cyan-300"
              >
                {tech}
              </span>
            )
          )}
        </div>

        <div className="flex items-center gap-2 text-sm
          font-semibold text-cyan-400">
          Explore Project
          <ExternalLink
            size={16}
            className="transition-transform
            group-hover:translate-x-1"
          />
        </div>
      </div>
    </a>
  );
}
