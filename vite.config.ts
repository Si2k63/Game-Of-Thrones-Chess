import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Game-Of-Thrones-Chess/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@engine": path.resolve(__dirname, "./src/engine"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
