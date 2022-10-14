/*
 * @Author: sfy
 * @Date: 2022-10-12 22:33:09
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:36:41
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/resource/card.ts
 * @Description: update here
 */
import { createResource } from '@designable/core'

const CardSource = createResource({
  title: {
    'zh-CN': '卡片',
    'en-US': 'Card',
  },
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Card',
      props: {
        title: '卡片',
      },
    },
  ],
})
export default CardSource