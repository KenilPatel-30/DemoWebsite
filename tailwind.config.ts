import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Emerald & Amber Luxury System
        paper: "#0A1A14", // Deep Emerald Green (page background)
        sand: "#132720", // Lighter Emerald (cards, inputs)
        primary: "#E6A13C", // Warm Amber (buttons, highlights - much brighter and readable)
        coffee: "#05100C", // Darkest Green (footer, deep sections)
        ink: "#F4ECD8", // Ivory/Cream (text)
        line: "rgba(244, 236, 216, 0.1)", // Faint Ivory border
        muted: "#82978D", // Muted Green-Grey
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
      },
      letterSpacing: {
        editorial: "-0.03em",
        tightest: "-0.045em",
        wide2: "0.2em",
        wide3: "0.35em",
      },
      lineHeight: {
        body: "1.8",
      },
      maxWidth: {
        prose: "680px",
      },
      boxShadow: {
        // Very soft, warm, low-contrast
        soft: "0 40px 80px -50px rgba(28,20,12,0.30)",
        card: "0 20px 50px -30px rgba(28,20,12,0.22)",
        lift: "0 30px 70px -40px rgba(28,20,12,0.35)",
      },
      transitionTimingFunction: {
        power4: "cubic-bezier(0.16, 1, 0.3, 1)",
        power4in: "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
