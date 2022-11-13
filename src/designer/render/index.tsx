/*
 * @Author: sfy
 * @Date: 2022-10-13 14:50:59
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-13 21:25:16
 * @FilePath: /vulture/src/designer/render/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted, PropType } from "vue";
import GridItemList from "../grid/components/GridItemList";

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
    const layout = ref<any[]>([{ x: 0, y: 0, w: 2, h: 3, i: "0" }]);

    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          layout.value = newValue;
        }
      },
      {
        deep: true
      }
    );

    return () => (
      <grid-layout
        layout={layout.value}
        col-num={12}
        row-height={30}
        is-draggable={false}
        is-resizable={false}
        vertical-compact={true}
        use-css-transforms={true}
      >
        {layout.value.map((item: any, index: number) => {
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
              <GridItemList config={item} />
            </grid-item>
          );
        })}
      </grid-layout>
    );
  }
});
