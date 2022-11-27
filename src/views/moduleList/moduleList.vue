<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { getNameSpaces } from "../../request/namespaces";
import type { NsType } from "../renameBlock/renameBlock.type";
import {
  addModule,
  addModuleField,
  editModuleList,
  getModuleList,
  deleteModule,
  getModuleField,
  updateModuleField,
  deleteModuleField
} from "@/request/module";
interface ModuleData {
  module_key: string;
  module_name: string;
  category: string;
  namespace_id: string;
  id: string;
}
export default defineComponent({
  setup() {
    onMounted(async () => {
      //模块信息 命名空间下拉框值
      const res = await getNameSpaces();
      console.log(res, "wwwww");
      renameBlockSelectList.value = res;
      //   console.log(renameBlockSelectList.value, "命名空间");
      //查询所有模型名称
      const moduleList = await getModuleList();
      console.log(moduleList, "模型数据");
      tableData.value = moduleList;
      //   moduleNameList.value = moduleList;

      //查询所有属性
      //   attributeList.value = await getModuleField();
      //   console.log(attributeList.value, "rrrrr");
    });

    const tableData = ref<ModuleData[]>([]);
    const options = [
      {
        value: "string",
        label: "string"
      },
      {
        value: "select",
        label: "select"
      }
    ];
    const confirmEvent = (index: number) => {
      console.log(index, "confirm");
      tableData.value.splice(index, 1);
    };
    const cancelEvent = () => {
      console.log("cancel!");
    };
    //弹框所属命名空间下拉值
    const renameBlockSelectList = ref<NsType[]>([]);
    return {
      tableData,
      options,
      confirmEvent,
      cancelEvent,
      renameBlockSelectList
    };
  }
});
</script>
<template>
  <div class="wrap">
    <el-table
      :data="tableData"
      style="width: 100%; font-size: 12px; margin: 20px"
      border
    >
      <el-table-column
        fixed
        prop="module_key"
        label="ModuleName"
        align="center"
      >
        <template #default="scope">
          <el-input
            v-model="scope.row.module_key"
            placeholder="请输入名称"
            style="font-size: 12px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="module_name" label="模型名称" align="center">
        <template #default="scope">
          <el-input
            v-model="scope.row.module_name"
            placeholder="请输入标题"
            style="font-size: 12px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="category" label="类型" align="center">
        <template #default="scope">
          <el-select v-model="scope.row.category" style="margin-right: 15px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              style="font-size: 12px"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="所属命名空间">
        <template #default="scope">
          <el-select
            v-model="scope.row.namespace_id"
            placeholder="请选择所属命名空间"
            clearable
          >
            <el-option
              v-for="item in renameBlockSelectList"
              :key="item.id"
              :label="item.namespace_label"
              :value="item.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        fixed="right"
        label="操作"
        width="70px"
        align="center"
      >
        <template #default="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon-color="#626AEF"
            title="是否确认删除此行?"
            @confirm="confirmEvent(scope.$index)"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-icon style="color: red"><Delete /></el-icon>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="less">
.wrap {
  background: rgba(250, 250, 255, 1);
  opacity: 1;
}
</style>
