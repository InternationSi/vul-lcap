/*
 * @Author: sfy
 * @Date: 2022-10-27 22:20:21
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-11 23:56:14
 * @FilePath: /vulture/src/designer/grid/components/TabContainer/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onMounted, PropType, computed } from "vue";
import GridOutLine from "../GridOutLine";
import Render from "@/designer/render";
import styles from "./index.module.less";
let schema: any[] = [];

export default defineComponent({
  name: "TabContainer",
  props: {
    gItem: {
      type: Object as PropType<any>,
      required: true
    }
  },
  components: { GridOutLine, Render },
  setup(props) {
    const {gItem} = props
    const activeTab = ref<string>(gItem.config.tabList[0].name);
    const renderScheme = ref<any[]>(gItem.config.tabList[0].gridInfo);

    
    const setComDraw = () => {
      console.log("22");
    };

    watch(
        () => gItem,
        (value) => {
          renderScheme.value =
          gItem.config?.tabList?.find((tab: any) => tab.name === activeTab.value)?.gridInfo
          || [];

        },
        {
          deep: true
        }
      )

    // const confirmClick = () => {
    //   renderScheme.value = schema;
    //   console.log(renderScheme.value);
    // };

    const gridSchemaChange = (value: any[]) => {
      schema = value;
    };

    return () => (
      <div class={styles.tabBox}>
        <el-tabs v-model={activeTab.value}>
          {gItem.config?.tabList?.map((co: any) => {
            return <el-tab-pane label={co.title} name={co.name} />;
          })}
        </el-tabs>
        {renderScheme.value.length == 0 ? (
          <div class={styles.tabConBox} onClick={setComDraw}>
            <div class={styles.imageSlot}>
              <el-icon>
                <plus />
              </el-icon>
            </div>
          </div>
        ) : (
          <Render v-model={renderScheme.value} />
        )}
      </div>
    );
  }
});
