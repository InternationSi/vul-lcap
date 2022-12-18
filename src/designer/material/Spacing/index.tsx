/*
 * @Author: sfy
 * @Date: 2022-10-25 22:32:54
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-18 22:19:51
 * @FilePath: /vulture/src/designer/material/Spacing/index.tsx
 * @Description: update here
 */

import { defineComponent, ref, watch, onUnmounted } from "vue";
import styles from './index.module.scss'

export default defineComponent({
  props: {
    isDesign: {
      type: Boolean,
      default: true
    },
  },
  setup(props) {
    const boxStyle = !props.isDesign ? {
      opacity: 0,
    } : {}

    return () => (
      <div class={styles.spaceBox} style={boxStyle} >
        <span>我是间距</span>
      </div>
    );
  }
});

