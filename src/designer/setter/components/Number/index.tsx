/*
 * @Author: sfy
 * @Date: 2022-11-20 23:03:58
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-30 23:09:58
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
      type: Number,
      required: true,
    },
    onChange: {
      type: Function,
    },
  },
  setup(props) {
    const classesRef = useStyles();
    const num = ref(0);
    num.value = props.value;

    return () => {
      const classes = classesRef.value;
      return (
        <LabelSlot title={props.label+ ":"}>
          {{
            default: () => (
              <el-input-number  
                v-model={num.value}
                min={0}
                max={12}
                onChange={(value: number) => {
                  if(props.onChange) {
                    props.onChange(value);
                  }
                }}
              />
            ),
          }}
        </LabelSlot>
      );
    };
  },
});
