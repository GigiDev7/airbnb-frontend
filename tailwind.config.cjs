/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fade: {
          from: { opacity: 0, translate: "-150px" },
          to: { opacity: 1, translate: "0px" },
        },
      },
      animation: {
        fade: "fade 5.5s ease infinite",
      },
    },
  },
  plugins: [],
};
