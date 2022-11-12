/*
 * @Author: sfy
 * @Date: 2022-10-24 23:01:50
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-11 23:24:21
 * @FilePath: /vulture/src/designer/grid/effect/useCreateConfig.ts
 * @Description: update here
 */
import { nanoid } from 'nanoid'


interface UseCreateConfigPropsType {
  type:string
}

interface UseCreateConfigType {
  (o: UseCreateConfigPropsType): {
    x: number,
    y: number, 
    w: number,
    h: number,
    i: string,
    type?: string
  };
}

const useCreateConfig:UseCreateConfigType = ({
  type
}) => {

  const config:any = {}

  if(type == 'container-tab') {
    config.tabList = [
      {
        title: "test1",
        name: "test1",
        gridInfo: []
      },
      {
        title: "test2",
        name: "test2",
        gridInfo: []
      }
    ]
  }

  return {
    x: 6,
    y: 0, 
    w: 4,
    h: 6,
    i: nanoid(),
    type, 
    config
  };
}
export default useCreateConfig