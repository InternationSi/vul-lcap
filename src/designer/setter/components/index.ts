/*
 * @Author: sfy
 * @Date: 2022-11-27 22:49:04
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-29 23:38:58
 * @FilePath: /vulture/src/designer/setter/components/index.ts
 * @Description: update here
 */
import NumberSetter from "./Number";
import StringSetter from "./String";
import BoolSetter from './Bool'
import JsonSetter from './Jsons'

export {
  NumberSetter,
  StringSetter,
  BoolSetter,
  JsonSetter
}

export type SetterType = 'NumberSetter' | 'StringSetter' | 'BoolSetter' | 'JsonSetter'