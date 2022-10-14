/*
 * @Author: sfy
 * @Date: 2022-10-13 09:55:31
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-13 11:40:45
 * @FilePath: /hello-world/.eslintrc.js
 * @Description: update here
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "vue/no-v-model-argument": "off",
    "vue/multi-word-component-names": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
