/*
 * @Author: sfy
 * @Date: 2022-11-30 22:58:04
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-01 22:31:11
 * @FilePath: /vulture/src/designer/setter/components/DataMeta/index.tsx
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
import LabelSlot from "../LabelSlot";
const useStyles = createUseStyles({});
import { createForm } from "@formily/core";
import { FormProvider, createSchemaField } from "@formily/vue";
import {
  Submit,
  FormItem,
  Space,
  Input,
  Select,
  DatePicker,
  ArrayItems
} from "@formily/element-plus";
import { schema } from "./consts";

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Space,
    Input,
    Select,
    DatePicker,
    ArrayItems
  }
});

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    onChange: {
      type: Function,
    }
  },

  setup(props) {
    const classesRef = useStyles();
    const str = ref({});
    str.value = props.value;

    return () => {
      const classes = classesRef.value;
      const form = createForm();

      return (
        <LabelSlot title={props.label + ":"}>
          {{
            default: () => (
              <FormProvider form={form}>
                <SchemaField schema={schema} />
              </FormProvider>
            )
          }}
        </LabelSlot>
      );
    };
  }
});
