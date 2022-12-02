/*
 * @Author: sfy
 * @Date: 2022-12-01 22:07:28
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-02 23:33:09
 * @FilePath: /vulture/src/designer/setter/components/DataMeta/consts.ts
 * @Description: update here
 */
export const schema = {
  type: 'object',
  properties: {
    dataMeta: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: '',
      items: {
        type: 'object',
        properties: {
          space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              sort: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.SortHandle',
              },
              label: {
                type: 'string',
                title: '标签',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              value: {
                type: 'string',
                title: '值',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              remove: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Remove',
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
}