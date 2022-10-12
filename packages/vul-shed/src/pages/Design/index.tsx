/*
 * @Author: sfy
 * @Date: 2022-10-11 23:10:14
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-12 22:49:14
 * @FilePath: /vulture/packages/vul-shed/src/pages/Design/index.tsx
 * @Description: update here
 */
import React, { useEffect } from 'react'
import {
  Designer,
  Workbench,
  ViewPanel,
  DesignerToolsWidget,
  ViewToolsWidget,
  OutlineTreeWidget,
  ResourceWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  SettingsPanel,
  HistoryWidget,
} from '@designable/react'
import { SettingsForm, MonacoInput } from '@designable/react-settings-form'
import {
  createDesigner,
} from '@designable/core'
import { Content } from './material'
import 'antd/dist/antd.less'
import Logo from './plugin/logo'
import Actions from './plugin/actions'
import ResourceList from './resource'
import './plugin/loadBasePlugin'

const engine = createDesigner()
const App = () => {
  return (
    <Designer engine={engine}>
      <Workbench>
        <StudioPanel logo={<Logo />} actions={<Actions />}>
          <CompositePanel>
            <CompositePanel.Item title="panels.Component" icon="Component">
              <ResourceList />
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
              <OutlineTreeWidget />
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.History" icon="History">
              <HistoryWidget />
            </CompositePanel.Item>
          </CompositePanel>
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">{() => <Content />}</ViewPanel>
              <ViewPanel type="JSONTREE">
                {() => {
                  return (
                    <div style={{ overflow: 'hidden', height: '100%' }}>
                      <MonacoInput
                        language="javascript"
                        helpCode="//hello world"
                        defaultValue={`<div><div>123123<div>123123<div>123123<div>123123</div></div></div></div></div>`}
                      />
                    </div>
                  )
                }}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
          <SettingsPanel title="panels.PropertySettings">
            <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </SettingsPanel>
        </StudioPanel>
      </Workbench>
    </Designer>
  )
}

export default App;

// export const qiankun = {
//   // 应用加载之前
//   async bootstrap(props) {
//     console.log('app1 bootstrap', props);
//   },
//   // 应用 render 之前触发
//   async mount(props) {
//     console.log('app1 mount', props);
//   },
//   // 应用卸载之后触发
//   async unmount(props) {
//     console.log('app1 unmount', props);
//   },
// };