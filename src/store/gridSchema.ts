/*
 * @Author: sfy
 * @Date: 2022-10-29 23:11:02
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-29 23:15:02
 * @FilePath: /vulture/src/store/gridScheme.ts
 * @Description: update here
 */
import { defineStore } from "pinia"
import { ref } from "vue"

export const useCounterStore = defineStore('gridSchema', () => {
  const schema = ref<object>({})
  function changeGridScheme(schemaValue: Record<string, any>) {
    schema.value = schemaValue
  }

  return { schema, changeGridScheme }
})