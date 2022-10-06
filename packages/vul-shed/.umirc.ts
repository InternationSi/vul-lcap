/*
 * @Author: sfy
 * @Date: 2022-10-05 20:05:06
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-06 11:26:36
 * @FilePath: /vulture/packages/vul-shed/.umirc.ts
 * @Description: update here
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  // qiankun: {
  //   slave: {},
  // },
});
