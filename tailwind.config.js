/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#2F4156",
        teal: "#567C8D",
        skyblue: "#C8D9E6",
        beige: "#F5EFEB",
        white: "#FFFFFF",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
