/*
 * @Author: sfy
 * @Date: 2022-11-01 22:22:48
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-12 14:18:50
 * @FilePath: /vulture/src/designer/grid/effect/useTabOptions.ts
 * @Description: update here
 */
import { ref, onMounted, onUnmounted } from "vue";

export interface TabType {
  title:string,
  name:string,
  type: string,
  tabKeys: {
    name:string
    tabLayout: any[]
  }[]
}

const useTabOptions = () => {
const editableTabsValue = ref('main')
const editableTabs = ref<TabType[]>([])

const addTab = (info:TabType) => {
  editableTabs.value.push({
    ...info
  })
}


  return {
    editableTabsValue,
    editableTabs,
    addTab,
  }
}

export default useTabOptions