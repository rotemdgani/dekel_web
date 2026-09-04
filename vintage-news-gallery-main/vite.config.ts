import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  /** Uppercase extensions (e.g. cameras / Windows) must be listed or Vite parses them as JS */
  assetsInclude: ["**/*.JPG", "**/*.JPEG", "**/*.MOV", "**/*.mov", "**/*.mp4", "**/*.MP4"],
}));
