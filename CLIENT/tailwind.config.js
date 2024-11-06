/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',  // Custom breakpoint for small screens
        '1.5xl': '1480px', // Custom breakpoint for extra large screens
      },
    },
  },
  plugins: [],
}
