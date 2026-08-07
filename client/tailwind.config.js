/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          offwhite: '#FFFFFF',
          border: '#E2E8F0',
          'bg-light': '#F8FAFC',
          maroon: '#9A1750',
          'maroon-dark': '#5D001E',
          teal: '#0D9488',
          'teal-light': '#14B8A6',
          'text-body': '#475569',
          'text-heading': '#0F172A',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
