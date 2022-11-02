/*
 * @Author: sfy
 * @Date: 2022-11-01 23:02:29
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-01 23:06:25
 * @FilePath: /vulture/src/designer/grid/effect/useCreateTab.ts
 * @Description: update here
 */
import { ref, onMounted, onUnmounted } from "vue";
interface useCreateTabPropsType {
  schemaValue:any[]
}

interface useCreateTabType {
  (o: useCreateTabPropsType): void
}

const useCreateTab:useCreateTabType = ({schemaValue}) => {
  console.log(schemaValue, 'schemaValue');
  
  return {
  }
}

export default useCreateTab