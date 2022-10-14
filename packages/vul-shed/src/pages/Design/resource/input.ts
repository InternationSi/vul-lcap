/*
 * @Author: sfy
 * @Date: 2022-10-12 22:32:10
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:37:20
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/resource/input.ts
 * @Description: update here
 */
import { createResource } from '@designable/core'

const InputSource = createResource({
  title: {
    'zh-CN': '输入框',
    'en-US': 'Input',
    'ko-KR': '입력 상자',
  },
  icon: 'InputSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: '输入框',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  ],
})

export default InputSource