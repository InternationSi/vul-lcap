/*
 * @Author: sfy
 * @Date: 2022-10-25 22:32:54
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-26 22:24:37
 * @FilePath: /vulture/src/designer/grid/components/Spacing/index.tsx
 * @Description: update here
 */

import { defineComponent, ref, watch, onUnmounted } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <div style={{background:'#f2f2f2', width:'100%', height:'100%'}} />
    );
  }
});

