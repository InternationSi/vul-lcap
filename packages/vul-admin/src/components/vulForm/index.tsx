/*
 * @Author: sfy
 * @Date: 2022-10-15 23:27:14
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-16 14:45:44
 * @FilePath: /vulture/packages/vul-admin/src/components/vulForm/index.tsx
 * @Description: update here
 */
import { defineComponent, reactive, onMounted, ref } from "vue";
import useModule from "../vulTable/effect/useModule";
import { VxeFormPropTypes } from "vxe-table";
import CreateFormItem from "./components/createFormItem";

export default defineComponent({
  components: { CreateFormItem },
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
    });

    const { moduleInfo, columsInfo } = useModule("111", "sam66");

    return () => (
      <vxe-form data={demo1.formData} titleAlign="right" title-width="100">
        <CreateFormItem columsInfo={columsInfo.value} />
      </vxe-form>
    );
  },
});
