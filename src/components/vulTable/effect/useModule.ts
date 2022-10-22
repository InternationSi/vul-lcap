/*
 * @Author: sfy
 * @Date: 2022-10-15 11:28:06
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-18 22:31:18
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/effect/useModule.ts
 * @Description: update here
 */
import { moduleFind } from "@/request/index";
import { onMounted, ref, watch } from "vue";
import useCoulumsPorps from "./useColumsProps";
import type { ModuleType, ColumType } from "../type";

interface useModuleType {
  namespaceName: string
  moduleName: string
}

const useModule = ({namespaceName, moduleName}:useModuleType) => {
  const moduleInfo = ref<ModuleType>();
  const columsInfo = ref<ColumType[]>([]);

  onMounted(async () => {
    const res = await moduleFind(namespaceName, moduleName);
    moduleInfo.value = (res?.data as ModuleType) || {};
    const { colums } = useCoulumsPorps(moduleInfo.value);
    columsInfo.value = colums;
  });
  return {
    moduleInfo,
    columsInfo,
  };
};

export default useModule;
