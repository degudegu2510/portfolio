import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { Features } from 'lightningcss'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react(),
    tailwindcss()
  ],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  css: {
    lightningcss: {
      // light-dark() をポリフィル化すると prefers-color-scheme にしか追従せず、
      // ModeSelector による color-scheme の切り替えが効かなくなるため除外する
      exclude: Features.LightDark,
    },
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
})
