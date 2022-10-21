/*
 * @Author: sfy
 * @Date: 2022-10-13 21:10:06
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-21 23:13:59
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/index.tsx
 * @Description: update here
 */

import { defineComponent, reactive, onMounted, ref } from "vue";
import useModule from "./effect/useModule";
import CreateColumn from "./components/createColumn";
import useDrawShow from "./effect/useDrawShow";
import useRecordOptions from "./effect/useRecordOptions";
import useRequestRows from "./effect/useRequestRows";
import VulForm from "../vulForm";
import "./index.module.less";

export default defineComponent({
  components: { CreateColumn, VulForm },
  setup() {
    const namespaceName = "111";
    const moduleName = "sam66";

    const tableData = ref<any[]>([]);
    const FormWithModel = ref<InstanceType<any> | null>(null);
    const xTable = ref<InstanceType<any> | null>(null);

    const { moduleInfo, columsInfo } = useModule({ namespaceName, moduleName });

    const { visible, showDrawer, closeDrawer } = useDrawShow();
    const { createRecordEvent } = useRecordOptions({
      FormWithModel,
      closeDrawer,
      xTable,
      useRequestRows
    });

    onMounted(() => {
      useRequestRows({ moduleName }).then((res) => {
        tableData.value = res;
      });
    });

    return () => (
      <>
        <div>
          <vxe-toolbar ref="xToolbar1" custom refresh>
            {{
              buttons() {
                return [
                  <vxe-button icon="vxe-icon-square-plus" onClick={showDrawer}>
                    添加
                  </vxe-button>
                ];
              }
            }}
          </vxe-toolbar>
        </div>
        <vxe-table
          border
          show-overflow
          ref={xTable}
          height="300"
          column-config={{ resizable: true }}
          row-config={{ isHover: true }}
          data={tableData.value}
        >
          <CreateColumn columsInfo={columsInfo.value} tableRef={xTable} />
        </vxe-table>
        <vxe-modal
          v-model={visible.value}
          title="模型编辑"
          width="800"
          minWidth="600"
          minHeight="300"
          showFooter={true}
          onConfirm={createRecordEvent}
          resize
          draggable={false}
          destroy-on-close
        >
          {{
            default() {
              return [<VulForm ref={FormWithModel} />];
            }
          }}
          {/* {{
            footer() {
              return [
                <vxe-button onClick={closeDrawer}>取消</vxe-button>,
                <vxe-button onClick={createRecordEvent}>提交</vxe-button>
              ];
            }
          }} */}
        </vxe-modal>
      </>
    );
  }
});
