/*
 * @Author: sfy
 * @Date: 2022-10-15 13:56:27
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-19 22:50:09
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
      required: true
    }
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
                }
              }}
            </vxe-column>
          );
        })}
        <vxe-column title="操作" width="100" show-overflow>
          {{
            default({ row }: { row: any }) {
              return [
                <vxe-button type="text" icon="vxe-icon-edit"></vxe-button>,
                <vxe-button type="text" icon="vxe-icon-delete"></vxe-button>
              ];
            }
          }}
        </vxe-column>
      </>
    );
  }
});
