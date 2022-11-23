/*
 * @Author: sfy
 * @Date: 2022-10-31 22:06:00
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-23 23:18:18
 * @FilePath: /vulture/src/designer/grid/components/GridOutLine/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onMounted, PropType } from "vue";
import useCreateConfig from "../../effect/useCreateConfig";
import type { TabType } from "../../effect/useTabOptions";
import GridItemList from "../GridItemList";
import "../../index.less";

export default defineComponent({
  props: {
    tabConfig: {
      type: Object as PropType<TabType>
    },
    onChange: {
      type: Function as PropType<(value: any[]) => void>,
      required: true
    }
  },

  setup(props) {
    const layout = ref<any[]>([]);
    const tabNow = ref(props?.tabConfig?.tabKeys[0].name);

    onMounted(() => {
      if (props?.tabConfig?.tabKeys) {
        layout.value = props?.tabConfig?.tabKeys[0].tabLayout || [];
      }
    });

    watch(
      () => tabNow.value,
      (value) => {
        layout.value =
          props?.tabConfig?.tabKeys?.find((tab) => tab.name === value)
            ?.tabLayout || [];
      }
    );

    watch(
      () => layout.value,
      (value) => {
        props.onChange({
          key: props.tabConfig?.name,
          type: props.tabConfig?.type,
          tabNow: tabNow.value,
          tabKey: tabNow.value,
          values: value
        } as any);
      },
      { deep: true }
    );

    return () => (
      <>
        {props?.tabConfig?.tabKeys[0].name !== "display-none" && (
          <el-tabs v-model={tabNow.value} tab-position="top">
            {props.tabConfig?.tabKeys?.map((tab) => {
              return <el-tab-pane label={tab.name} name={tab.name} />;
            })}
          </el-tabs>
        )}

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
      </>
    );
  }
});
