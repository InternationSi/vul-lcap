/*
 * @Author: sfy
 * @Date: 2022-10-13 14:50:59
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-31 22:58:56
 * @FilePath: /vulture/src/designer/grid/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted } from "vue";
import useAddGridItem from "./effect/useAddGridItem";
import useCreateConfig from "./effect/useCreateConfig";
import { nanoid } from "nanoid";
import GridItemList from "./components/GridItemList";
import Operation from "./components/Operation";
import { useSchemaStore } from "@/store/gridSchema";
import "./index.moduel.less";

export default defineComponent({
  setup() {
    const schemaStore = useSchemaStore();
    const { itemInfo } = useAddGridItem();
    const layout = ref<any[]>([
      {
        x: 0,
        y: 0,
        w: 4,
        h: 6,
        i: "jRq-eA8hLx6-vW5e1rJ8M",
        type: "container"
      }
    ]);

    watch(
      () => itemInfo.value,
      (value) => {
        layout.value.push(
          useCreateConfig({
            type: value
          })
        );
      }
    );

    watch(
      () => layout.value,
      (value) => {
        schemaStore.changeGridScheme(value);
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
              <Operation />
            </grid-item>
          );
        })}
      </grid-layout>
    );
  }
});
