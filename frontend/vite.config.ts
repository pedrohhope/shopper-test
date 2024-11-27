import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    VITE_GOOGLE_API_KEY: JSON.stringify(`${process.env.VITE_GOOGLE_API_KEY}`),
    VITE_API_URL: JSON.stringify(`${process.env.VITE_API_URL}`),
  },
  server: {
    port: 3000,
  }
})
