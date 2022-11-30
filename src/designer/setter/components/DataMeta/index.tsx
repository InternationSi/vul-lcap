/*
 * @Author: sfy
 * @Date: 2022-11-30 22:58:04
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-30 23:01:20
 * @FilePath: /vulture/src/designer/setter/components/DataMeta/index.tsx
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
import JsonEditorVue from 'json-editor-vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
  components:{
    JsonEditorVue
  },
  setup(props) {
    const classesRef = useStyles();
    const str = ref({});
    str.value = props.value;

    return () => {
      const classes = classesRef.value;
      return (
        <LabelSlot title={props.label+ ":"}>
          {{
            default: () => (
              <JsonEditorVue v-model={str.value} mode='text' mainMenuBar={false} statusBar={false}/>
            ),
          }}
        </LabelSlot>
      );
    };
  },
});
