import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@admin": path.resolve(__dirname, "./src/admin"),
      "@user": path.resolve(__dirname, "./src/user"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@/components/ui": path.resolve(__dirname, "./src/shared/components/ui"),
      "@/lib": path.resolve(__dirname, "./src/shared/lib"),
      "@/hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@/components": path.resolve(__dirname, "./src/user/components"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        // Consolidated strategy for production consistency
        manualChunks: undefined,
      },
    },
  },
}));
