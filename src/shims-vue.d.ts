/*
 * @Author: sfy
 * @Date: 2022-10-13 11:46:06
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-15 15:06:07
 * @FilePath: /vulture/packages/vul-admin/src/shims-vue.d.ts
 * @Description: update here
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue-grid-layout'