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
        ink: {
          DEFAULT: "#1C1D21",
          soft: "#5C5E66",
          faint: "#8A8C94",
        },
        mist: "#F5F6F8",
        line: "#E4E6EA",
        promo: "#FFDD00",
        footer: "#212226",
        white: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(28, 29, 33, 0.06)",
        "card-hover": "0 12px 28px rgba(28, 29, 33, 0.12)",
        pop: "0 16px 48px rgba(28, 29, 33, 0.18)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
