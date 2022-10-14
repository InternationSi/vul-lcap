/*
 * @Author: sfy
 * @Date: 2022-10-12 22:26:36
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:27:51
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/material/Field/index.tsx
 * @Description: update here
 */
import React from "react"
import { observer } from '@formily/reactive-react'
import { useTreeNode } from '@designable/react'

const Field = observer((props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const node = useTreeNode()
  return (
    <span
      {...props}
      style={{
        background: '#eee',
        display: 'inline-block',
        ...props.style,
        padding: '10px 20px',
        border: '1px solid #ddd',
      }}
    >
      <span data-content-editable="title">{(node.props as any).title}</span>
      {props.children}
    </span>
  )
})

export {
  Field
}