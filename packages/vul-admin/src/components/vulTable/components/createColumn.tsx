/*
 * @Author: sfy
 * @Date: 2022-10-15 13:56:27
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-21 23:39:35
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/components/createColumn.tsx
 * @Description: update here
 */

import { defineComponent, PropType, Ref } from "vue";
import { ColumType } from "../type";
import { StringField } from ".././../vulField";
import { VXETable, VxeTableInstance } from "vxe-table";

export default defineComponent({
  props: {
    columsInfo: {
      type: Array as PropType<ColumType[]>,
      required: true
    },
    tableRef: {
      type: Object as any
    }
  },
  setup(props, { slots }) {
    const editRowEvent = (row: any) => {
      const $table = props.tableRef.value;
      $table.setEditRow(row);
      console.log(row, "row");
    };

    const saveRowEvent = () => {
      const $table = props.tableRef.value;
      $table.clearEdit().then(() => {
        setTimeout(() => {
          VXETable.modal.message({ content: "保存成功！", status: "success" });
        }, 300);
      });
    };

    const cancelRowEvent = (row: any) => {
      const $table = props.tableRef.value;
      $table.clearEdit().then(() => {
        // 还原行数据
        $table.revertData(row);
      });
    };

    return () => (
      <>
        {props.columsInfo.map((item: ColumType) => {
          return (
            <vxe-column field={item.fieldName} title={item.title}>
              {{
                default({ row }: { row: any }) {
                  return [<span>{row[item.fieldName]}</span>];
                },
                edit({ row }: { row: any }) {
                  return [
                    <vxe-input
                      v-model={row[item.fieldName]}
                      type="text"
                    ></vxe-input>
                  ];
                }
              }}
            </vxe-column>
          );
        })}
        <vxe-column title="操作" width="100" show-overflow>
          {{
            default({ row }: { row: any }) {
              const $table = props.tableRef.value;
              if ($table.isEditByRow(row)) {
                return [
                  <vxe-button onClick={() => saveRowEvent()}>保存</vxe-button>,
                  <vxe-button onClick={() => cancelRowEvent(row)}>
                    取消
                  </vxe-button>
                ];
              } else {
                return [
                  <vxe-button onClick={() => editRowEvent(row)}>
                    编辑
                  </vxe-button>
                ];
              }
            }
          }}
        </vxe-column>
      </>
    );
  }
});
