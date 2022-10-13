/*
 * @Author: sfy
 * @Date: 2022-10-04 17:15:33
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-06 11:09:48
 * @FilePath: /vulture/packages/vul-admin/src/router/index.ts
 * @Description: update here
 */
import { createRouter, createWebHistory } from "vue-router";

import home from "../views/home/home.vue";
import login from "../views/login/login.vue";
import eamil from "../views/email/email.vue";
import editBlock from "../views/home/editBlock.vue";
import renameBlock from "../views/renameBlock/renameBlock.vue";
import client from "../views/client/client.vue";
const routes = [
  {
    path: "/home",
    component: home,
    children: [
      { path: "/editBlock", component: editBlock },
      { path: "/renameBlock", component: renameBlock },
    ],
  },
  { path: "/login", component: login },
  { path: "/email", component: eamil },
  { path: "/client/:name", component: client },
  { path: "", redirect: "/home" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
