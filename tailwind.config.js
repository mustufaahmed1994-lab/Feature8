/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'lime-400': '#b8f224',
        'dark-900': '#080808',
        'dark-800': '#0a0a0a',
        'dark-700': '#0f0f0f',
        'dark-600': '#141414',
        'cream': '#f0ede4',
      },
      fontFamily: {
        jost: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        barlow: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
        display: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
        logo: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
};
