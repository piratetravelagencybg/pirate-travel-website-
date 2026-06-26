import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4A017",
          dark: "#B8860B",
          bright: "#FFD700",
          light: "#F5D76E",
          hover: "#B8860B",
        },
        warm: {
          bg: "#FDF6E8",
          card: "#FFFFFF",
          dark: "#1C1208",
          border: "#E8D9B0",
          shadow: "rgba(180,140,20,0.15)",
        },
        brown: {
          DEFAULT: "#1C1208",
          secondary: "#5C4A1E",
          muted: "#9C8A5E",
        },
        // legacy dark — still used in hero overlay / footer
        dark: {
          DEFAULT: "#1C1208",
          card: "#2E1E08",
          input: "#FFFFFF",
          border: "#E8D9B0",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-gradient":
          "linear-gradient(135deg, #B8860B 0%, #FFD700 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
