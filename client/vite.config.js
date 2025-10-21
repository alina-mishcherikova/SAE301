import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
  plugins: [tailwindcss()],
  base: "/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost/SAE301",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
