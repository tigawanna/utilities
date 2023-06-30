/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],

  plugins: [require("tailwindcss-animate"), 
  require("shadcn-fe-tw"),
  require("@tailwindcss/container-queries"),
  require("@tailwindcss/typography"),
  require("tailwind-scrollbar"),
],
}