import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const packageName = id.split('node_modules/')[1].split('/')[0]

            if (packageName.includes('vue')) {
              return 'vendor_vue'
            }

            return `vendor_${packageName}`
          }
        },

        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: (chunkInfo) => {
          const facades = chunkInfo.facades || []
          if (facades.some((f) => f.includes('views'))) {
            return 'views/[name]-[hash].js'
          }
          return 'chunks/[name]-[hash].js'
        },
      },
    },
  },
})
