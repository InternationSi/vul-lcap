/*
 * @Author: sfy
 * @Date: 2022-11-01 22:22:48
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-11 23:36:12
 * @FilePath: /vulture/src/designer/grid/effect/useTabOptions.ts
 * @Description: update here
 */
import { ref, onMounted, onUnmounted } from "vue";

export interface TabType {
  title:string,
  name:string,
  tabKeys: {
    name:string
  }[]
}

const useTabOptions = () => {
const editableTabsValue = ref('main')
const editableTabs = ref<TabType[]>([])

const addTab = (info:TabType) => {
  const {title, name, tabKeys} = info
  editableTabs.value.push({
    title,
    name,
    tabKeys,
  })
}


  return {
    editableTabsValue,
    editableTabs,
    addTab,
  }
}

export default useTabOptions