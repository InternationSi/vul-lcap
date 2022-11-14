/*
 * @Author: sfy
 * @Date: 2022-10-04 17:15:33
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-13 20:39:25
 * @FilePath: /vulture/src/router/index.ts
 * @Description: update here
 */
import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import home from '../views/layout/layout.vue';
import login from '../views/login/login.vue';
import register from '../views/register/register.vue';
import eamil from '../views/email/email.vue';
import moduleEditor from '../views/moduleEditor/moduleEditor.vue';
import renameBlock from '../views/renameBlock/renameBlock.vue';
import blockList from '../views/blockList/blockList.vue';
import grid from '../designer/layout';
import gridRender from '@/designer/render';
import { tokenService } from '@/utils/tokenService';
import comsCreate from '../views/comsCreate/comsCreate.vue'
// import { useLoginStore } from '@/store/login';
const routes = [
  {
    path: '/',
    component: home,
    children: [
      { path: '/renameBlock', component: renameBlock },
      { path: '/moduleEditor', component: moduleEditor },
      { path: '/blockList', component: blockList },
      { path: '/comsCreate', component: comsCreate },
    ],
  },
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/email', component: eamil },
  { path: '/grid', component: grid },
  { path: '/render', component: gridRender },
  { path: '', redirect: '/renameBlock' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// const store = useLoginStore();
const pathList = ['/login', '/register'];
router.beforeEach((to, from, next) => {
  const token = tokenService.getTokenInfo();
  if (token) {
    // const userInfo = store.userInfo
    next();
  } else {
    if (pathList.indexOf(to.path) == -1) {
      ElMessage.error('用户未登录,请先登录')
      next('/login');
    }
    next()
  }
});
export default router;
