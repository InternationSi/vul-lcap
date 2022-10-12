/*
 * @Author: sfy
 * @Date: 2022-10-05 20:07:35
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:51:53
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/sandbox.tsx
 * @Description: update here
 */
import React from 'react'
import { Content } from './material'
import { renderSandboxContent } from '@designable/react-sandbox'
import './theme.less'

renderSandboxContent(() => {
  return <Content />
})
