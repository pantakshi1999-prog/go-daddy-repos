import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          $theme-primary-color: #b7a4e3;
          $theme-secondary-color: white;
        `,
      },
    },
  },
});
