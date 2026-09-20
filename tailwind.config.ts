import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        paper: {
          DEFAULT: "#fdfcfa", // page background — warm off-white, not stark white
          raised: "#ffffff", // cards, panels
        },
        ink: {
          DEFAULT: "#1c1a17", // body text
          muted: "#6b6459", // secondary text, meta
          faint: "#a49d8f", // placeholders, disabled
        },
        border: {
          DEFAULT: "#e8e3da",
        },
        accent: {
          DEFAULT: "#2b5a6b", // muted teal-ink — interactive elements only
          hover: "#1e434f",
        },
        assumption: {
          DEFAULT: "#b8791f", // amber — AssumptionBreak callouts only
          bg: "#fbf1e0",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
