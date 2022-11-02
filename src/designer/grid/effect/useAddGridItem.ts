/*
 * @Author: sfy
 * @Date: 2022-10-24 22:12:39
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-02 22:34:11
 * @FilePath: /vulture/src/designer/grid/effect/useAddGridItem.ts
 * @Description: update here
 */

import { useCommunicationStore } from "@/store/transport";
import type {CommunicationInfoType} from '@/store/transport'
import { ref, onMounted, onUnmounted } from "vue";

const useAddGridItem = () => {
  const store = useCommunicationStore();
  const itemInfo = ref<CommunicationInfoType>({
    type: '',
    randomId: ''
  })
  store.$subscribe((mutation, state) => {
    itemInfo.value = state.communication
  })

  // onMounted(() => {
  //   console.log(panelSubject$, 'panelSubject$');
    
  //   panelSubject$?.subscribe({
  //     next: (value) => {
  //       
  //     },
  //     error: err => console.error(' error: ' + err),
  //   })
  // })

  // onUnmounted(() => {
  //   console.log(panelSubject$, 'panelSubject$');
  //   panelSubject$?.unsubscribe()
  // })

  return {
    itemInfo
  }
}

export default useAddGridItem