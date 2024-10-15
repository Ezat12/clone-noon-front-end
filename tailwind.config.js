/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: "20px",
    },
    extend: {
      colors: {
        main_color: "rgb(254, 238, 0)",
        overlay_color_loading: "#ced2dc75",
        overlay_color_2: "hsla(0, 0%, 0%, 0.2)",
        back_color: "#eff4f4",
      },
      
    },
  },
  plugins: [],
};
