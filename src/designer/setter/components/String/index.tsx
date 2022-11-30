/*
 * @Author: sfy
 * @Date: 2022-11-27 22:47:01
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-30 23:12:40
 * @FilePath: /vulture/src/designer/setter/components/String/index.tsx
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
                if(props.onChange) {
                  props.onChange(value);
                }
              }} />
            ),
          }}
        </LabelSlot>
      );
    };
  },
});
