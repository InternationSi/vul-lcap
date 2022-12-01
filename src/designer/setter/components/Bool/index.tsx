/*
 * @Author: sfy
 * @Date: 2022-11-29 23:15:57
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-30 23:13:42
 * @FilePath: /vulture/src/designer/setter/components/Bool/index.tsx
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
      type: Boolean,
      required: true,
    },
    onChange: {
      type: Function,
    },
  },
  setup(props) {
    const classesRef = useStyles();
    const bl = ref(false);
    bl.value = props.value;

    return () => {
      const classes = classesRef.value;
      return (
        <LabelSlot title={props.label+ ":"}>
          {{
            default: () => (
              <el-switch v-model={bl.value} onChange={(value: boolean) => {
                if(props.onChange) {
                  props.onChange(value);
                }
              }}/>
            ),
          }}
        </LabelSlot>
      );
    };
  },
});
