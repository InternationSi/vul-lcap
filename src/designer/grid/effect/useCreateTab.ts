/*
 * @Author: sfy
 * @Date: 2022-11-01 23:02:29
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-11 23:36:04
 * @FilePath: /vulture/src/designer/grid/effect/useCreateTab.ts
 * @Description: update here
 */
import { ref, onMounted, onUnmounted } from "vue";
interface useCreateTabPropsType {
  schemaValue:any[]
  addTab: (info:any) => void
}

interface useCreateTabType {
  (o: useCreateTabPropsType): void
}

const useCreateTab:useCreateTabType = ({schemaValue, addTab}) => {
  schemaValue.forEach(item => {
        
    if(item.type == "container-tab") {
      const info =  {
        title: "容器",
        name: item.i,
        tabKeys: item.config?.tabList?.map((tab:any) => {
          return {
            name: tab.name 
          }
        })
      }
      addTab(info)
    }
  })
}

export default useCreateTab