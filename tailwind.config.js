/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tarot: {
          dark: '#050507',
          card: '#0e0e12',
          border: '#27272a',
          lavender: '#D1C4E9',
          lilac: '#B39DDB',
          purpleGlow: '#9575CD',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Noto Serif KR', 'serif'],
        sans: ['Pretendard', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin-slow 20s linear infinite',
        'fade': 'fade 3s ease-in-out infinite alternate',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade': {
          '0%': { opacity: '0.1' },
          '100%': { opacity: '0.35' },
        }
      }
    },
  },
  plugins: [],
}
