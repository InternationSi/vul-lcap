/*
 * @Author: sfy
 * @Date: 2022-10-05 20:07:35
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-05 20:07:36
 * @FilePath: /vulture/packages/base/src/pages/sandbox.tsx
 * @Description: update here
 */
import React from 'react'
import { Content } from './Design/content'
import { renderSandboxContent } from '@designable/react-sandbox'
import './theme.less'

renderSandboxContent(() => {
  return <Content />
})
