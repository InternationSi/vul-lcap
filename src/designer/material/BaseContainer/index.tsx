/*
 * @Author: sfy
 * @Date: 2022-11-16 23:04:49
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-01 22:27:26
 * @FilePath: /vulture/src/designer/material/BaseContainer/index.tsx
 * @Description: update here
 */
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  PropType,
  computed
} from "vue";
import GridOutLine from "../../grid/components/GridOutLine";
import Render from "@/designer/render";
import styles from "./index.module.scss";

export default defineComponent({
  name: "BaseContainer",
  props: {
    gItem: {
      type: Object as PropType<any>,
      required: true
    }
  },
  components: { GridOutLine, Render },
  setup(props) {
    const { gItem } = props;

    return () => (
      <>
        {gItem.config?.tabList?.map((co: any) => {
          return (
            <>
              {co?.gridInfo?.value?.length == 0 ? (
                <div class={styles.tabConBox}>
                  <div class={styles.imageSlot}>
                    <el-icon>
                      <plus />
                    </el-icon>
                  </div>
                </div>
              ) : (
                <Render v-model={co.gridInfo} />
              )}
            </>
          );
        })}
      </>
    );
  }
});
