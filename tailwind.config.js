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
        'somerset-blue': '#3b82f6',
      },
    },
  },
  plugins: [],
}