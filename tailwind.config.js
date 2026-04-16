/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'client-primary': '#0F2640',
        'client-primary-mid': '#1B3A5C',
        'client-secondary': '#2C5F8A',
        'client-accent': '#4A90C4',
        'client-accent-light': '#6BB3E8',
        'client-gold': '#C9A84C',
        'client-text': '#8A9AAF',
        'client-text-dark': '#0A1929',
        'client-bg': '#F0F4F8',
        'client-bg-white': '#FAFBFD',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
