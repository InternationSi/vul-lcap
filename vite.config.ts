/*
 * @Author: sfy
 * @Date: 2023-01-06 15:50:48
 * @LastEditors: sfy
 * @LastEditTime: 2023-01-08 17:44:08
 * @FilePath: /vulture/vite.config.ts
 * @Description: update here
 */
import {
  defineConfig
} from 'vite'
import { resolve } from "path"; 
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({
    // options are passed on to @vue/babel-plugin-jsx
  })],
  clearScreen: false,
  server: {
    port: 8080,
    strictPort: true,
    proxy: {
      '/api': { // 匹配所有以'/api1'开头的请求路径
        target: "http://112.124.8.236:8888", // 代理目标的基础路径
        changeOrigin: true, // 用于控制请求头中的host值，默认也为true，可以不设置
        // pathRewrite: {'^/api':'/'}  
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src"),
    },
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
})
