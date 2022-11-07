/*
 * @Author: sfy
 * @Date: 2022-10-27 22:20:21
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-07 23:18:51
 * @FilePath: /vulture/src/designer/grid/components/TabContainer/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted, PropType } from "vue";
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
  setup({ gItem }) {
    const activeTab = ref<string>(gItem.config.tabList[0].name);
    const renderScheme = ref<any[]>(gItem.config.tabList[0].gridInfo);
    const setComDraw = () => {
      console.log("22");
    };

    watch(
      () => activeTab.value,
      (value) => {
        renderScheme.value =
          gItem.config?.tabList?.find((tab: any) => tab.name === value) || [];
      }
    );

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
        {/* <el-drawer
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
        </el-drawer> */}
      </div>
    );
  }
});
