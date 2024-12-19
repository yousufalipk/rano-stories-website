/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b50d98',
        secondary: '#540747'
      },
      scale: {
        '200': '1.4',
      },
    },
  },
  plugins: [],
}