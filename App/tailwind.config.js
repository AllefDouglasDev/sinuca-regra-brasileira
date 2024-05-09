/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ball: {
          blue: "#0e6aae",
          green: "#04635f",
        },
      },
    },
  },
  plugins: [],
};
