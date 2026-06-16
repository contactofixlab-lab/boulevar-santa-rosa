import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Boulevard Santa Rosa
        primary: {
          blue: "#0671AE",
          green: "#84CE25",
        },
        secondary: {
          navy: "#033D6B",
          "green-dark": "#65A81A",
        },
        surface: {
          blue: "#E3F3FB",
          green: "#EBF7CC",
          light: "#F4F9FB",
        },
        slate: {
          blue: "#4A6275",
        },
        // Semantic colors
        success: "#84CE25",
        info: "#0671AE",
        warning: "#FFA500",
        error: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xl": ["28px", { lineHeight: "1.2" }],
        "3xl": ["32px", { lineHeight: "1.1" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
