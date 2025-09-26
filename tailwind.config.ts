import tailwindCssAnimate from "tailwindcss-animate";

import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { fonts } from "./src/config/fonts";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  safelist: fonts.map((font) => `font-${font}`),
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      "2xl": "1400px",
      desktop: "768px",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", ...fontFamily.sans],
        emoji: [
          "Inter",
          ...fontFamily.sans,
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Noto Color Emoji",
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        twitter: {
          grey: "#CBD0D9",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadeMoveUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "66%": {
            opacity: "1",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "50%": {
            opacity: "1",
            transform: "translateY(5px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeUp: {
          "0%": {
            transform: "translateY(10px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        figureEight: {
          "0%": {
            transform: "rotate(-180deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "50.1%": {
            transform: "rotate(360deg)",
          },
          "100%": {
            transform: "rotate(-0deg)",
            bottom: "0",
          },
        },
        "smooth-move-shake": {
          "0%": {
            transform: "translate(0, 0)",
          },
          "20%": {
            transform: "translate(20px, 10px)",
          },
          "40%": {
            transform: "translate(-10px, 20px)",
          },
          "60%": {
            transform: "translate(20px, -10px)",
          },
          "80%": {
            transform: "translate(-20px, 10px)",
          },
          "100%": {
            transform: "translate(0, 0)",
          },
          "100.1%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "100.2%": {
            transform: "translate(-1px, 0) rotate(-1deg)",
          },
          "100.4%": {
            transform: "translate(1px, 0) rotate(1deg)",
          },
          "100.6%": {
            transform: "translate(-1px, 0) rotate(-1deg)",
          },
          "100.8%": {
            transform: "translate(1px, 0) rotate(1deg)",
          },
          "101%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        fadeInUp: "fadeInUp 1.5s ease-in-out forwards",
        fadeMoveUp: "fadeMoveUp 1s ease-in-out forwards",
        figureEight: "figureEight 5s linear infinite",
        "smooth-move-shake": "smooth-move-shake 4s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindCssAnimate],
} satisfies Config;
