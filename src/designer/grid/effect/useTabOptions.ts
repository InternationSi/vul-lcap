/*
 * @Author: sfy
 * @Date: 2022-11-01 22:22:48
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-02 23:25:07
 * @FilePath: /vulture/src/designer/grid/effect/useTabOptions.ts
 * @Description: update here
 */
import { ref, onMounted, onUnmounted } from "vue";

export interface TabType {
  title:string,
  name:string,
}

const useTabOptions = () => {
const editableTabsValue = ref('main')
const editableTabs = ref<TabType[]>([])

const addTab = (info:TabType) => {
  const {title, name} = info
  editableTabs.value.push({
    title,
    name,
  })
}


  return {
    editableTabsValue,
    editableTabs,
    addTab,
  }
}

export default useTabOptions