/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f4f7f1",
          100: "#e6eee0",
          200: "#cdddc1",
          300: "#abbd9a",
          400: "#9fb293",
          500: "#8b9a71",
          600: "#6f7d59",
          700: "#566044",
          800: "#3e4631",
          900: "#2a2f22",
        },
        cream: {
          50: "#fbfaf6",
          100: "#f6f3ea",
          200: "#ede7d3",
        },
        ink: {
          700: "#3a3f36",
          900: "#1f221c",
        },
        accent: {
          500: "#c87f5a",
          600: "#a96544",
        },
      },
      fontFamily: {
        poiret: ["Poiret One", "cursive"],
        quicksand: ["Quicksand", "serif"],
        comforter: ["Comforter Brush", "serif"],
        Italianno: ["Italianno", "serif"],
        ptsans: ["PT Sans", "serif"],
      },
      maxWidth: {
        page: "72rem",
      },
      spacing: {
        "section-y": "5rem",
        "section-y-lg": "7rem",
      },
    },
  },
  plugins: [],
};
