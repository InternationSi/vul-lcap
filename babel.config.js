/*
 * @Author: sfy
 * @Date: 2022-10-13 09:55:31
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-01 22:17:47
 * @FilePath: /vulture/babel.config.js
 * @Description: update here
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        "libraryName": "@formily/element-plus",
        "libraryDirectory": "esm",
        "style": true
      }
    ]
  ],
};
