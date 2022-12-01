/*
 * @Author: sfy
 * @Date: 2022-10-25 22:32:54
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-01 22:27:06
 * @FilePath: /vulture/src/designer/material/Spacing/index.tsx
 * @Description: update here
 */

import { defineComponent, ref, watch, onUnmounted } from "vue";
import styles from './index.module.scss'

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.spaceBox} >
        <span>我是间距</span>
      </div>
    );
  }
});

