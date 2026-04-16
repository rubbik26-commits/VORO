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
        voro: {
          // Core brand
          purple:     "#5E42BC",
          pink:       "#F982FF",
          indigo:     "#271C4F",
          jet:        "#121216",
          ghost:      "#F8F7FB",
          white:      "#FFFFFF",
          base:       "#F5F4FA",
          // Semantic
          success:    "#15A46B",
          warning:    "#E8A317",
          danger:     "#D84C63",
          // UI
          "muted-border": "#E7E3F2",
          "soft-panel":   "#F3EFFB",
          "text-muted":   "#6F6887",
          "text-faint":   "#B0A8C8",
        },
      },
      borderRadius: {
        xs:   "10px",
        sm:   "14px",
        md:   "18px",
        lg:   "24px",
        xl:   "32px",
        pill: "999px",
        // keep tailwind defaults available
        DEFAULT: "14px",
        "2xl": "18px",
        "3xl": "24px",
      },
      boxShadow: {
        soft:       "0 10px 30px rgba(39, 28, 79, 0.08)",
        medium:     "0 20px 50px rgba(39, 28, 79, 0.12)",
        glow:       "0 14px 34px rgba(94, 66, 188, 0.28)",
        "glow-sm":  "0 6px 18px rgba(94, 66, 188, 0.22)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "Segoe UI", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #5E42BC 0%, #271C4F 100%)",
        "gradient-accent":  "linear-gradient(135deg, #5E42BC 0%, #F982FF 100%)",
        "gradient-soft":    "linear-gradient(180deg, #FFFFFF 0%, #F8F7FB 100%)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "scale(0.97) translateY(8px)" },
          to:   { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.18s ease",
      },
    },
  },
  plugins: [],
};

export default config;
