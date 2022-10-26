/*
 * @Author: sfy
 * @Date: 2022-10-25 22:32:47
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-26 22:19:11
 * @FilePath: /vulture/src/designer/grid/components/GridItemList/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted } from "vue";
import Spacing from "../Spacing";

export default defineComponent({
  props:{
    config: {
      type: Object,
      require: true
    }
  },
  setup() {
    return () => (
      <Spacing />
    );
  }
});