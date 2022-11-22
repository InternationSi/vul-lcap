/*
 * @Author: sfy
 * @Date: 2022-11-22 23:01:49
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-22 23:07:16
 * @FilePath: /vulture/src/designer/setter/components/LabelSlot/index.tsx
 * @Description: update here
 */
/*
 * @Author: sfy
 * @Date: 2022-11-20 23:03:58
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-22 23:02:14
 * @FilePath: /vulture/src/designer/setter/components/Number/index.tsx
 * @Description: update here
 */
import {
  defineComponent,
  ref,
  watch,
  onUnmounted,
  PropType,
  reactive,
  h,
} from "vue";
import { createUseStyles } from "vue-jss";
const useStyles = createUseStyles({});

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },

  },
  setup(props, { slots }) {
    const classesRef = useStyles();

    return () => {
      const classes = classesRef.value;
      return <el-space>{props.title}{
        h('div', (slots as any).default()) 
      }</el-space>;
    };
  },
});
