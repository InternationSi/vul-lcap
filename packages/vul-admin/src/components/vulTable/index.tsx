/*
 * @Author: sfy
 * @Date: 2022-10-13 21:10:06
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-18 23:14:36
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

    const namespaceName = "111"
    const moduleName = "sam66"

    const tableData = ref<any[]>([])
    const FormWithModel = ref<InstanceType<any> | null>(null);
    const xTable = ref<InstanceType<any> | null>(null);

    const { moduleInfo, columsInfo } = useModule({namespaceName, moduleName});
    
    const { visible, showDrawer, closeDrawer } = useDrawShow();
    const { createRecordEvent } = useRecordOptions({ FormWithModel,closeDrawer, xTable, useRequestRows });

    onMounted(() => {
      useRequestRows({moduleName}).then(res => {
        tableData.value = res
      })
    })

    return () => (
      <>
        <div>
          <a-button type="primary" onClick={showDrawer}>
            添加
          </a-button>
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
          <CreateColumn columsInfo={columsInfo.value} />
        </vxe-table>
        <a-drawer
          v-model={[visible.value, "visible"]}
          class="custom-class"
          title="模型编辑"
          placement="right"
          width="500"
          footer={
            <a-space>
              <a-button onClick={closeDrawer}>取消</a-button>
              <a-button type="primary" onClick={createRecordEvent}>
                提交
              </a-button>
            </a-space>
          }
        >
          <VulForm ref={FormWithModel} />
        </a-drawer>
      </>
    );
  },
});
