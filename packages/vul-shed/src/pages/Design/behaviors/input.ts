/*
 * @Author: sfy
 * @Date: 2022-10-12 22:44:59
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:45:00
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/behaviors/input.ts
 * @Description: update here
 */

import { createBehavior } from '@designable/core'

const InputBehavior = createBehavior({
  name: 'Input',
  selector: (node:any) =>
    node.componentName === 'Field' && node.props['x-component'] === 'Input',
  designerProps: {
    propsSchema: {
      type: 'object',
      $namespace: 'Field',
      properties: {
        'field-properties': {
          type: 'void',
          'x-component': 'CollapseItem',
          title: '字段属性',
          properties: {
            title: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },

            hidden: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
            },
            default: {
              'x-decorator': 'FormItem',
              'x-component': 'ValueInput',
            },
            test: {
              type: 'void',
              title: '测试',
              'x-decorator': 'FormItem',
              'x-component': 'DrawerSetter',
              'x-component-props': {
                text: '打开抽屉',
              },
              properties: {
                test: {
                  type: 'string',
                  title: '测试输入',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
          },
        },

        'component-styles': {
          type: 'void',
          title: '样式',
          'x-component': 'CollapseItem',
          properties: {
            'style.width': {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'SizeInput',
            },
            'style.height': {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'SizeInput',
            },
            'style.display': {
              'x-component': 'DisplayStyleSetter',
            },
            'style.background': {
              'x-component': 'BackgroundStyleSetter',
            },
            'style.boxShadow': {
              'x-component': 'BoxShadowStyleSetter',
            },
            'style.font': {
              'x-component': 'FontStyleSetter',
            },
            'style.margin': {
              'x-component': 'BoxStyleSetter',
            },
            'style.padding': {
              'x-component': 'BoxStyleSetter',
            },
            'style.borderRadius': {
              'x-component': 'BorderRadiusStyleSetter',
            },
            'style.border': {
              'x-component': 'BorderStyleSetter',
            },
          },
        },
      },
    },
  },
  designerLocales: {
    'zh-CN': {
      title: '输入框',
      settings: {
        title: '标题',
        hidden: '是否隐藏',
        default: '默认值',
        style: {
          width: '宽度',
          height: '高度',
          display: '展示',
          background: '背景',
          boxShadow: '阴影',
          font: '字体',
          margin: '外边距',
          padding: '内边距',
          borderRadius: '圆角',
          border: '边框',
        },
      },
    },
    'en-US': {
      title: 'Input',
      settings: {
        title: 'Title',
        hidden: 'Hidden',
        default: 'Default Value',
        style: {
          width: 'Width',
          height: 'Height',
          display: 'Display',
          background: 'Background',
          boxShadow: 'Box Shadow',
          font: 'Font',
          margin: 'Margin',
          padding: 'Padding',
          borderRadius: 'Border Radius',
          border: 'Border',
        },
      },
    },
  },
})

export default InputBehavior