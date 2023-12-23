/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins, sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
