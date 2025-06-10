/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "accent-gold": "#FFD700",
        "accent-gold-light": "#FFE44D",
        "bg-light": "#FFFFFF",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
