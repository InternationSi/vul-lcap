/*
 * @Author: sfy
 * @Date: 2022-10-04 17:15:33
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-22 21:38:23
 * @FilePath: /vulture/src/router/index.ts
 * @Description: update here
 */
import { createRouter, createWebHistory } from "vue-router";
import { message } from "ant-design-vue";

import home from "../views/layout/layout.vue";
import login from "../views/login/login.vue";
import register from "../views/register/register.vue";
import eamil from "../views/email/email.vue";
import moduleEditor from "../views/moduleEditor/moduleEditor.vue";
import renameBlock from "../views/renameBlock/renameBlock.vue";
import grid from "../designer/layout";
import test from "../views/test/test.vue";
const routes = [
  {
    path: "/",
    component: home,
    children: [
      { path: "/renameBlock", component: renameBlock },
      { path: "/moduleEditor", component: moduleEditor }
    ]
  },
  { path: "/login", component: login },
  { path: "/register", component: register },
  { path: "/email", component: eamil },
  { path: "/grid", component: grid },
  { path: "/test", component: test },
  { path: "", redirect: "/renameBlock" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login' && to.path !== '/register') {
//     const login = JSON.parse(sessionStorage.getItem('login') || '{}')
//     if (!login.token) {
//       message.warning('请先登录')
//       next('/login')
//       return
//     }
//   }
//   next()
// })
export default router;
