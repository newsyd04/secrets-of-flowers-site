import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  base: isProduction ? "/secrets-of-flowers-site/" : "/", // Use "/" for local dev
});
