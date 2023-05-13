/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    // colors: {
    //   // info: '#2f54eb',
    //   // primary: '#10239e',
    //   // secondary: '#ff7a45',
    //   // success: '#52c41a',
    //   // danger: '#f5222d',
    //   // warning: '#faad14',
    //   info: colors.sky,
    //   primary: colors.black,
    //   secondary: colors.slate,
    //   success: colors.emerald,
    //   danger: colors.red,
    //   warning: colors.amber,
    // },
    extend: {},
  },
  plugins: [],
};
