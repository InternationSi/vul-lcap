import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const v = createApp(App)
v.use(router)
v.mount('#app')