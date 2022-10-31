/*
 * @Author: sfy
 * @Date: 2022-10-24 22:12:39
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-30 23:15:08
 * @FilePath: /vulture/src/designer/grid/effect/useAddGridItem.ts
 * @Description: update here
 */

import { ref, onMounted, onUnmounted } from "vue";

import { panelSubject$ } from '../../layout/components/MaterialPanel'


const useAddGridItem = () => {
  const itemInfo = ref<any>('')

  onMounted(() => {
    console.log(panelSubject$, 'panelSubject$');
    
    panelSubject$?.subscribe({
      next: (value) => {
        itemInfo.value = value
      },
      error: err => console.error(' error: ' + err),
    })
  })

  onUnmounted(() => {
    console.log(panelSubject$, 'panelSubject$');
    panelSubject$?.unsubscribe()
  })

  return {
    itemInfo
  }
}

export default useAddGridItem