/*
 * @Author: sfy
 * @Date: 2022-10-25 22:32:47
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-18 21:51:59
 * @FilePath: /vulture/src/designer/grid/components/GridItemList/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted, PropType } from "vue";
import Operation from "../../../../components/Operation";
import {
  Spacing,
  TabContainer,
  ChartPie,
  BaseContainer
} from "@/designer/material";
export default defineComponent({
  props: {
    config: {
      type: Object as PropType<Record<string, any>>,
      require: true
    },
    itemIndex: {
      type: Number as PropType<number>
    },
    handleDelete: {
      type: Function as PropType<(val: number) => void>
    },
    handleEdit: {
      type: Function as PropType<(val: boolean) => void>
    },
    isDesign: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { itemIndex } = props;
    const renderComponents = (config: any) => {
      if (config?.type === "container-tab") {
        return <TabContainer gItem={config} />;
      } else if (config?.type === "chart-pie") {
        return <ChartPie layout={config} isDesign={props.isDesign} />;
      } else if (config?.type === "container-base") {
        return <BaseContainer gItem={config} />;
      } else {
        return <Spacing isDesign={props.isDesign} />;
      }
    };
    const deleteItem = (value: number) => {
      props.handleDelete && props.handleDelete(value);
    };
    const editItem = (value: any) => {
      props.handleEdit && props.handleEdit(value);
    };

    return () => (
      <>
        {renderComponents(props.config)}
        {props?.isDesign && (
          <Operation
            itemIndex={itemIndex}
            handleDelete={deleteItem}
            handleEdit={editItem}
          />
        )}
      </>
    );
  }
});
