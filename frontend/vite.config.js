import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,        // Define a porta 8080
    host: '0.0.0.0',   // Faz o servidor ser acessível de fora do container
  },
})
