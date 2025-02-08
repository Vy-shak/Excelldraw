import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      colors: {
        primaryGreen: {
          50: "#f9ffe4",
          100: "#efffc4",
          200: "#e0ff90",
          300: "#c7ff50",
          400: "#b4ff2b",
          500: "#8fe600",
          600: "#6eb800",
          700: "#528b00",
          800: "#436d07",
          900: "#395c0b",
          950: "#1b3400",
        },
        neutral: {
          50: "#f6f7f7",
          100: "#e2e5e3",
          200: "#c5cac7",
          300: "#a0a8a2",
          400: "#7c8580",
          500: "#626a65",
          600: "#4d5450",
          700: "#404543",
          800: "#363938",
          900: "#2f3231",
          950: "#161817",
        },
      },
    },
  },
  plugins: [],
};
export default config;