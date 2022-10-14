/*
 * @Author: sfy
 * @Date: 2022-10-05 20:05:06
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-10 23:38:34
 * @FilePath: /vulture/packages/vul-shed/.umirc.ts
 * @Description: update here
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/Design/index' },
  ],
  fastRefresh: {},
  // qiankun: {
  //   slave: {},
  // },
});
