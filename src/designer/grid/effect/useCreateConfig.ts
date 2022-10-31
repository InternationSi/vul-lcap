/*
 * @Author: sfy
 * @Date: 2022-10-24 23:01:50
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-31 22:58:37
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


  return {
    x: 6,
    y: 0, 
    w: 4,
    h: 6,
    i: nanoid(),
    type, 
    config: {
    
    }
  };
}
export default useCreateConfig