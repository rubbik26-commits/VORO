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
          red:        "#D02C30",  // Official VORO brand red (PMS 711 C)
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
        DEFAULT: "14px",
        "2xl": "18px",
        "3xl": "24px",
      },
      boxShadow: {
        soft:       "0 10px 30px rgba(39, 28, 79, 0.08)",
        medium:     "0 20px 50px rgba(39, 28, 79, 0.12)",
        glow:       "0 14px 34px rgba(94, 66, 188, 0.28)",
        "glow-sm":  "0 6px 18px rgba(94, 66, 188, 0.22)",
        "lift":     "0 16px 40px rgba(39, 28, 79, 0.14)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Montserrat", "Inter", "Segoe UI", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #5E42BC 0%, #271C4F 100%)",
        "gradient-accent":  "linear-gradient(135deg, #5E42BC 0%, #F982FF 100%)",
        "gradient-soft":    "linear-gradient(180deg, #FFFFFF 0%, #F8F7FB 100%)",
        "gradient-mesh":    "radial-gradient(ellipse at 20% 50%, rgba(94,66,188,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(249,130,255,0.03) 0%, transparent 50%)",
        "gradient-glass":   "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,247,251,0.7) 100%)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "scale(0.97) translateY(8px)" },
          to:   { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        slideInUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(94,66,188,0.3)" },
          "50%":      { boxShadow: "0 0 24px rgba(94,66,188,0.5)" },
        },
        progressFill: {
          from: { width: "0%" },
        },
        countUp: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(94,66,188,0.2)" },
          "50%":      { borderColor: "rgba(94,66,188,0.5)" },
        },
      },
      animation: {
        "fade-in":       "fadeIn 0.18s ease",
        "slide-in-right":"slideInRight 0.25s ease-out",
        "slide-in-up":   "slideInUp 0.3s ease-out",
        "scale-in":      "scaleIn 0.2s ease-out",
        "shimmer":       "shimmer 2s infinite linear",
        "pulse-glow":    "pulseGlow 2.5s infinite ease-in-out",
        "progress-fill": "progressFill 0.8s ease-out",
        "count-up":      "countUp 0.4s ease-out",
        "border-glow":   "borderGlow 2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
