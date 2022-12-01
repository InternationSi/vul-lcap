/*
 * @Author: sfy
 * @Date: 2022-10-22 22:27:32
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-01 22:28:01
 * @FilePath: /vulture/src/designer/layout/components/drawer/index.tsx
 * @Description: update here
 */
import { defineComponent, ref } from "vue";
import { Setting, Notification } from "@element-plus/icons-vue";
import styles from "./index.module.scss";

export default defineComponent({
  props: {
    closeDrawer: {
      type: Function
    }
  },
  components: { Setting, Notification },
  setup(props, { slots }) {
    return () => (
      <div class={styles.drawerBox}>
        <div class={styles.drawerHeaad}>
          <el-icon onClick={props.closeDrawer}>
            <close />
          </el-icon>
        </div>
        <div>{(slots as any).default()}</div>
      </div>
    );
  }
});
