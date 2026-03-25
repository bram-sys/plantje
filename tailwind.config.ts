import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "system-ui", "sans-serif"],
      },
      animation: {
        "grass-wave": "grassWave 2.2s ease-in-out infinite",
        "grass-wave-slow": "grassWave 3s ease-in-out infinite",
        "float": "float 3.5s ease-in-out infinite",
        "bloom-in": "bloomIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "celebrate": "celebrate 0.6s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "check-bounce": "checkBounce 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        "sparkle": "sparkle 1.2s ease-in-out infinite",
      },
      keyframes: {
        grassWave: {
          "0%, 100%": { transform: "rotate(-4deg)", transformOrigin: "bottom center" },
          "50%": { transform: "rotate(4deg)", transformOrigin: "bottom center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        bloomIn: {
          "0%": { transform: "scale(0) rotate(-15deg)", opacity: "0" },
          "80%": { transform: "scale(1.08) rotate(3deg)" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        celebrate: {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.15) rotate(-3deg)" },
          "60%": { transform: "scale(0.95) rotate(2deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        checkBounce: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.93)" },
          "100%": { transform: "scale(1)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
