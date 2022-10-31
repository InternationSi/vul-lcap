/*
 * @Author: sfy
 * @Date: 2022-10-13 14:50:59
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-27 23:07:54
 * @FilePath: /vulture/src/designer/grid/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, reactive, watch, onUnmounted } from 'vue';
import useAddGridItem from './effect/useAddGridItem';
import useCreateConfig from './effect/useCreateConfig';
import { nanoid } from 'nanoid';
import GridItemList from './components/GridItemList';
import './index.moduel.less';
import { number } from 'echarts/core';

export default defineComponent({
  setup() {
    const { itemInfo } = useAddGridItem();
    const layout = ref([{ x: 0, y: 0, w: 2, h: 3, i: '0' }]);
    let dialogVisible = ref(false);
    let form = reactive({
      x: '',
      y: '',
      w: '',
      h: '',
      i: '',
    });
    let index = ref(0);
    const deleteItem = (value: number) => {
      index.value = value;
      layout.value = layout.value.filter((item, index) => {
        return index !== value;
      });
    };
    const editItem = () => {
      layout.value[index.value].x = Number(form.x);
      layout.value[index.value].y = Number(form.y);
      layout.value[index.value].w = Number(form.w);
      layout.value[index.value].h = Number(form.h);
      layout.value[index.value].i = form.i;
      dialogVisible.value = false;
    };
    watch(
      () => itemInfo.value,
      (value) => {
        layout.value.push(
          useCreateConfig({
            type: value,
          })
        );
      }
    );

    return () => (
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
                handleEdit={(value: boolean) => {
                  dialogVisible.value = value;
                }}
              />
            </grid-item>
          );
        })}
        <el-dialog v-model={dialogVisible.value} title="编辑单位" width="30%">
          <el-form model={form}>
            <el-form-item label="x:">
              <el-input v-model={form.x} />
            </el-form-item>
            <el-form-item label="y:">
              <el-input v-model={form.y} />
            </el-form-item>
            <el-form-item label="w:">
              <el-input v-model={form.w} />
            </el-form-item>
            <el-form-item label="h:">
              <el-input v-model={form.h} />
            </el-form-item>
            <el-form-item label="i:">
              <el-input v-model={form.i} />
            </el-form-item>
          </el-form>
          <span class="dialog-footer">
            <el-button
              onClick={() => {
                dialogVisible.value = false;
              }}
            >
              取消
            </el-button>
            <el-button type="primary" onClick={editItem}>
              保存
            </el-button>
          </span>
        </el-dialog>
      </grid-layout>
    );
  },
});
