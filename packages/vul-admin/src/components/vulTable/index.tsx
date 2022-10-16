/*
 * @Author: sfy
 * @Date: 2022-10-13 21:10:06
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-16 14:45:31
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/index.tsx
 * @Description: update here
 */

import { defineComponent, reactive, onMounted, ref } from "vue";
import useModule from "./effect/useModule";
import { VxeFormPropTypes } from "vxe-table";
import CreateColumn from "./components/createColumn";

export default defineComponent({
  components: { CreateColumn },
  setup() {
    const demo1 = reactive({
      submitLoading: false,
      tableData: [] as any[],
      selectRow: null,
      showEdit: false,
      formData: {
        name: "",
        nickname: "",
        role: "",
        sex: "",
        age: "",
        num: "",
        checkedList: [],
        flag1: "",
        date3: "",
        address: "",
      },
      sexList: [
        { label: "女", value: "0" },
        { label: "男", value: "1" },
      ],
      formRules: {
        name: [
          { required: true, message: "请输入名称" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" },
        ],
        nickname: [{ required: true, message: "请输入昵称" }],
        sex: [{ required: true, message: "请选择性别" }],
      } as VxeFormPropTypes.Rules,
    });

    const { moduleInfo, columsInfo } = useModule("111", "sam66");

    return () => (
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
    );
  },
});
