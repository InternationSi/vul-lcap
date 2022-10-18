/*
 * @Author: sfy
 * @Date: 2022-10-15 23:27:14
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-17 21:48:32
 * @FilePath: /vulture/packages/vul-admin/src/components/vulForm/index.tsx
 * @Description: update here
 */
import { defineComponent, reactive, ref, toRefs } from "vue";
import useModule from "../vulTable/effect/useModule";
import { VxeFormPropTypes } from "vxe-table";
import CreateFormItem from "./components/createFormItem";
import useSaveForm from "./effect/useSaveForm";

export default defineComponent({
  components: { CreateFormItem },
  setup(props, { expose }) {
    const formData = ref({});

    const { moduleInfo, columsInfo } = useModule("111", "sam66");
    const { saveFormData } = useSaveForm({
      formData,
      moduleInfo,
    });

    expose({
      formData,
      saveFormData,
    });

    return () => (
      <vxe-form
        data={formData.value}
        titleAlign="right"
        titleWidth="80"
        span="24"
        titleOverflow={true}
        titleColon={true}
      >
        <CreateFormItem columsInfo={columsInfo.value} />
      </vxe-form>
    );
  },
});
