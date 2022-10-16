/*
 * @Author: sfy
 * @Date: 2022-10-16 13:51:43
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-16 14:09:25
 * @FilePath: /vulture/packages/vul-admin/src/components/vulForm/components/createFormItem.tsx
 * @Description: update here
 */

import { defineComponent, PropType } from "vue";
import { ColumType } from "../../vulTable/type";
import { StringField } from "../../vulField";

export default defineComponent({
  props: {
    columsInfo: {
      type: Array as PropType<ColumType[]>,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => (
      <>
        {props?.columsInfo?.map((item: ColumType, index: number) => {
          return (
            <vxe-form-item
              key={index}
              field={item.fieldName}
              title={item.title}
            >
              {{
                default({ item }: { item: ColumType }) {
                  return [<StringField v-model={item.fieldName} />];
                },
              }}
            </vxe-form-item>
          );
        })}
      </>
    );
  },
});
