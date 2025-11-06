import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // ✅ Dev server settings
  server: {
    host: "::",
    port: 8080,
  },

  // ✅ Plugins (React SWC + componentTagger only in dev)
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  // ✅ Path alias
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ✅ (Optional) Build optimizations from default TS config
  build: {
    outDir: "dist",
    sourcemap: mode === "development",
  },
}));
