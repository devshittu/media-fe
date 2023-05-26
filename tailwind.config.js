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
      },
    },
  },
  plugins: [],
};
