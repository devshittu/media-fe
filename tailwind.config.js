const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...fontFamily.sans],
        'roboto-mono': ['Roboto Mono', ...fontFamily.mono],
        'source-serif-pro': ['Source Serif Pro', ...fontFamily.serif],
      },
      keyframes: {
        scroll: {
          from: {
            transform: 'translateX(0);',
          },
          to: {
            transform: 'translateX(calc(-100% - 1rem));',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        scroll: 'scroll 10s linear infinite',
        'fade-in': 'fade-in 10s',
      },
    },
  },
  plugins: [],
};
