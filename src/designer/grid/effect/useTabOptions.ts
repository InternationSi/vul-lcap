/*
 * @Author: sfy
 * @Date: 2022-11-01 22:22:48
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-01 22:58:10
 * @FilePath: /vulture/src/designer/grid/effect/useTabOptions.ts
 * @Description: update here
 */
import { ref, onMounted, onUnmounted } from "vue";



const useTabOptions = () => {
let tabIndex = 2
const editableTabsValue = ref('main')
const editableTabs = ref([
  {
    title: 'Tab 2',
    name: '2',
  },
  {
    title: 'Tab 3',
    name: '3',
  },
])

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
  })
  editableTabsValue.value = newTabName
}


  return {
    editableTabsValue,
    editableTabs,
    addTab,
  }
}

export default useTabOptions