/*
 * @Author: sfy
 * @Date: 2022-10-04 17:15:33
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-13 20:28:50
 * @FilePath: /vulture/src/main.ts
 * @Description: update here
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import VueGridLayout from "vue-grid-layout";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { GridLayout, GridItem } from "vue-grid-layout";
import { createPinia } from 'pinia'


const app = createApp(App);
const pinia = createPinia()
app.use(ElementPlus);
app.use(router);
app.use(VueGridLayout);
app.use(pinia)
app.component("GridLayout", GridLayout);
app.component("GridItem", GridItem);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
