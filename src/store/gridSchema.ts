/*
 * @Author: sfy
 * @Date: 2022-10-29 23:11:02
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-27 22:08:53
 * @FilePath: /vulture/src/store/gridSchema.ts
 * @Description: update here
 */
import { defineStore } from "pinia"
import { ref } from "vue"

export const useSchemaStore = defineStore('gridSchema', () => {
  const schema = ref<object>({})
  const clickNowTab = ref<string>('main')
  function changeGridScheme(schemaValue: Record<string, any>) {
    schema.value = schemaValue
  }

  function changeClickTab(value:string) {
    clickNowTab.value = value
    console.log(value, 'valuevalue');
    
  }

  return { schema, changeGridScheme,clickNowTab,changeClickTab }
})