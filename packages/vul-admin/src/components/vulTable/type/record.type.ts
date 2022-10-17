/*
 * @Author: sfy
 * @Date: 2022-10-17 22:12:22
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-17 22:13:26
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/type/record.type.ts
 * @Description: update here
 */

export interface SaveRecordType {
  moduleName: string;
  values: Record<string, any>;
  createUser?: string;
}
