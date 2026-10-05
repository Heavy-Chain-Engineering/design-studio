import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        studio: {
          navy: {
            DEFAULT: '#0F172A', // Deep institutional navy
            dark: '#090D16',
            light: '#1E293B',
            flank: '#0A2540',
          },
          steel: {
            DEFAULT: '#253B56',
            light: '#3B577D',
            dark: '#162436',
          },
          gold: {
            DEFAULT: '#D4AF37', // Metallic warm gold
            light: '#F3E5AB',
            dark: '#997300',
            amber: '#E5A93C',
            apex: '#F59E0B',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        "hc-light": {
          "primary": "#1E3A8A", // Deep Indigo Navy
          "primary-content": "#FFFFFF",
          "secondary": "#D68D16", // Warm Golden Amber
          "secondary-content": "#0F172A",
          "accent": "#B45309",
          "accent-content": "#FFFFFF",
          "neutral": "#0F172A",
          "neutral-content": "#F8FAFC",
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#E2E8F0",
          "base-content": "#0F172A",
          "info": "#2563EB",
          "success": "#16A34A",
          "warning": "#D97706",
          "error": "#DC2626",
        },
        "light": {
          "primary": "#1E3A8A",
          "primary-content": "#FFFFFF",
          "secondary": "#D68D16",
          "secondary-content": "#0F172A",
          "accent": "#B45309",
          "accent-content": "#FFFFFF",
          "neutral": "#0F172A",
          "neutral-content": "#F8FAFC",
          "base-100": "#FFFFFF",
          "base-200": "#F8FAFC",
          "base-300": "#E2E8F0",
          "base-content": "#0F172A",
          "info": "#2563EB",
          "success": "#16A34A",
          "warning": "#D97706",
          "error": "#DC2626",
        },
        "hc-dark": {
          "primary": "#63B3ED", // Electric Blueprint Blue
          "primary-content": "#070A0F",
          "secondary": "#E3A52E", // Bright Warm Amber Gold
          "secondary-content": "#070A0F",
          "accent": "#F0BC55",
          "accent-content": "#070A0F",
          "neutral": "#070A0F",
          "neutral-content": "#F7FAFC",
          "base-100": "#070A0F", // Deep Midnight Black
          "base-200": "#0D111A",
          "base-300": "#1A2230",
          "base-content": "#F7FAFC",
          "info": "#63B3ED",
          "success": "#68D391",
          "warning": "#F6E05E",
          "error": "#FC8181",
        },
        "dark": {
          "primary": "#63B3ED",
          "primary-content": "#070A0F",
          "secondary": "#E3A52E",
          "secondary-content": "#070A0F",
          "accent": "#F0BC55",
          "accent-content": "#070A0F",
          "neutral": "#070A0F",
          "neutral-content": "#F7FAFC",
          "base-100": "#070A0F",
          "base-200": "#0D111A",
          "base-300": "#1A2230",
          "base-content": "#F7FAFC",
          "info": "#63B3ED",
          "success": "#68D391",
          "warning": "#F6E05E",
          "error": "#FC8181",
        },
      },
    ],
  },
}

