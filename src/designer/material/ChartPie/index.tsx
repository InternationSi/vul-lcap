/*
 * @Author: sfy
 * @Date: 2022-10-25 22:32:54
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-13 00:51:12
 * @FilePath: /vulture/src/designer/material/ChartPie/index.tsx
 * @Description: update here
 */

import { defineComponent, ref, watch, onMounted } from "vue";
import { Rose } from '@antv/g2plot';
export default defineComponent({

  setup() {
    const chartPieDom = ref()
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };

    onMounted(() => {
      console.log(chartPieDom.value, 'chartPieDom');
      const data = [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 5 },
      ];

      const rosePlot = new Rose(chartPieDom.value, {
        data,
        xField: 'type',
        yField: 'value',
        seriesField: 'type',
        radius: 0.9,
        legend: {
          position: 'bottom',
        },
      });
      rosePlot.render();
    })

    return () => (
      <div style={{width:'100%', height: '100%'}} ref={chartPieDom}>
      </div>
    );
  }
});

