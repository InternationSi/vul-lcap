/*
 * @Author: sfy
 * @Date: 2022-10-13 14:50:59
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-18 22:19:40
 * @FilePath: /vulture/src/designer/render/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted, PropType } from "vue";
import GridItemList from "../grid/components/GridItemList";
import './index.scss'
export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<any[]>
    },
    "update:modelValue": {
      type: Function as PropType<(v: any[]) => void>,
      default: undefined
    }
  },
  setup(props) {

    return () => (
      <grid-layout
        class="renderGrid"
        layout={props.modelValue}
        col-num={12}
        row-height={30}
        is-draggable={false}
        is-resizable={false}
        vertical-compact={true}
        use-css-transforms={true}
      >
        {props.modelValue?.map((item: any, index: number) => {
          return (
            <grid-item
              key={index}
              static={item.static}
              x={item.x}
              y={item.y}
              w={item.w}
              h={item.h}
              i={item.i}
            >
              <GridItemList config={item} isDesign={false} />
            </grid-item>
          );
        })}
      </grid-layout>
    );
  }
});
