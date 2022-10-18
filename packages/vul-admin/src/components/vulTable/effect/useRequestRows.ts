/*
 * @Author: sfy
 * @Date: 2022-10-18 22:25:28
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-18 23:11:18
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/effect/useRequestRows.ts
 * @Description: update here
 */

import { onMounted, ref, watch } from "vue";
import { recordListFind } from '@/request'
export interface useRequestRowsType {
  moduleName: string
}

const useRequestRows = async ({ moduleName }: useRequestRowsType) => {
  const res = await recordListFind(moduleName)
  const rowValues = res?.data?.map((item: any) => {
    const { id, values } = item
    return {
      ...values,
      id,
    }
  })
  return rowValues
}

export default useRequestRows