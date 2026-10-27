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
        brand: {
          DEFAULT: "#0050FF",
          dark: "#0040C4",
          light: "#E7EEFF",
          faint: "#F2F6FF",
        },
        // Тёмная тема: светлые токены ink инвертированы (текст светлый)
        ink: {
          DEFAULT: "#E9EAEE",
          soft: "#9CA0AB",
          faint: "#6A6E78",
        },
        mist: "#131419",
        line: "#2A2D35",
        promo: "#FFDD00",
        footer: "#0B0C0F",
        surface: "#17181F",
        "surface-2": "#1E2129",
        white: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.16, 1, 0.3, 1)", // expo-out
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "quart-out": "cubic-bezier(0.25, 1, 0.5, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      boxShadow: {
        card: "0 2px 8px rgba(20, 22, 28, 0.06)",
        "card-hover": "0 16px 40px rgba(20, 22, 28, 0.14)",
        pop: "0 20px 60px rgba(20, 22, 28, 0.2)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-slow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(26px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee-slow 45s linear infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "line-grow": "line-grow 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both",
      },
    },
  },
  plugins: [],
};

export default config;
