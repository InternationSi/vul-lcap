/*
 * @Author: sfy
 * @Date: 2022-10-11 22:35:09
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-11 22:43:12
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/widgets/SchemaEditorWidget.tsx
 * @Description: update here
 */
import React from 'react'
import {
  transformToSchema,
  transformToTreeNode,
} from '../transformer'
import { TreeNode, ITreeNode } from '@designable/core'
import { MonacoInput } from '@designable/react-settings-form'

export interface ISchemaEditorWidgetProps {
  tree: TreeNode
  onChange?: (tree: ITreeNode) => void
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props
) => {
  return (
    <MonacoInput
      {...props}
      value={JSON.stringify(transformToSchema(props.tree), null, 2)}
      onChange={(value) => {
        props.onChange?.(transformToTreeNode(JSON.parse(value)))
      }}
      language="json"
    />
  )
}
