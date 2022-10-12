/*
 * @Author: sfy
 * @Date: 2022-10-12 22:43:29
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:43:30
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/behaviors/root.ts
 * @Description: update here
 */

import { createBehavior } from '@designable/core'

const RootBehavior = createBehavior({
  name: 'Root',
  selector: 'Root',
  designerProps: {
    droppable: true,
  },
  designerLocales: {
    'zh-CN': {
      title: '根组件',
    },
    'en-US': {
      title: 'Root',
    },
    'ko-KR': {
      title: '루트',
    },
  },
})
export default RootBehavior