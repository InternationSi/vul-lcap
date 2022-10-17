/*
 * @Author: sfy
 * @Date: 2022-10-15 13:56:27
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-16 14:44:24
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/components/createColumn.tsx
 * @Description: update here
 */

import row from "ant-design-vue/es/row";
import { defineComponent, PropType } from "vue";
import { ColumType } from "../type";
import { StringField } from ".././../vulField";
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
        {props.columsInfo.map((item: ColumType) => {
          return (
            <vxe-column field={item.fieldName} title={item.title}>
              {{
                edit({ row }: { row: any }) {
                  return [<StringField v-model={row[item.fieldName]} />];
                },
              }}
            </vxe-column>
          );
        })}
        <vxe-column title="操作" width="100" show-overflow></vxe-column>
      </>
    );
  },
});
