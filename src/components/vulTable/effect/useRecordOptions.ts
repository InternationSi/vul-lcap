/*
 * @Author: sfy
 * @Date: 2022-10-17 22:28:04
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-22 17:19:41
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/effect/useRecordOptions.ts
 * @Description: update here
 */
import { Ref } from "vue";
import type { useRequestRowsType } from "./useRequestRows";
interface RecordOptionsProps {
  FormWithModel: Ref<any>;
  xTable: Ref<InstanceType<any> | null>;
  useRequestRows: (o: useRequestRowsType) => Promise<any>;
}

const useRecordOptions = ({
  FormWithModel,
  xTable,
  useRequestRows
}: RecordOptionsProps) => {
  const createRecordEvent = async () => {
    const result = await FormWithModel.value?.saveFormData();
    if (result.msg) {
      const moduleName = result?.data?.moduleName as string;
      useRequestRows({ moduleName }).then((res) => {
        xTable.value.reloadData(res);
      });
    }
  };
  return {
    createRecordEvent
  };
};

export default useRecordOptions;
