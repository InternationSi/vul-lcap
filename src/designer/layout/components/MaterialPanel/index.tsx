/*
 * @Author: sfy
 * @Date: 2022-10-23 10:39:23
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-27 22:18:22
 * @FilePath: /vulture/src/designer/layout/components/MaterialPanel/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch } from "vue";
import styles from "./index.module.less";
import { nanoid } from "nanoid";
import { useCommunicationStore } from "@/store/transport";
import { materialPanelScheme } from "./consts";
import { useSchemaStore } from "@/store/gridSchema";

export default defineComponent({
  setup(props) {
    const store = useCommunicationStore();
    const activeTab = ref("base");
    const activeCollapse = ref(materialPanelScheme.map((i, index) => index));
    const schemaStore = useSchemaStore();
    const collapseList = ref([...materialPanelScheme])


    watch(() => schemaStore.clickNowTab,
      (name) => {
        console.log(materialPanelScheme, '99value');
        if(name !== 'main') {
          const delIndex = materialPanelScheme.findIndex(item => item.collapseName == 'container-components')
          collapseList.value.splice(delIndex, 1)
        } else {
          collapseList.value = materialPanelScheme
        } 
      }
    )

    return () => (
      <>
        <el-tabs v-model={activeTab.value}>
          <el-tab-pane label="基础" name="base">
            <el-collapse v-model={activeCollapse.value}>
              {collapseList.value.map((collapse, index) => {
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
