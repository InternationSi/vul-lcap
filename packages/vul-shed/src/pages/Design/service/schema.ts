/*
 * @Author: sfy
 * @Date: 2022-10-11 22:35:37
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-11 22:42:49
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/service/schema.ts
 * @Description: update here
 */
import { Engine } from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '../transformer'
import { message } from 'antd'

export const saveSchema = (designer: Engine) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree()))
  )
  message.success('Save Success')
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(localStorage.getItem('formily-schema')))
    )
  } catch {}
}
