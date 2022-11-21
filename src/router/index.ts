/*
 * @Author: sfy
 * @Date: 2022-10-04 17:15:33
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-21 22:50:50
 * @FilePath: /vulture/src/router/index.ts
 * @Description: update here
 */
import { createRouter, createWebHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import home from '../views/layout/layout.vue';
import login from '../views/login/login.vue';
import register from '../views/register/register.vue';
import email from '../views/email/email.vue';
import moduleEditor from '../views/moduleEditor/moduleEditor.vue';
import renameBlock from '../views/renameBlock/renameBlock.vue';
import blockList from '../views/blockList/blockList.vue';
import grid from '../designer/layout';
import gridRender from '@/designer/render';
import { tokenService } from '@/utils/tokenService';
import comsCreate from '../views/comsCreate/comsCreate.vue'
import personalCenter from '../views/personalCenter'
import blockly from '../views/blockly/index.vue'
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
      { path: '/blockly', component: blockly },
    ],
  },
  { path: '/login', component: login },
  { path: '/register', component: register },
  { path: '/email', component: email },
  { path: '/grid', component: grid },
  { path: '/render', component: gridRender },
  { path: '', redirect: '/renameBlock' },
  { path: '/personalCenter', component: personalCenter },
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
