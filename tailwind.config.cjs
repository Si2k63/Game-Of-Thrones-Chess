/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "1/8vw": "12.5vw",
        "1/8vh": "12.5vh",
      },
    },
  },
  plugins: [],
};
