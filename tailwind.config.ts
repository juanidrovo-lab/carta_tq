import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        handwriting: ["var(--font-dancing)", "cursive"],
      },
      colors: {
        carta: {
          bg: "#0a0a0f",
          dark: "#111118",
          slate: "#1a1a2e",
          gold: "#d4a017",
          amber: "#f0c040",
          thread: "#e8b84b",
          blue: "#3a6bc8",
          "blue-light": "#6b9ee8",
          muted: "#6b7280",
          text: "#e8e0d0",
          cream: "#f5f0e8",
        },
      },
      keyframes: {
        swirl: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.05)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        "swirl-reverse": {
          "0%": { transform: "rotate(360deg) scale(1.02)" },
          "50%": { transform: "rotate(180deg) scale(0.98)" },
          "100%": { transform: "rotate(0deg) scale(1.02)" },
        },
        "thread-pulse": {
          "0%, 100%": { opacity: "0.4", strokeWidth: "2" },
          "50%": { opacity: "1", strokeWidth: "3" },
        },
        "float-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "float-particle": {
          "0%": { transform: "translateY(0px) translateX(0px)", opacity: "0.3" },
          "33%": { transform: "translateY(-15px) translateX(8px)", opacity: "0.7" },
          "66%": { transform: "translateY(-8px) translateX(-5px)", opacity: "0.5" },
          "100%": { transform: "translateY(0px) translateX(0px)", opacity: "0.3" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.15)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.1)" },
          "70%": { transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "unravel": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        swirl: "swirl 20s linear infinite",
        "swirl-slow": "swirl 30s linear infinite",
        "swirl-reverse": "swirl-reverse 25s linear infinite",
        "thread-pulse": "thread-pulse 3s ease-in-out infinite",
        "float-up": "float-up 0.8s ease-out forwards",
        "float-particle": "float-particle 4s ease-in-out infinite",
        heartbeat: "heartbeat 1.4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        unravel: "unravel 2s ease-out forwards",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
