/*
 * @Author: sfy
 * @Date: 2022-10-25 22:32:54
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-27 22:06:37
 * @FilePath: /vulture/src/designer/grid/components/Spacing/index.tsx
 * @Description: update here
 */

import { defineComponent, ref, watch, onUnmounted } from "vue";
import styles from './index.module.less'

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.spaceBox} >
        <span>我是间距</span>
      </div>
    );
  }
});

