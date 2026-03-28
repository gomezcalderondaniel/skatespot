/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skate: {
          black: '#121212',
          gray: '#242424',
          accent: '#00ff41'
        }
      }
    },
  },
  plugins: [],
}
