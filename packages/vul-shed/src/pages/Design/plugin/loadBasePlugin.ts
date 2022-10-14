/*
 * @Author: sfy
 * @Date: 2022-10-12 22:41:38
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:47:41
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/plugin/loadBasePlugin.ts
 * @Description: update here
 */
import { ComponentsgroupMeta } from './groupMeta'
import { GlobalRegistry } from '@designable/core'
import Behaviors from '../behaviors'

// 注册behavior
GlobalRegistry.setDesignerBehaviors(Behaviors)

// 注册层级
GlobalRegistry.registerDesignerLocales(ComponentsgroupMeta)