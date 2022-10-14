/*
 * @Author: sfy
 * @Date: 2022-10-12 22:19:47
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:26:05
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/material/Card/index.tsx
 * @Description: update here
 */
import React from "react"
import { observer } from '@formily/reactive-react'

const Card = observer((props) => {
    return (
      <div
        {...props}
        style={{
          width: 200,
          height: 100,
          ...props.style,
          background: '#eee',
          border: '1px solid #ddd',
          display: 'flex',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.children ? props.children : <span>拖拽字段进入该区域</span>}
      </div>
    )
  })

export {
  Card
}