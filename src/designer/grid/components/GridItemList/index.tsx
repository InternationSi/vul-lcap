/*
 * @Author: sfy
 * @Date: 2022-10-25 22:32:47
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-13 23:01:57
 * @FilePath: /vulture/src/designer/grid/components/GridItemList/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted, PropType } from "vue";
import Spacing from "../../../material/Spacing";
import TabContainer from "../../../material/TabContainer";
import ChartPie from '../../../material/ChartPie'
import Operation from "../../../../components/Operation";
export default defineComponent({
  props: {
    config: {
      type: Object as PropType<Record<string, any>>,
      require: true
    },
    itemIndex: {
      type: Number as any
    },
    handleDelete: {
      type: Function as any
    },
    handleEdit: {
      type: Function as any
    }
  },
  setup(props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const {itemIndex } = props;
    const renderComponents = (config:any) => {
      if (config?.type === "container-tab") {
        return <TabContainer gItem={config} />;
      } else if (config?.type === "chart-pie") {
        return <ChartPie />
      }else {
        return <Spacing />;
      }
    };
    const deleteItem = (value: number) => {
      props.handleDelete(value);
    };
    const editItem = (value: any) => {
      props.handleEdit(value);
    };

    return () => (
      <>
        {renderComponents(props.config)}
        <Operation
          itemIndex={itemIndex}
          handleDelete={deleteItem}
          handleEdit={editItem}
        />
      </>
    );
  }
});
