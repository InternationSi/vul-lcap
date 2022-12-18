/*
 * @Author: sfy
 * @Date: 2022-10-25 22:32:54
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-18 22:07:41
 * @FilePath: /vulture/src/designer/material/ChartPie/index.tsx
 * @Description: update here
 */

import { defineComponent, ref, watch, onMounted } from "vue";
import { Rose } from "@antv/g2plot";
export * from './meta'
export default defineComponent({
  props: {
    isDesign: {
      type: Boolean,
      default: true
    },
    layout: {
      type: Object as any,
      required: true
    }

  },
  setup(props) {
    const chartPieDom = ref();

    onMounted(() => {
      const data = [
        { type: "分类一", value: 27 },
        { type: "分类二", value: 25 },
        { type: "分类三", value: 18 },
        { type: "分类四", value: 15 },
        { type: "分类五", value: 10 },
        { type: "其他", value: 5 }
      ];

      const rosePlot = new Rose(chartPieDom.value, {
        data,
        xField: "type",
        yField: "value",
        seriesField: "type",
        radius: 0.9,
        legend: {
          position: "bottom"
        }
      });
      rosePlot.render();
    });

    return () => (
      <div style={{ width: "100%", height: "100%", background: '#fff' }} ref={chartPieDom}></div>
    );
  }
});
