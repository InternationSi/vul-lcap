/*
 * @Author: sfy
 * @Date: 2022-10-27 22:20:21
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-01 22:26:59
 * @FilePath: /vulture/src/designer/material/TabContainer/index.tsx
 * @Description: update here
 */
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  PropType,
  computed,
} from "vue";
import GridOutLine from "../../grid/components/GridOutLine";
import Render from "@/designer/render";
import styles from "./index.module.scss";

export default defineComponent({
  name: "TabContainer",
  props: {
    gItem: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  components: { GridOutLine, Render },
  setup(props) {
    const { gItem } = props;
    const activeTab = ref<string>(gItem.config.tabList[0].name);

    return () => (
      <div class={styles.tabBox}>
        <el-tabs v-model={activeTab.value}>
          {gItem.config?.tabList?.map((co: any) => {
            return (
              <el-tab-pane label={co.title} name={co.name}>
                {co?.gridInfo?.value?.length == 0 ? (
                  <div class={styles.tabConBox} >
                    <div class={styles.imageSlot}>
                      <el-icon>
                        <plus />
                      </el-icon>
                    </div>
                  </div>
                ) : (
                  <Render v-model={co.gridInfo} />
                )}
              </el-tab-pane>
            );
          })}
        </el-tabs>
      </div>
    );
  },
});
