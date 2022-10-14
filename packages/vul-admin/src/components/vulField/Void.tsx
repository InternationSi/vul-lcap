/*
 * @Author: sfy
 * @Date: 2022-10-13 23:14:11
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-13 23:19:09
 * @FilePath: /vulture/packages/vul-admin/src/components/vulField/void.tsx
 * @Description: update here
 */
import { defineComponent } from "vue";
import { createSchemaField } from "@formily/vue";
import { FormItem, ArrayTable, Input, Editable } from "@formily/antdv-x3";
const { SchemaVoidField } = createSchemaField({
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
      <SchemaVoidField x-decorator="FormItem" x-component="ArrayTable.Index" />;
    };
  },
});
