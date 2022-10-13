/*
 * @Author: sfy
 * @Date: 2022-10-13 21:10:06
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-13 23:09:45
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/index.tsx
 * @Description: update here
 */

import { defineComponent, ref } from "vue";
import { createForm } from "@formily/core";
import { FormProvider, createSchemaField } from "@formily/vue";
import {
  Submit,
  FormItem,
  ArrayTable,
  Input,
  Editable,
} from "@formily/antdv-x3";
const {
  SchemaArrayField,
  SchemaObjectField,
  SchemaVoidField,
  SchemaStringField,
  SchemaField,
} = createSchemaField({
  components: {
    FormItem,
    ArrayTable,
    Input,
    Editable,
  },
});

export default defineComponent({
  components: {
    FormProvider,
    Submit,
    SchemaField,
    SchemaArrayField,
    SchemaObjectField,
    SchemaVoidField,
    SchemaStringField,
  },
  setup() {
    const form = createForm();
    console.log(form, "formform");

    return () => (
      <div>
        <FormProvider form={form}>
          <SchemaField>
            <SchemaArrayField
              name="array"
              x-decorator="FormItem"
              x-component="ArrayTable"
              x-component-props={{
                pagination: { pageSize: 10 },
                scroll: { x: 800 },
              }}
            >
              <SchemaObjectField>
                <SchemaVoidField
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    width: 80,
                    title: "Index",
                    align: "center",
                  }}
                >
                  <SchemaVoidField
                    x-decorator="FormItem"
                    x-component="ArrayTable.Index"
                  />
                </SchemaVoidField>
                <SchemaVoidField
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    title: "A1",
                    dataIndex: "a1",
                    width: 200,
                  }}
                >
                  <SchemaStringField
                    x-decorator="Editable"
                    name="a1"
                    required={true}
                    x-component="Input"
                  />
                </SchemaVoidField>
                <SchemaVoidField
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: "A2", width: 200 }}
                >
                  <SchemaStringField
                    x-decorator="FormItem"
                    name="a2"
                    required={true}
                    x-component="Input"
                  />
                </SchemaVoidField>
                <SchemaVoidField
                  x-component="ArrayTable.Column"
                  x-component-props={{ title: "A3", width: 200 }}
                >
                  <SchemaStringField
                    name="a3"
                    required={true}
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                </SchemaVoidField>
                <SchemaVoidField
                  x-component="ArrayTable.Column"
                  x-component-props={{
                    title: "Operations",
                    dataIndex: "operations",
                    width: 200,
                    fixed: "right",
                  }}
                >
                  <SchemaVoidField x-component="FormItem">
                    <SchemaVoidField x-component="ArrayTable.Remove" />
                  </SchemaVoidField>
                </SchemaVoidField>
              </SchemaObjectField>
              <SchemaVoidField
                x-component="ArrayTable.Addition"
                title="添加条目"
              />
            </SchemaArrayField>
          </SchemaField>
          <Submit>提交</Submit>
        </FormProvider>
      </div>
    );
  },
});
