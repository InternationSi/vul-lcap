/*
 * @Author: sfy
 * @Date: 2022-10-13 21:10:06
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-22 17:31:21
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/index.tsx
 * @Description: update here
 */

import { defineComponent, reactive, onMounted, ref } from "vue";
import useModule from "./effect/useModule";
import CreateColumn from "./components/createColumn";
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

    const { createRecordEvent } = useRecordOptions({
      FormWithModel,
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
        {/* <vxe-grid v-bind={{}}>
          {{
            form() {
              return [<VulForm ref={FormWithModel} />];
            }
          }}
        </vxe-grid> */}
        <VulForm ref={FormWithModel} />
        <div>
          <vxe-toolbar ref="xToolbar1" custom refresh>
            {{
              buttons() {
                return [];
              }
            }}
          </vxe-toolbar>
        </div>
        <vxe-table
          border
          show-overflow
          keep-source={true}
          ref={xTable}
          data={tableData.value}
          edit-config={{ trigger: "manual", mode: "row" }}
        >
          <CreateColumn columsInfo={columsInfo.value} tableRef={xTable} />
        </vxe-table>
      </>
    );
  }
});
