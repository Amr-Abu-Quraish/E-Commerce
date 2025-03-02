/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
