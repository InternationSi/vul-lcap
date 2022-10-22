/*
 * @Author: sfy
 * @Date: 2022-10-04 17:15:33
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-22 21:32:33
 * @FilePath: /vulture/src/main.ts
 * @Description: update here
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import Antd from "ant-design-vue/es";
import "ant-design-vue/dist/antd.css";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import VueGridLayout from "vue-grid-layout";
import { GridLayout, GridItem } from "vue-grid-layout";

const v = createApp(App);
v.use(Antd);
v.use(ElementPlus);
v.use(router);
v.use(VXETable);
v.use(VueGridLayout);
v.component("GridLayout", GridLayout);
v.component("GridItem", GridItem);
v.mount("#app");

// 主应用/scr/main.js
import { registerMicroApps, start } from "qiankun";

// 1. 获取微应用配置
const MICRO_CONFIG = [
  {
    name: "design-app", // 应用的名字 必填 唯一
    entry: "//localhost:8000", // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    container: "#AppContainer", // 挂载具体容器 ID
    // 3. 根据路由匹配，激活的子应用
    activeRule: "/client/design"
  }
];

// 2. 注册微应用
registerMicroApps(MICRO_CONFIG);

start(); // 启动微服务
