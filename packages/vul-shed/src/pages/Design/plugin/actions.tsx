/*
 * @Author: sfy
 * @Date: 2022-10-11 23:42:21
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-11 23:46:30
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/plugin/actions.tsx
 * @Description: update here
 */
import React, { useEffect } from 'react'
import { observer } from '@formily/react'
import { Space, Button, Radio } from 'antd'
import { GlobalRegistry} from '@designable/core'
import { GithubOutlined } from '@ant-design/icons'
const Actions = observer(() => {
  const supportLocales = ['zh-cn', 'en-us']
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn')
    }
  }, [])

  return (
    <Space style={{ marginRight: 10 }}>
      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value)
        }}
      />
      <Button href="https://github.com/alibaba/designable" target="_blank">
        <GithubOutlined />
        Github
      </Button>
      <Button>保存</Button>
      <Button type="primary">发布</Button>
    </Space>
  )
})
export default Actions