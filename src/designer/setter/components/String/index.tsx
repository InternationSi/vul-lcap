/*
 * @Author: sfy
 * @Date: 2022-11-27 22:47:01
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-27 22:48:23
 * @FilePath: /vulture/src/designer/setter/components/String/index.tsx
 * @Description: update here
 */
/*
 * @Author: sfy
 * @Date: 2022-11-20 23:03:58
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-22 23:12:28
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
} from "vue";
import { createUseStyles } from "vue-jss";
import LabelSlot from "../LabelSlot";
const useStyles = createUseStyles({});

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const classesRef = useStyles();
    const str = ref('');
    str.value = props.value;

    return () => {
      const classes = classesRef.value;
      return (
        <LabelSlot title={props.label+ ":"}>
          {{
            default: () => (
              <el-input v-model={str.value} onChange={(value: string) => {
                props.onChange(value);
              }} />
            ),
          }}
        </LabelSlot>
      );
    };
  },
});
