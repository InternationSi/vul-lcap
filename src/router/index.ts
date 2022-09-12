import vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import home from '../views/home/home.vue'
import login from '../views/login/login.vue'
import eamil from '../views/email/email.vue'
const routes = [
    { path: '/home', component: home },
    { path: '/login', component: login },
    { path: '', redirect: "/home" },
    { path: '/email', component: eamil },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes, 
  })
  export default router