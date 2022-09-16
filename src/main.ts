import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style.css'
import App from './App.vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import router from './router'

const v = createApp(App)

v.use(Antd)
v.use(router)
v.use(VXETable)
v.mount('#app')