import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/LetsGoFestival/",
  server: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  define: {
    "process.env.VITE_APP_KAKAO_API_KEY": JSON.stringify(
      import.meta.VITE_APP_KAKAO_API_KEY
    ),
  },
});
