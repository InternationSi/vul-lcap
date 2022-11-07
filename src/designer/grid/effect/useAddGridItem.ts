/*
 * @Author: sfy
 * @Date: 2022-10-24 22:12:39
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-07 22:44:11
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

  return {
    itemInfo
  }
}

export default useAddGridItem