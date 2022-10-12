/*
 * @Author: sfy
 * @Date: 2022-10-12 22:31:05
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:37:04
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/resource/index.tsx
 * @Description: update here
 */
import React from "react"
import { ResourceWidget } from '@designable/react'
import CardSource from './card'
import InputSource from './input'

const ResourceList = () => {

  return (
    <>
      <ResourceWidget 
      title="sources.Inputs" 
      sources={[InputSource, CardSource]}
      />
      <ResourceWidget
        title="sources.Displays"
        sources={[InputSource, CardSource]}
      />
      <ResourceWidget
        title="sources.Feedbacks"
        sources={[InputSource, CardSource]}
      />
    </>

  )
}
export default ResourceList