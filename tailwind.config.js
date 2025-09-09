/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'somerset-blue': '#1e40af',
        'somerset-red': '#dc2626',
        'somerset-green': '#16a34a',
      },
    },
  },
  plugins: [],
}