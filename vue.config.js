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
});
