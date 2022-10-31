/*
 * @Author: sfy
 * @Date: 2022-10-31 22:06:00
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-31 23:12:41
 * @FilePath: /vulture/src/designer/grid/components/GridOutLine/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted, PropType } from "vue";
import useCreateConfig from "../../effect/useCreateConfig";
import GridItemList from "../GridItemList";
import "../../index.moduel.less";

export default defineComponent({
  props: {
    onChange: {
      type: Function as PropType<(value: any[]) => void>,
      required: true
    }
  },

  setup(props) {
    const layout = ref([{ x: 0, y: 0, w: 2, h: 3, i: "0" }]);

    // watch(
    //   () => itemInfo.value,
    //   (value) => {
    //     layout.value.push(
    //       useCreateConfig({
    //         type: value
    //       })
    //     );
    //   }
    // );

    watch(
      () => layout.value,
      (value) => {
        props.onChange(value);
      },
      { deep: true }
    );

    return () => (
      <grid-layout
        layout={layout.value}
        col-num={12}
        row-height={30}
        is-draggable={true}
        is-resizable={true}
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
