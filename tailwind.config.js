/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        retro: ['"Archivo Narrow"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#00B8A9',
          dark: '#009C8F',
        },
        accent: '#0E172A',
        background: {
          light: '#F8FAFC',
          dark: '#0F172A', // Slate 900
        },
        dark: {
          bg: '#0B1120', // Rich deep blue/black
          surface: '#1E293B', // Slate 800
          border: '#334155', // Slate 700
        },
      },
      borderRadius: {
        'lg': '0.5rem',
      },
      animation: {
        blob: "blob 7s infinite",
        "fade-in-up-blur": "fade-in-up-blur 0.8s ease-out both",
        "aurora-flow-1": "aurora-flow-1 15s infinite alternate",
        "aurora-flow-2": "aurora-flow-2 20s infinite alternate",
        "aurora-flow-3": "aurora-flow-3 25s infinite alternate",
      },
      keyframes: {
        "aurora-flow-1": {
          "0%": { transform: "translate(0, 0) rotate(0deg) scale(1)" },
          "50%": { transform: "translate(50%, 20%) rotate(10deg) scale(1.1)" },
          "100%": { transform: "translate(20%, 50%) rotate(-10deg) scale(0.9)" },
        },
        "aurora-flow-2": {
          "0%": { transform: "translate(0, 0) rotate(0deg) scale(1)" },
          "50%": { transform: "translate(-40%, 30%) rotate(-10deg) scale(1.1)" },
          "100%": { transform: "translate(-20%, -20%) rotate(10deg) scale(0.9)" },
        },
        "aurora-flow-3": {
          "0%": { transform: "translate(0, 0) rotate(0deg) scale(1)" },
          "50%": { transform: "translate(30%, -40%) rotate(5deg) scale(1.1)" },
          "100%": { transform: "translate(-30%, 30%) rotate(-5deg) scale(0.9)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "fade-in-up-blur": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
            filter: "blur(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
      },
    },
  },
  plugins: [],
}
