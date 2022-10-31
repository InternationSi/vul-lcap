/*
 * @Author: sfy
 * @Date: 2022-10-27 22:20:21
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-31 23:38:10
 * @FilePath: /vulture/src/designer/grid/components/TabContainer/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted } from "vue";
import GridOutLine from "../GridOutLine";
import Render from "@/designer/render";
import styles from "./index.module.less";
let schema: any[] = [];

export default defineComponent({
  name: "TabContainer",
  components: { GridOutLine, Render },
  setup() {
    const activeTab = ref("first");
    const renderScheme = ref<any[]>([]);
    const containerDrawVis = ref(false);
    const setComDraw = () => {
      containerDrawVis.value = true;
    };

    const confirmClick = () => {
      renderScheme.value = schema;
      console.log(renderScheme.value);
    };

    const gridSchemaChange = (value: any[]) => {
      schema = value;
    };

    return () => (
      <div class={styles.tabBox}>
        <el-tabs v-model={activeTab.value}>
          <el-tab-pane label="User" name="first" />
          <el-tab-pane label="Config" name="second" />
        </el-tabs>
        <div class={styles.tabConBox} onClick={setComDraw}>
          {/* <div class={styles.imageSlot}>
            <el-icon>
              <plus  />
            </el-icon>
          </div> */}
          <Render v-model={renderScheme.value} />
        </div>
        <el-drawer
          v-model={containerDrawVis.value}
          with-header={false}
          append-to-body={true}
          size={600}
        >
          {{
            default: () => <GridOutLine onChange={gridSchemaChange} />,
            footer: () => {
              return (
                <div style={{ flex: "auto" }}>
                  <el-button onClick={() => (containerDrawVis.value = false)}>
                    取消
                  </el-button>
                  <el-button type="primary" onClick={confirmClick}>
                    确定
                  </el-button>
                </div>
              );
            }
          }}
        </el-drawer>
      </div>
    );
  }
});
