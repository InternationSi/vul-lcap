/*
 * @Author: sfy
 * @Date: 2022-10-17 22:28:04
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-17 23:10:44
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/effect/useRecordOptions.ts
 * @Description: update here
 */
import { Ref } from "vue";

interface RecordOptionsProps {
  FormWithModel: Ref<any>;
}

const useRecordOptions = ({ FormWithModel }: RecordOptionsProps) => {
  const createRecordEvent = async () => {
    const result = await FormWithModel.value?.saveFormData();
  };
  return {
    createRecordEvent,
  };
};

export default useRecordOptions;
