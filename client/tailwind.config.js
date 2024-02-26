/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cust-btn": "#4ECCA3",
        "cust-btn-hover": "#1AACAC",
        // "cust-btn-active": "#388E7C",
        // "cust-btn-disabled": "#BDBDBD",
        // "cust-btn-disabled-hover": "#BDBDBD",
        // "cust-btn-disabled-active": "#BDBDBD",
      },
    },
  },
  plugins: [],
};
