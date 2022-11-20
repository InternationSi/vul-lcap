/*
 * @Author: sfy
 * @Date: 2022-11-20 23:03:58
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-20 23:55:28
 * @FilePath: /vulture/src/designer/setter/components/Number/index.tsx
 * @Description: update here
 */
import {
  defineComponent,
  ref,
  watch,
  onUnmounted,
  PropType,
  reactive
} from "vue";
import { createUseStyles } from "vue-jss";
const useStyles = createUseStyles({
  setterBox: {
    width: "100%",
    minHeight: "40vh",
    display: "flex"
  },
  viewBox: {
    width: "40%"
  },
  tabBox: {
    width: "100%"
  }
});

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const classesRef = useStyles();
    const num = ref(0);
    num.value = props.value;

    return () => {
      const classes = classesRef.value;
      return (
        <el-input-number
          v-model={num.value}
          min={0}
          max={12}
          onChange={(value: number) => {
            props.onChange(value);
          }}
        />
      );
    };
  }
});
