/*
 * @Author: sfy
 * @Date: 2022-10-23 10:39:23
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-25 22:29:21
 * @FilePath: /vulture/src/designer/layout/components/MaterialPanel/index.tsx
 * @Description: update here
 */
import { defineComponent, ref } from "vue";
import styles from "./index.module.less";
import { Subject } from 'rxjs'
export const panelSubject$ = new Subject();

export default defineComponent({
  setup(props) {
    const activeTab = ref("graph");
    const choiceBlock = () => {
      panelSubject$.next("spacing");
    };

    const block = () => {
      return (
        <div class={styles.block} onClick={choiceBlock}>
          <el-icon>
            <picture-rounded />
          </el-icon>
          <span>间距</span>
        </div>
      );
    };

    return () => (
      <>
        <el-tabs v-model={activeTab.value}>
          <el-tab-pane label="图表" name="graph">
            <el-row gutter={10}>
              <el-col span={8}>{block()}</el-col>
              <el-col span={8}>{block()}</el-col>
              <el-col span={8}>{block()}</el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="精选" name="second">
            精选
          </el-tab-pane>
        </el-tabs>
      </>
    );
  }
});
