/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vcu-gold': '#f8b300',
        'baby-blue': '#e3ebf7'
      },
      screens: { },
      spacing: {
        '17p': '17%',
        '30p': '30%',
      },
    },
  },
  plugins: [],
}