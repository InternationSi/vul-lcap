/*
 * @Author: sfy
 * @Date: 2022-10-05 19:41:59
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:28:03
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/material/index.tsx
 * @Description: update here
 */
import React from 'react'
import { ComponentTreeWidget, useTreeNode } from '@designable/react'
import { observer } from '@formily/reactive-react'
import 'antd/dist/antd.css'
import { Card } from './Card'
import { Field } from './Field'

export const Content = () => (
  <ComponentTreeWidget
    components={{
      Field,
      Card,
    }}
  />
)
