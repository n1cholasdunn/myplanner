import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // Add other SVGR options here
      },
    }),
  ],
  resolve: {
    alias: {
      shared: path.resolve(__dirname, "../shared"),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:8080",
        target: "https://myplanner-production.up.railway.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  define: {
    GOOGLE_CLIENT_ID: JSON.stringify(process.env.VITE_GOOGLE_CLIENT_ID),
  },
});
