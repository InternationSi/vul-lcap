/*
 * @Author: sfy
 * @Date: 2022-10-27 22:20:21
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-27 22:30:53
 * @FilePath: /vulture/src/designer/grid/components/TabContainer/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted } from "vue";
import styles from './index.module.less'

export default defineComponent({
  setup() {

    const activeTab = ref('first')

    return () => (
      <div class={styles.tabBox} >
        <el-tabs v-model={activeTab.value} >
          <el-tab-pane label="User" name="first">User</el-tab-pane>
          <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        </el-tabs>
      </div>
    );
  }
});

