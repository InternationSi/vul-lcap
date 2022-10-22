/*
 * @Author: sfy
 * @Date: 2022-10-15 11:25:55
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-15 14:32:27
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/effect/useColumsProps.ts
 * @Description: update here
 */
import type { ModuleType, FieldsType, ColumType } from "../type";

const useColumsProps = (moduleInfo: ModuleType) => {
  if (!moduleInfo?.fields) return { colums: [] };
  const colums: ColumType[] = moduleInfo.fields.map((item: FieldsType) => {
    const { fieldName, selfType, label } = item;
    return {
      type: selfType,
      fieldName: fieldName,
      title: label,
    };
  });

  return {
    colums,
  };
};

export default useColumsProps;
