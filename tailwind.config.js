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
        'somerset-black': '#1f2937',
        'somerset-red': '#dc2626', 
        'somerset-white': '#ffffff',
      },
    },
  },
  plugins: [],
}