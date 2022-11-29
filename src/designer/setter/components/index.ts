/*
 * @Author: sfy
 * @Date: 2022-11-27 22:49:04
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-28 22:39:17
 * @FilePath: /vulture/src/designer/setter/components/index.ts
 * @Description: update here
 */
import NumberSetter from "./Number";
import StringSetter from "./String";

export {
  NumberSetter,
  StringSetter
}

export type SetterType = 'NumberSetter' | 'StringSetter'