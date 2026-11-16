/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      // Soft purple glow that breathes in and out (used by the "Verified by" press link in the hero).
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(145, 94, 255, 0.5)" },
          "50%": { boxShadow: "0 0 26px rgba(145, 94, 255, 0.95)" },
        },
        // A light shine that sweeps across the badge, then pauses.
        shine: {
          "0%": { transform: "translateX(-120%)" },
          "40%, 100%": { transform: "translateX(320%)" },
        },
      },
      animation: {
        glow: "glow 2.5s ease-in-out infinite",
        shine: "shine 3.5s ease-in-out infinite",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
