/*
 * @Author: sfy
 * @Date: 2022-10-13 14:50:59
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-23 17:34:12
 * @FilePath: /vulture/src/designer/grid/index.tsx
 * @Description: update here
 */
import { defineComponent, ref } from "vue";
import "./index.moduel.less";

export default defineComponent({
  setup() {
    const layout = ref([{ x: 0, y: 0, w: 2, h: 2, i: "0", static: false }]);
    const draggable = true;
    const resizable = true;
    const index = 0;

    const itemTitle = (item: any) => {
      let result = item.i;
      if (item.static) {
        result += " - Static";
      }
      return result;
    };

    return () => (
      <div>
        <grid-layout
          layout={layout.value}
          col-num={12}
          row-height={30}
          is-draggable={draggable}
          is-resizable={resizable}
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
                <span class="text">{itemTitle(item)}</span>
              </grid-item>
            );
          })}
        </grid-layout>
      </div>
    );
  }
});
