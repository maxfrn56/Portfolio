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
        // Palette océan et sable - style Biarritz surf
        'ocean-deep': '#1a2e3a', // Bleu océan profond
        'ocean-blue': '#2d4a5a', // Bleu océan moyen
        'ocean-light': '#4a7a8f', // Bleu océan clair
        'sand': '#e8dcc6', // Grain de sable doux
        'sand-light': '#f5ede0', // Sable très clair
        'sand-dark': '#d4c4a8', // Sable foncé
        'white': '#ffffff',
        // Couleurs d'accent subtiles
        'accent-blue': '#5a8fa3', // Bleu accent doux
        'accent-sand': '#c9b99b', // Sable accent
        // Rétro (gardé pour compatibilité mais moins utilisé)
        'retro-dark': '#1a2e3a',
        'retro-medium': '#2d4a5a',
        'retro-light': '#4a7a8f',
        'retro-accent-orange': '#5a8fa3', // Remplacé par bleu
        'retro-accent-gold': '#c9b99b', // Remplacé par sable
        'retro-text-light': '#e8dcc6',
        'retro-text-dark': '#1a2e3a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-neue)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'wave': 'wave 3s ease-in-out infinite',
        'glitch': 'glitch 0.3s infinite',
        'scanline': 'scanline 8s linear infinite',
        'grain': 'grain 0.2s steps(6) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;

