import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  define: {
    'process.env': {},
    global: "window",  // Fixes missing 'global'
  },
  resolve: {
    alias: {
      buffer: path.resolve(__dirname, "node_modules/buffer/"), // Absolute path
      stream: path.resolve(__dirname, "node_modules/stream-browserify/"), // Fix for stream
    },
  },
  server: {
    host: '0.0.0.0',  // ✅ Allows access from LAN and tunnels
    port: 5173,       // Optional: specify a fixed port
  },
});
