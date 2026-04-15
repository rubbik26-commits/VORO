import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        voro: {
          purple: "#5E42BC",pink: "#F982FF",indigo: "#271C4F",base: "#f5f4fa",ghost: "#faf9ff",jet: "#1e1b33",
          "text-muted": "#6b7280","text-faint": "#a0aec0","soft-panel": "#ede9fa","muted-border": "#e5e0f5",
          success: "#16a34a",warning: "#d97706",danger: "#dc2626",
        },
      },
      boxShadow: {
        soft: "0 1px 3px rgba(94,66,188,0.06), 0 4px 12px rgba(94,66,188,0.05)",
        medium: "0 4px 12px rgba(94,66,188,0.10), 0 12px 32px rgba(94,66,188,0.07)",
        "glow-sm": "0 4px 16px rgba(94,66,188,0.3)",
        glow: "0 6px 24px rgba(94,66,188,0.4)",
        "white-glow": "0 4px 20px rgba(255,255,255,0.3)",
      },
      fontFamily: { sans: ["Plus Jakarta Sans", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
