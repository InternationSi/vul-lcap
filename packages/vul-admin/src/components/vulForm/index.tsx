/*
 * @Author: sfy
 * @Date: 2022-10-15 23:27:14
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-16 22:19:04
 * @FilePath: /vulture/packages/vul-admin/src/components/vulForm/index.tsx
 * @Description: update here
 */
import { defineComponent, reactive, ref, toRefs } from "vue";
import useModule from "../vulTable/effect/useModule";
import { VxeFormPropTypes } from "vxe-table";
import CreateFormItem from "./components/createFormItem";

export default defineComponent({
  components: { CreateFormItem },
  setup(props, { expose }) {
    const formData = ref({});
    expose({
      formData,
    });
    const { moduleInfo, columsInfo } = useModule("111", "sam66");

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
