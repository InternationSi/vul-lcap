<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";

import { useRouter } from "vue-router";
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
import { ElMessage } from "element-plus";
interface AddForm {
  field_key: string;
  field_name: string;
  field_type: string;
  is_required: boolean;
  is_primary: boolean;
  is_unique: boolean;
  module_id: string;
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
    const attributeList = ref<AddForm[]>([]);
    //判断是新增还是编辑模块属性
    const isAddAttribute = ref(false);
    const addFormVisible = ref(false);
    const addForm = reactive<AddForm>({
      field_key: "",
      field_name: "",
      field_type: "",
      is_required: false,
      is_primary: false,
      is_unique: false,
      module_id: "",
      id: ""
    });
    const tableData = ref<AddForm[]>([]);
    //新增模块属性
    const addAttribute = () => {
      addFormVisible.value = true;
      isAddAttribute.value = true;
      addForm.field_key = "";
      addForm.field_name = "";
      addForm.field_type = "";
      addForm.is_primary = false;
      addForm.is_unique = false;
    };
    const formState = reactive<DialogForm>({
      module_key: "",
      namespace_id: "",
      category: "",
      module_name: "",
      id: ""
    });
    onMounted(async () => {
      console.log(router.currentRoute.value.query.id, "1111");
    });
    const confirmEvent = async (item: any) => {
      const deleteField = await deleteModuleField(item, item.id);
      console.log(deleteField, "删除接口");
      ElMessage({
        message: "删除属性成功",
        type: "success"
      });
      addFormVisible.value = false;
      tableData.value = [];
      attributeList.value = await getModuleField();
      attributeList.value.forEach((item) => {
        if (item.module_id == formState.id) {
          tableData.value.push(item);
        }
      });
    };
    const cancelEvent = () => {
      console.log("cancel!");
    };
    //编辑属性按钮
    const editAttribute = async (item: any) => {
      addFormVisible.value = true;
      isAddAttribute.value = false;
      addForm.field_key = item.field_key;
      addForm.field_name = item.field_name;
      addForm.field_type = item.field_type;
      addForm.is_primary = item.is_primary;
      addForm.is_unique = item.is_unique;
      addForm.id = item.id;
    };

    return {
      attributeList,
      addForm,
      isAddAttribute,
      addFormVisible,
      addAttribute,
      tableData,
      confirmEvent,
      cancelEvent,
      editAttribute,
      router
    };
  }
});
</script>
<template>
  <div class="wrap">
    <el-button type="primary" plain @click="addAttribute">新增</el-button>

    <el-table
      :data="tableData"
      style="width: 100%; font-size: 12px; margin-top: 10px"
      border
    >
      <el-table-column fixed prop="field_key" label="名称" align="center">
      </el-table-column>
      <el-table-column prop="field_name" label="标题" align="center">
      </el-table-column>
      <el-table-column
        prop="field_type"
        label="类型"
        align="center"
        width="160px"
      >
      </el-table-column>
      <el-table-column prop="checks" label="属性" width="160px" align="center">
        <template #default="scope">
          <el-checkbox label="主键" v-model="scope.row.is_primary" disabled />
          <el-checkbox label="唯一" v-model="scope.row.is_unique" disabled />
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
            @confirm="confirmEvent(scope.row)"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-icon style="color: red"><Delete /></el-icon>
            </template>
          </el-popconfirm>
          <el-icon style="margin-left: 10px"
            ><Edit @click="editAttribute(scope.row)"
          /></el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="less">
.wrap {
  background: #ffff;
}
</style>
