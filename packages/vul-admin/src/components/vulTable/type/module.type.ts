/*
 * @Author: sfy
 * @Date: 2022-10-15 14:04:45
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-15 14:09:31
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/type/module.type.ts
 * @Description: update here
 */
export type FielCateType = "String";

export interface ModuleType {
  id: number;
  label: string;
  moduleName: string;
  namespaceName: string;
  updateUser: string;
  createdAt: string;
  category: string;
  meta: any;
  fields: FieldsType[];
}

export interface FieldsType {
  id: number;
  fieldName: string;
  isPrimary: boolean;
  isUnique: string;
  label: string;
  moduleName: string;
  selfType: FielCateType;
  options: any;
}
