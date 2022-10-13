/*
 * @Author: sfy
 * @Date: 2022-10-13 23:17:13
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-13 23:19:30
 * @FilePath: /vulture/packages/vul-admin/src/components/vulField/String.tsx
 * @Description: update here
 */
import { defineComponent } from "vue";
import { createSchemaField } from "@formily/vue";
import { FormItem, ArrayTable, Input, Editable } from "@formily/antdv-x3";
const { SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    ArrayTable,
    Input,
    Editable,
  },
});

export default defineComponent({
  setup() {
    return () => {
      <SchemaStringField
        x-decorator="Editable"
        name="a1"
        required={true}
        x-component="Input"
      />;
    };
  },
});
