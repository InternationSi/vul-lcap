/*
 * @Author: sfy
 * @Date: 2022-10-05 20:07:35
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-11 23:31:31
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/sandbox.tsx
 * @Description: update here
 */
import React from 'react'
import { Content } from './content'
import { renderSandboxContent } from '@designable/react-sandbox'
import './theme.less'

renderSandboxContent(() => {
  return <Content />
})
