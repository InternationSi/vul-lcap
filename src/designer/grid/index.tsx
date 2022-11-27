/*
 * @Author: sfy
 * @Date: 2022-10-13 14:50:59
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-27 21:52:16
 * @FilePath: /vulture/src/designer/grid/index.tsx
 * @Description: update here
 */
import GridItemList from "./components/GridItemList";
import { useSchemaStore } from "@/store/gridSchema";
import { defineComponent, ref, reactive, watch, onUnmounted, getCurrentInstance } from "vue";
import useAddGridItem from "./effect/useAddGridItem";
import useCreateConfig from "./effect/useCreateConfig";
import useTabOptions from "./effect/useTabOptions";
import useCreateTab from "./effect/useCreateTab";
import "./index.less";
import GridOutLine from "./components/GridOutLine";
import { TABCOMPONENTS } from "./effect/consts";
import Setter from "../setter";

export default defineComponent({
  components: { GridOutLine },
  setup() {
    const layout = ref<any[]>([
      {
        x: 0,
        y: 0,
        w: 4,
        h: 6,
        i: "jRq-eA8hLx6-vW5e1rJ8M"
      }
    ]);

    const setterConfigVisible = ref(false);
    // 缓存节点
    const keepNode = ref<any>({});
    // setter的ref
    const setterRef = ref()

    const schemaStore = useSchemaStore();
    const { itemInfo } = useAddGridItem();
    // 创建tab
    const { tabContainerName, editableTabsValue, editableTabs, addTab } =
      useTabOptions();

    // 删除单个节点
    const deleteItem = (value: number) => {
      layout.value = layout.value.filter((item, index) => {
        return index !== value;
      });
    };
    // 编辑单个节点
    const editItem = (value: boolean, nodeInfo: any) => {
      keepNode.value = nodeInfo;
      setterConfigVisible.value = value;
    };

    // 监听物料，加入物料
    watch(
      () => itemInfo.value,
      (value) => {
        const layItem = useCreateConfig({
          type: value.type
        });

        if (editableTabsValue.value === "main") {
          layout.value.push(layItem);
          return;
        }
        const findTab = editableTabs.value.find(
          (item) => item.name === editableTabsValue.value
        );
        if (findTab && TABCOMPONENTS.includes(findTab.type)) {
          const result = findTab.tabKeys.find(
            (cTa) => cTa.name === tabContainerName.value
          );
          result?.tabLayout.push(layItem);
        }
      }
    );

    // 监听shcema的变化，有tab需要创建tab页
    watch(
      () => layout.value,
      (value) => {
        schemaStore.changeGridScheme(value);
        editableTabs.value = [];
        useCreateTab({
          schemaValue: value,
          addTab
        });
      },
      { deep: true }
    );

    // 监听到tab页有变化后加到主页面
    const gridSchemaChange = ({ key, tabKey, type, values, tabNow }: any) => {
      tabContainerName.value = tabNow;
      const changeIndex = layout.value.findIndex((item) => item.i == key);
      if (TABCOMPONENTS.includes(type)) {
        layout.value[changeIndex].config.tabList.find(
          (tab: any) => tab.name == tabKey
        ).gridInfo = values;
      }
    };

    // 弹开setter，确定
    const setterConfirm = () => {
      const changeIndex = layout.value.findIndex(item => item.i === keepNode.value.i)
      layout.value[changeIndex] = {...layout.value[changeIndex],...setterRef.value.setterValue}
      setterConfigVisible.value = false
    }

    return () => (
      <>
        <el-tabs v-model={editableTabsValue.value} type="card" onTabChange={(name:string) => schemaStore.changeClickTab(name)}>
          <el-tab-pane label="工作台" name="main">
            <grid-layout
              layout={layout.value}
              col-num={12}
              row-height={30}
              is-draggable={true}
              is-resizable={true}
              vertical-compact={true}
              use-css-transforms={true}
            >
              {layout.value.map((item: any, index: number) => {
                return (
                  <grid-item
                    key={index}
                    static={item.static}
                    x={item.x}
                    y={item.y}
                    w={item.w}
                    h={item.h}
                    i={item.i}
                  >
                    <GridItemList
                      config={item}
                      itemIndex={index}
                      handleDelete={deleteItem}
                      handleEdit={(value: boolean) => editItem(value, item)}
                    />
                  </grid-item>
                );
              })}
            </grid-layout>
          </el-tab-pane>
          {editableTabs.value.map((item) => {
            return (
              <el-tab-pane label={item.title} name={item.name}>
                <GridOutLine tabConfig={item} onChange={gridSchemaChange} />
              </el-tab-pane>
            );
          })}
        </el-tabs>
        <el-dialog
          v-model={setterConfigVisible.value}
          title="编辑"
          width="80%"
          destroy-on-close={true}
        >
          {{
            default: () => {
              return [<Setter ref={setterRef} value={keepNode.value} />];
            },
            footer: () => {
              return [
                <el-button onClick={() => (setterConfigVisible.value = false)}>
                  取消
                </el-button>,
                <el-button type="primary" onClick={setterConfirm}>确定</el-button>
              ];
            }
          }}
        </el-dialog>
      </>
    );
  }
});
