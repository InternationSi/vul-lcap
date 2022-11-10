/*
 * @Author: sfy
 * @Date: 2022-10-13 09:55:31
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-29 22:16:18
 * @FilePath: /vulture/vue.config.js
 * @Description: update here
 */


const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
  devServer: {
    proxy: {
      '/api': { // 匹配所有以'/api1'开头的请求路径
        target: "http://112.124.8.236:8888/", // 代理目标的基础路径
        changeOrigin: true, // 用于控制请求头中的host值，默认也为true，可以不设置
        // pathRewrite: {'^/api':'/'}  
      }
    }
  }


});
