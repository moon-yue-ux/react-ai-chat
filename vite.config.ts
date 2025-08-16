import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // 设置输出目录为 build
    assetsDir: 'static', // 设置静态资源目录为 static
  }
})
