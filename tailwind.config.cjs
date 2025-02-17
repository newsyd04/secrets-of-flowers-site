/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poiret: ["Poiret One", "cursive"],
        quicksand: ["Quicksand", "serif"],
        comforter: ["Comforter Brush", "serif"],
        Italianno: ["Italianno", "serif"],
        ptsans: ["PT Sans", "serif"]
      },
    },
  },
  plugins: [],
};
