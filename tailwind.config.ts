import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem", // 20px safe area (UI-spec)
        lg: "2rem",
      },
      screens: {
        "2xl": "1120px", // max content width (UI-spec)
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          DEFAULT: "hsl(var(--brand-500))",
          100: "hsl(var(--brand-100))",
          300: "hsl(var(--brand-300))",
          500: "hsl(var(--brand-500))",
          700: "hsl(var(--brand-700))",
          900: "hsl(var(--brand-900))",
        },
        action: {
          DEFAULT: "hsl(var(--action-600))",
          100: "hsl(var(--action-100))",
          500: "hsl(var(--action-500))",
          600: "hsl(var(--action-600))",
        },
        whatsapp: "hsl(var(--whatsapp))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(10,31,60,.06)",
        md: "0 4px 16px rgba(10,31,60,.08)",
        lg: "0 12px 32px rgba(10,31,60,.12)",
        glow: "0 12px 32px rgba(10,31,60,.12), 0 0 0 4px hsl(var(--action-100))",
      },
      fontFamily: {
        sans: ["var(--font-arabic)", "var(--font-latin)", "system-ui", "sans-serif"],
        latin: ["var(--font-latin)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".5", transform: "scale(.85)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
