<script lang="ts">
import { defineComponent, ref, reactive, onMounted, inject } from "vue";
import { getNameSpaces } from "../../request/namespaces";
import type { NsType } from "../renameBlock/renameBlock.type";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

import { useRouter } from "vue-router";
import type { ModuleName } from "./moduleList.type";
import {
  addModule,
  editModuleList,
  getModuleList,
  deleteModule
} from "@/request/module";
interface ModuleData {
  module_key: string;
  module_name: string;
  category: string;
  namespace_id: string;
  id: string;
}
interface DialogForm {
  module_key: string;
  module_name: string;
  category: string;
  namespace_id: string;
  id: string;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    //弹框所属命名空间下拉值
    const renameBlockSelectList = ref<NsType[]>([]);
    const dialogFormVisible = ref(false); // 对话框是否关闭
    const isAddItem = ref(false); //编辑还是添加模型数据
    const formState = reactive<DialogForm>({
      module_key: "",
      namespace_id: "",
      category: "",
      module_name: "",
      id: ""
    });
    const tableData = ref<ModuleData[]>([]);

    //添加或编辑模型数据传参
    const formStateParam = {
      module_key: "",
      namespace_id: "",
      category: "",
      module_name: ""
    };
    //弹框所属命名空间类型
    const typeOptions = [
      {
        value: "string",
        label: "string"
      },
      {
        value: "select",
        label: "select"
      }
    ];
    const temptyModule = ref<ModuleName[]>([]);
    const ruleFormRef = ref<FormInstance>();
    const isShowBtn = ref(false);
    onMounted(async () => {
      const update: any = inject("breadDataList");
      update();
      //模块信息 命名空间下拉框值
      const res = await getNameSpaces();
      renameBlockSelectList.value = res;
      //查询所有模型名称
      const moduleList = await getModuleList();
      console.log(moduleList, "模型数据");
      tableData.value = moduleList;
    });

    const confirmEvent = async (index: number) => {
      try {
        const deleteRes = await deleteModule(formState.id);
        ElMessage({
          message: "删除数据成功",
          type: "success"
        });
      } catch (error) {
        console.log(error);
      }
      //调删除接口
      isShowBtn.value = false;
      const moduleList = await getModuleList();
      temptyModule.value = moduleList;
    };

    //添加模型数据按钮
    const addItem = async () => {
      dialogFormVisible.value = true;
      isAddItem.value = true;
      formState.category = "";
      formState.module_key = "";
      formState.module_name = "";
      formState.namespace_id = "";
    };
    const dialogConfirm = async (formEl: FormInstance | undefined) => {
      formStateParam.category = formState.category;
      formStateParam.module_key = formState.module_key;
      formStateParam.namespace_id = formState.namespace_id;
      formStateParam.module_name = formState.module_name;
      if (!formEl) return;
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          console.log("submit!");
          if (isAddItem.value) {
            try {
              const res = addModule(formStateParam);
              ElMessage({
                message: "添加数据成功",
                type: "success"
              });
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              const updateModule = editModuleList(formStateParam, formState.id);
              console.log(updateModule, "更新接口");
              dialogFormVisible.value = false;
              ElMessage({
                message: "更新数据成功",
                type: "success"
              });
            } catch (error) {
              console.log(error);
            }
          }
          try {
            const moduleList = await getModuleList();
            tableData.value = moduleList;
            //弹框关闭
            dialogFormVisible.value = false;
          } catch (error) {
            console.log(error, "更新失败");
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    //校验表单
    const rules = reactive<FormRules>({
      module_key: [
        {
          required: true,
          message: "请输入模块英文名称",
          trigger: "blur"
        }
      ],
      module_name: [
        {
          required: true,
          message: "请选择模块类型",
          trigger: "blur"
          // validator: vailId
        }
      ],
      namespace_id: [
        {
          required: true,
          message: "请选择命名空间",
          trigger: "blur"
          // validator: vailIdName
        }
      ]
    });
    //编辑模块数据
    const editItem = async (item: any) => {
      console.log(item, "44444");
      formState.category = item.category;
      formState.module_name = item.module_name;
      formState.module_key = item.module_key;
      formState.namespace_id = item.namespace_id;
      formState.id = item.id;
      dialogFormVisible.value = true;
      isAddItem.value = false;
    };
    const handleSelect = (row: any, column: any, event: any) => {
      router.push({
        path: "/admin/moduleNav/moduleAttribute",
        query: { id: row.id }
      });
    };
    const deleteItem = (item: any) => {
      console.log(item, "3333");
      ElMessageBox.confirm(
        "是否删除此数据",

        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(async () => {
          try {
            const deleteRes = await deleteModule(item.id);
            ElMessage({
              message: "删除数据成功",
              type: "success"
            });
          } catch (error) {
            console.log(error);
          }
          //调删除接口
          isShowBtn.value = false;
          const moduleList = await getModuleList();
          tableData.value = moduleList;
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled"
          });
        });
    };

    return {
      router,
      tableData,
      confirmEvent,
      renameBlockSelectList,
      addItem,
      dialogFormVisible,
      isAddItem,
      dialogConfirm,
      formState,
      rules,
      typeOptions,
      ruleFormRef,
      editItem,
      isShowBtn,
      handleSelect,
      deleteItem
    };
  }
});
</script>
<template>
  <div class="wrap">
    <el-button class="addBtn" type="primary" plain @click="addItem()"
      >添加</el-button
    >
    <el-dialog
      v-model="dialogFormVisible"
      :title="isAddItem == true ? '新增' : '编辑'"
    >
      <el-form
        class="flex"
        :model="formState"
        ref="ruleFormRef"
        :rules="rules"
        layout="vertical"
      >
        <el-form-item
          label="moduleName"
          layout="vertical"
          label-width="110px"
          prop="module_key"
        >
          <el-input v-model="formState.module_key" :disabled="!isAddItem" />
        </el-form-item>
        <el-form-item
          label="模型名称"
          layout="vertical"
          label-width="110px"
          prop="module_name"
        >
          <el-input v-model="formState.module_name" />
        </el-form-item>

        <el-form-item label-width="110px" label="类型" layout="vertical">
          <el-select
            v-model="formState.category"
            placeholder="请选择类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label-width="110px"
          label="所属命名空间"
          layout="vertical"
          prop="namespace_id"
        >
          <el-select
            v-model="formState.namespace_id"
            placeholder="请选择所属命名空间"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in renameBlockSelectList"
              :key="item.id"
              :label="item.namespace_label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogConfirm(ruleFormRef)">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%; font-size: 12px; padding: 0 20px 20px 20px"
      @row-click="handleSelect"
      border
    >
      <el-table-column prop="module_key" label="ModuleName" align="center">
      </el-table-column>
      <el-table-column
        prop="module_name"
        label="模型名称"
        align="center"
        style="font-size: 10px; font-weight: 100"
      >
        <template #default="scope">
          <el-link type="primary" :underline="false">{{
            scope.row.module_name
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="类型" align="center">
      </el-table-column>
      <el-table-column label="所属命名空间" align="center">
        <template #default="scope">
          <el-select
            v-model="scope.row.namespace_id"
            placeholder="请选择所属命名空间"
            clearable
            disabled
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

      <el-table-column fixed="right" label="操作" width="120px" align="center">
        <template #default="scope">
          <el-icon
            style="color: red"
            size="14px"
            @click.stop="deleteItem(scope.row)"
            ><Delete
          /></el-icon>
          <el-icon
            size="14px"
            style="margin-left: 10px"
            @click.stop="editItem(scope.row)"
            ><Edit
          /></el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  background: #ffff;
  opacity: 1;
  height: 100vh;
  .addBtn {
    margin: 20px;
  }
}
</style>
