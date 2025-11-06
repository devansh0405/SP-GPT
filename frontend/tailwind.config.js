/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E5E7EB",
        input: "#F3F4F6",
        ring: "#3B82F6",
        background: "#FFFFFF",
        foreground: "#111827",
        primary: {
          DEFAULT: "#3B82F6", // Blue
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#6366F1", // Indigo
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444", // Red
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#9CA3AF",
          foreground: "#657588",
        },
        accent: {
          DEFAULT: "#F59E0B", // Amber
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1F2937",
        },
        sidebar: {
          DEFAULT: "#F9FAFB",
          foreground: "#111827",
          primary: "#3B82F6",
          "primary-foreground": "#FFFFFF",
          accent: "#E0F2FE",
          "accent-foreground": "#0C4A6E",
          border: "#E5E7EB",
          ring: "#93C5FD",
        },
        academic: {
          primary: "#0F1729",
          secondary: "#8B5CF6",
          accent: "#10B981",
          success: "#22C55E",
          warning: "#FACC15",
          danger: "#EF4444",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(90deg, #3B82F6 0%, #6366F1 100%)",
        "gradient-secondary": "linear-gradient(90deg, #8e54e9 0%, #e97c35 100%)",
        "gradient-background": "linear-gradient(135deg, #EEF2FF 0%, #FDF2F8 100%)",
      },
      boxShadow: {
        academic: "0 4px 15px rgba(59, 130, 246, 0.25)",
        card: "0 2px 10px rgba(0, 0, 0, 0.08)",
        glow: "0 0 20px rgba(99, 102, 241, 0.5)",
        input: "0 1px 3px rgba(0, 0, 0, 0.1)",
        button: "0 4px 8px rgba(59, 130, 246, 0.3)",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.5rem",
        sm: "0.5rem",
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
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(99, 102, 241, 0.4)" },
          "50%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.7)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glowPulse 2s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
