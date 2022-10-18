/*
 * @Author: sfy
 * @Date: 2022-10-17 21:36:24
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-17 22:26:15
 * @FilePath: /vulture/packages/vul-admin/src/components/vulForm/effect/useSaveForm.ts
 * @Description: update here
 */
import type { Ref } from "vue";
import type { ModuleType } from "../../vulTable/type/module.type";
import { recordCreate } from "@/request";

interface SaveFormProps {
  formData: Ref<Record<string, any>>;
  moduleInfo: Ref<ModuleType | undefined>;
}

const useSaveForm = ({ formData, moduleInfo }: SaveFormProps) => {
  const saveFormData = async () => {
    const params = {
      moduleName: moduleInfo.value!.moduleName,
      values: formData.value,
    };
    const result = await recordCreate(params);
    return result;
  };
  return {
    saveFormData,
  };
};

export default useSaveForm;
