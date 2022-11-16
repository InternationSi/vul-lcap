/*
 * @Author: sfy
 * @Date: 2022-11-16 22:06:43
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-16 22:38:29
 * @FilePath: /vulture/src/designer/layout/components/MaterialPanel/consts.ts
 * @Description: update here
 */

export const materialPanelScheme = [
  {
    collapseTitle:'容器组件',
    children: [
      {
        type:'spacing',
        title:'间距',
        icon: 'picture-rounded'
      },
      {
        type:'container-base',
        title:'基础容器',
        icon: 'picture-rounded'
      },
      {
        type:'container-tab',
        title:'tab容器',
        icon: 'picture-rounded'
      },
    ]
  },
  {
    collapseTitle:'图表组件',
    children: [
      {
        type:'chart-pie',
        title:'pie图',
        icon: 'picture-rounded'
      },
    ]
  }


]