/*
 * @Author: sfy
 * @Date: 2022-11-27 22:26:57
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-30 22:53:53
 * @FilePath: /vulture/src/designer/material/ChartPie/meta.ts
 * @Description: update here
 */
import type { MetaType } from '../index.type'

export const ChartPieMetaSetter:MetaType[] = [
  {
    name: "title",
    label: "标题",
    type: "StringSetter",
    initValue: '饼图',
  },
  {
    name: "testBool",
    label: "是否",
    type: "BoolSetter",
    initValue: false,
  },
  {
    name: "jsontest",
    label: "jsontest",
    type: "JsonSetter",
    initValue: {},
  },
]