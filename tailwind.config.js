/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        iconActive: "#FF5F00",
        iconUnActive: "#D5D5D5",
        bgLight: "#ffffff",
        bgDark: "#212135",
        beforeHover: "#636363",
        afterHover: "#FF5F00",
        prevBtn: "#B9B9B9",
      },
      boxShadow: {
        topShadow: "0 -2px 10px 0 rgba(0, 0, 0, 0.2)",
        bottomShadow: "0 2px 10px 0 rgba(0, 0, 0, 0.2)",
      },
    },
  },
  darkMode: "class", // 다크 모드 설정
  plugins: [],
};
