/*
 * @Author: sfy
 * @Date: 2022-10-23 10:39:23
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-16 22:43:04
 * @FilePath: /vulture/src/designer/layout/components/MaterialPanel/index.tsx
 * @Description: update here
 */
import { defineComponent, ref } from "vue";
import styles from "./index.module.less";
import { nanoid } from "nanoid";
import { useCommunicationStore } from "@/store/transport";
import { materialPanelScheme } from "./consts";

export default defineComponent({
  setup(props) {
    const store = useCommunicationStore();
    const activeTab = ref("base");
    const activeCollapse = ref(materialPanelScheme.map((i, index) => index));

    const block = () => {
      return (
        <div
          class={styles.block}
          onClick={() => {
            store.setCommunication({
              type: "spacing",
              randomId: nanoid()
            });
          }}
        >
          <el-icon>
            <picture-rounded />
          </el-icon>
          <span>间距</span>
        </div>
      );
    };
    const container = () => {
      return (
        <div
          class={styles.block}
          onClick={() => {
            store.setCommunication({
              type: "container-tab",
              randomId: nanoid()
            });
          }}
        >
          <el-icon>
            <picture-rounded />
          </el-icon>
          <span>容器</span>
        </div>
      );
    };

    const chartPie = () => {
      return (
        <div
          class={styles.block}
          onClick={() => {
            store.setCommunication({
              type: "chart-pie",
              randomId: nanoid()
            });
          }}
        >
          <el-icon>
            <picture-rounded />
          </el-icon>
          <span>pie图</span>
        </div>
      );
    };

    return () => (
      <>
        <el-tabs v-model={activeTab.value}>
          <el-tab-pane label="基础" name="base">
            <el-collapse v-model={activeCollapse.value}>
              {materialPanelScheme.map((collapse, index) => {
                return (
                  <el-collapse-item title={collapse.collapseTitle} name={index}>
                    <el-row gutter={10}>
                      {collapse.children.map((card) => {
                        return (
                          <el-col span={8}>
                            <div
                              class={styles.block}
                              onClick={() => {
                                store.setCommunication({
                                  type: card.type,
                                  randomId: nanoid()
                                });
                              }}
                            >
                              <el-icon>
                                <picture-rounded />
                              </el-icon>
                              <span>{card.title}</span>
                            </div>
                          </el-col>
                        );
                      })}
                    </el-row>
                  </el-collapse-item>
                );
              })}
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="精选" name="second">
            精选
          </el-tab-pane>
        </el-tabs>
      </>
    );
  }
});
