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
        // Editorial warm-paper luxury system
        paper: "#F7F4EE", // page background
        sand: "#F2EEE7", // section background
        primary: "#8B4513", // primary brown
        coffee: "#5A3726", // deep coffee
        accent: "#C18A53", // copper accent
        ink: "#1C1C1C", // text
        line: "rgba(0,0,0,0.06)", // hairline border
        muted: "#6B6259", // muted text
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
      },
    },
  },
  plugins: [],
};

export default config;
