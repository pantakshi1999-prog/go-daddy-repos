import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path"; 


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${path.resolve("src/common_styles/index.scss")}";`,
      },
    },
  },
  resolve: {
    alias: {
      "@go-daddy-repo": path.resolve(__dirname, "src"),
    },
  },
});
