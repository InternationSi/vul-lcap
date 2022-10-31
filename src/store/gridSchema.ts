/*
 * @Author: sfy
 * @Date: 2022-10-29 23:11:02
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-30 14:46:10
 * @FilePath: /vulture/src/store/gridSchema.ts
 * @Description: update here
 */
import { defineStore } from "pinia"
import { ref } from "vue"

export const useSchemaStore = defineStore('gridSchema', () => {
  const schema = ref<object>({})
  function changeGridScheme(schemaValue: Record<string, any>) {
    schema.value = schemaValue
  }

  return { schema, changeGridScheme }
})