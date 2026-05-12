import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/self-introduction/",
  plugins: [react()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
