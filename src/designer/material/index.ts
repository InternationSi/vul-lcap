/*
 * @Author: sfy
 * @Date: 2022-11-20 16:06:17
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-28 22:42:22
 * @FilePath: /vulture/src/designer/material/index.ts
 * @Description: update here
 */
import BaseContainer from './BaseContainer'
import ChartPie, {ChartPieMetaSetter} from './ChartPie'
import { MetaType } from './index.type'
import Spacing from './Spacing'
import TabContainer from './TabContainer'

const metaComponentsSetter:Record<string,MetaType[]> = {
  'chart-pie': ChartPieMetaSetter
}

export {
  BaseContainer,
  ChartPie,
  Spacing,
  TabContainer,
  metaComponentsSetter,
}