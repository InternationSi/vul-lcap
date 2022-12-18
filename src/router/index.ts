/*
 * @Author: sfy
 * @Date: 2022-10-04 17:15:33
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-18 22:18:27
 * @FilePath: /vulture/src/router/index.ts
 * @Description: update here
 */
import { createRouter, createWebHistory } from "vue-router";
import { ElMessage } from "element-plus";
import layout from "../views/layout/layout.vue";
import adminLayout from "../views/layout/admin.vue";
import login from "../views/login/login.vue";
import register from "../views/register/register.vue";
import email from "../views/email/email.vue";
import renameBlock from "../views/renameBlock/renameBlock.vue";
import grid from "../designer/layout";
import PageView from "../views/PageView/PageView.vue";
import { tokenService } from "@/utils/tokenService";
import comsCreate from "../views/comsCreate/comsCreate.vue";
import personalCenter from "../views/personalCenter";
import moduleNav from "../views/moduleList/moduleNav.vue";
import moduleList from "../views/moduleList/moduleList.vue";
import moduleAttribute from "../views/moduleList/moduleAttribute.vue";
import SetterTest from "@/designer/setter/index.vue";
import cockpitBlock from "../views/cockpitBlock/cockpitBlock.vue";

// import { useLoginStore } from '@/store/login';
const routes = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "/admin",
        component: adminLayout,
        children: [
          { path: "/admin/cockpitBlock", component: cockpitBlock },
          { path: "/admin/renameBlock", component: renameBlock },
          { path: "/admin/comsCreate", component: comsCreate },
          {
            path: "/admin/moduleNav",
            component: moduleNav,
            children: [
              { path: "/admin/moduleNav/moduleList", component: moduleList },
              {
                path: "/admin/moduleNav/moduleAttribute",
                component: moduleAttribute
              }
            ]
          }
        ]
      },
      {
        path: "/design",
        component: grid
      },
      {
        path: "/setter",
        component: SetterTest
      }
    ]
  },
  { path: "/login", component: login },
  { path: "/register", component: register },
  { path: "/email", component: email },
  { path: "/render", component: PageView },
  { path: "/personalCenter", component: personalCenter },
  { path: "", redirect: "/admin/renameBlock" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
// const store = useLoginStore();
const pathList = ["/login", "/register"];
router.beforeEach((to, from, next) => {
  const token = tokenService.getTokenInfo();
  if (token) {
    // const userInfo = store.userInfo
    next();
  } else {
    if (pathList.indexOf(to.path) == -1) {
      ElMessage.error("用户未登录,请先登录");
      next("/login");
    }
    next();
  }
});
export default router;
