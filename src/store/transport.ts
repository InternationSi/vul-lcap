/*
 * @Author: sfy
 * @Date: 2022-11-02 21:59:54
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-02 22:33:13
 * @FilePath: /vulture/src/store/transport.ts
 * @Description: update here
 */
import { defineStore } from "pinia"
import { ref } from "vue"

export interface CommunicationInfoType {
  type: string,
  randomId:string
}

export const useCommunicationStore = defineStore('communication', () => {
  const communication = ref<CommunicationInfoType>({
    type: '',
    randomId: '',
  })
  function setCommunication(info: CommunicationInfoType) {
    communication.value = info
  }

  return { communication, setCommunication }
})