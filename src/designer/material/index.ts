/*
 * @Author: sfy
 * @Date: 2022-11-20 16:06:17
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-27 22:38:52
 * @FilePath: /vulture/src/designer/material/index.ts
 * @Description: update here
 */
import BaseContainer from './BaseContainer'
import ChartPie, {ChartPieMetaSetter} from './ChartPie'
import Spacing from './Spacing'
import TabContainer from './TabContainer'

const metaComponentsSetter:any = {
  'chart-pie': ChartPieMetaSetter
}

export {
  BaseContainer,
  ChartPie,
  Spacing,
  TabContainer,
  metaComponentsSetter,
}