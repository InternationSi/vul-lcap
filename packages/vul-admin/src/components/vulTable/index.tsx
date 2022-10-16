/*
 * @Author: sfy
 * @Date: 2022-10-13 21:10:06
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-16 17:32:32
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/index.tsx
 * @Description: update here
 */

import { defineComponent, reactive, onMounted, ref } from "vue";
import useModule from "./effect/useModule";
import { VxeFormPropTypes } from "vxe-table";
import CreateColumn from "./components/createColumn";
import VulForm from "../vulForm";
import "./index.module.less";

export default defineComponent({
  components: { CreateColumn, VulForm },
  setup() {
    const demo1 = reactive({
      tableData: [] as any[],
    });

    const { moduleInfo, columsInfo } = useModule("111", "sam66");

    const visible = ref<boolean>(false);

    const afterVisibleChange = (bool: boolean) => {
      console.log("visible", bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

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
          ref="xTable"
          height="300"
          column-config={{ resizable: true }}
          row-config={{ isHover: true }}
          data={demo1.tableData}
        >
          <CreateColumn columsInfo={columsInfo.value} />
        </vxe-table>
        <a-drawer
          v-model={[visible.value, "visible"]}
          class="custom-class"
          title="模型编辑"
          placement="right"
          width="500"
          afterVisibleChang={afterVisibleChange}
          footer={
            <a-space>
              <a-button>取消</a-button>
              <a-button type="primary">提交</a-button>
            </a-space>
          }
        >
          <VulForm />
        </a-drawer>
      </>
    );
  },
});
