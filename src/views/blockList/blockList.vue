<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import type { selectItem, ModuleName } from "./blockList.type";
import { getNameSpaces } from "../../request/namespaces";
import type { NsType } from "../renameBlock/renameBlock.type";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import _ from "lodash";
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

interface DialogForm {
  module_key: string;
  module_name: string;
  category: string;
  namespace_id: string;
  id: string;
}
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

export default defineComponent({
  setup() {
    const nsValue = ref("");
    const options = ref<selectItem[]>([]);
    //弹框所属命名空间下拉值
    const renameBlockSelectList = ref<NsType[]>([]);
    onMounted(async () => {
      //模块信息 命名空间下拉框值
      const res = await getNameSpaces();
      options.value = res;
      renameBlockSelectList.value = res;
      console.log(renameBlockSelectList.value, "命名空间");
      //查询所有模型名称
      const moduleList = await getModuleList();
      console.log(moduleList, "模型数据");
      moduleNameList.value = moduleList;
      temptyModule.value = moduleList;
      //查询所有属性
      attributeList.value = await getModuleField();
      console.log(attributeList.value, "rrrrr");
    });
    //模型属性
    const attributeList = ref<AddForm[]>([]);
    const isAddItem = ref(false); //编辑还是添加模型数据
    const dialogFormVisible = ref(false); // 对话框是否关闭
    //添加模型数据按钮
    const addItem = async () => {
      dialogFormVisible.value = true;
      isAddItem.value = true;
      formState.category = "";
      formState.module_key = "";
      formState.module_name = "";
      formState.namespace_id = "";
    };
    //  所有模型名称数据
    const moduleNameList = ref<ModuleName[]>([]);
    const temptyModule = ref<ModuleName[]>([]);
    const data = ref<selectItem[]>([]);
    const onChange = async () => {
      console.log(nsValue.value, "选中的id");
      //根据选择的命名空间筛选模型数据名称
      temptyModule.value = moduleNameList.value.filter((item) => {
        return item.namespace_id == nsValue.value;
      });
    };

    const formState = reactive<DialogForm>({
      module_key: "",
      namespace_id: "",
      category: "",
      module_name: "",
      id: ""
    });
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
    //右侧模块属性框是否展示
    const isShowBtn = ref(false);
    //新增属性弹框是否展示
    const addFormVisible = ref(false);
    //添加或编辑模型数据传参
    const formStateParam = {
      module_key: "",
      namespace_id: "",
      category: "",
      module_name: ""
    };

    //添加一条模块数据
    const dialogConfirm = async (formEl: FormInstance | undefined) => {
      formStateParam.category = formState.category;
      formStateParam.module_key = formState.module_key;
      formStateParam.namespace_id = formState.namespace_id;
      formStateParam.module_name = formState.module_name;
      if (!isAddItem.value) {
        const res = await addModule(formStateParam);
        ElMessage({
          message: "添加数据成功",
          type: "success"
        });
        //更新模型数据名称
        const moduleList = await getModuleList();
        temptyModule.value = moduleList;
        //弹框关闭
        dialogFormVisible.value = false;
      } else {
        const updateModule = await editModuleList(formStateParam, formState.id);
        console.log(updateModule, "更新接口");
        dialogFormVisible.value = false;
        ElMessage({
          message: "更新数据成功",
          type: "success"
        });
        //更新模型数据
        const moduleList = await getModuleList();
        temptyModule.value = moduleList;
      }
    };
    //编辑模块数据
    const editItem = async () => {
      dialogFormVisible.value = true;
      isAddItem.value = false;
      // formState.category = "";
      // formState.module_key = "";
      // formState.module_name = "";
      // formState.namespace_id = "";
    };

    //校验表单
    const rules = reactive<FormRules>({
      module_key: [
        { required: true, message: "请输入模块英文名称", trigger: "blur" }
      ],
      module_name: [
        { required: true, message: "请选择模块类型", trigger: "blur" }
      ],
      namespace_id: [
        { required: true, message: "请选择命名空间", trigger: "blur" }
      ]
    });
    const ruleFormRef = ref<FormInstance>();
    //定义编辑模型数据id
    const moduleName = async (index: number, item: any) => {
      formState.module_key = item.module_key;
      formState.module_name = item.module_name;
      formState.category = item.category;
      formState.namespace_id = item.namespace_id;
      formState.id = item.id;
      addForm.module_id = item.id;
      isShowBtn.value = true;
      tableData.value = [];
      //筛选模型属性
      attributeList.value.forEach((item) => {
        if (item.module_id == formState.id) {
          tableData.value.push(item);
        }
      });
    };
    //定义表格数据
    const tableData = ref<AddForm[]>([]);
    const cancelEvent = () => {
      console.log("cancel!");
    };
    //判断是新增还是编辑模块属性
    const isAddAttribute = ref(false);
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

    const confirmDelete = async () => {
      //调删除接口
      const deleteRes = await deleteModule(formState.id);
      ElMessage({
        message: "删除数据成功",
        type: "success"
      });
      isShowBtn.value = false;
      const moduleList = await getModuleList();
      temptyModule.value = moduleList;
    };
    //确认属性弹框按钮
    const confirmAttribute = async (item: any) => {
      //判断是新增属性还是编辑属性
      if (isAddAttribute.value) {
        //新增
        const addField = await addModuleField(addForm);
        if (addField.code) {
          ElMessage({
            message: "添加属性失败",
            type: "error"
          });
        } else {
          ElMessage({
            message: "添加属性成功",
            type: "success"
          });
          addFormVisible.value = false;
          //更新页面
          tableData.value = [];
          attributeList.value = await getModuleField();
          attributeList.value.forEach((item) => {
            if (item.module_id == formState.id) {
              tableData.value.push(item);
            }
          });
        }
      } else {
        //编辑属性
        const editAttr = await updateModuleField(item, addForm.id);
        console.log(editAttr, "更新接口");
        ElMessage({
          message: "编辑属性成功",
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
      }
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
    //删除一条模块属性
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
    return {
      nsValue,
      options,
      onChange,
      data,
      addItem,
      formStateParam,
      dialogFormVisible,
      isAddItem,
      formState,
      typeOptions,
      renameBlockSelectList,
      dialogConfirm,
      ruleFormRef,
      rules,
      moduleNameList,
      temptyModule,
      moduleName,
      tableData,
      confirmEvent,
      cancelEvent,
      addAttribute,
      editAttribute,
      addForm,
      editItem,
      isAddAttribute,
      isShowBtn,
      confirmDelete,
      confirmAttribute,
      addFormVisible
    };
  }
});
</script>
<template>
  <div class="warp">
    <div class="left">
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
          <el-form-item label="模型名称" label-width="110px" prop="module_name">
            <el-input v-model="formState.module_name" />
          </el-form-item>
          <el-form-item label-width="110px" label="类型" layout="vertical">
            <el-select
              v-model="formState.category"
              class="m-2"
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
      <el-select
        v-model="nsValue"
        placeholder="请选择命名空间"
        @change="onChange"
        style="margin-left: 10px; margin-right: 10px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.namespace_label"
          :value="item.id"
          size="small"
        />
      </el-select>
      <!-- 侧边栏数据展示 -->
      <!-- <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <span>全部</span>
          </template>

          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-sub-menu>
      </el-menu> -->
      <div v-for="(item, index) in temptyModule" :key="index" class="module">
        <el-link :underline="false" @click="moduleName(index, item)">{{
          item.module_name
        }}</el-link>
      </div>
    </div>
    <div class="right">
      <div v-if="isShowBtn">
        <el-button type="primary" plain @click="editItem">编辑</el-button>

        <el-popconfirm title="是否确定删除此数据?" @confirm="confirmDelete()">
          <template #reference>
            <el-button type="danger" plain>删除</el-button>
          </template>
        </el-popconfirm>
        <el-dialog
          v-model="addFormVisible"
          :title="isAddAttribute == true ? '新增' : '编辑'"
        >
          <el-form :model="addForm">
            <el-form-item label="名称:">
              <el-input v-model="addForm.field_key" />
            </el-form-item>
            <el-form-item label="标题:">
              <el-input v-model="addForm.field_name" />
            </el-form-item>
            <el-form-item label="类型:">
              <el-select
                v-model="addForm.field_type"
                placeholder="Please select a zone"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  style="font-size: 12px"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="属性:">
              <el-checkbox label="主键" v-model="addForm.is_primary" />
              <el-checkbox label="唯一" v-model="addForm.is_unique" />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="confirmAttribute(addForm)">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>

      <!-- 模型数据描述 -->
      <el-descriptions
        v-if="isShowBtn"
        title="模型数据详细介绍"
        :column="4"
        direction="vertical"
        style="margin-top: 20px"
      >
        <el-descriptions-item label="moduleName">{{
          formState.module_key
        }}</el-descriptions-item>
        <el-descriptions-item label="模型名称">{{
          formState.module_name
        }}</el-descriptions-item>
        <el-descriptions-item label="类型">{{
          formState.category
        }}</el-descriptions-item>
        <el-descriptions-item label="所属命名空间">
          <el-select
            v-model="formState.namespace_id"
            placeholder="请选择所属命名空间"
            disabled
          >
            <el-option
              v-for="item in renameBlockSelectList"
              :key="item.id"
              :label="item.namespace_label"
              :value="item.id"
            />
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
      <div class="table" v-if="isShowBtn">
        <el-button type="primary" plain @click="addAttribute">新增</el-button>
        <el-table
          :data="tableData"
          style="width: 100%; font-size: 12px; margin-top: 10px"
          border
        >
          <el-table-column fixed prop="fieldName" label="名称" align="center">
            <template #default="scope">
              <el-input
                v-model="scope.row.field_key"
                placeholder="请输入名称"
                style="font-size: 12px"
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column prop="label" label="标题" align="center">
            <template #default="scope">
              <el-input
                v-model="scope.row.field_name"
                placeholder="请输入标题"
                style="font-size: 12px"
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="selfType"
            label="类型"
            align="center"
            width="160px"
          >
            <template #default="scope">
              <el-select
                v-model="scope.row.field_type"
                style="width: 70%; margin-right: 15px"
                disabled
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  style="font-size: 12px"
                />
              </el-select>
              <span style="background: #f0f2f5">
                <el-icon style="font-size: 14px"><Share /></el-icon>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="checks"
            label="属性"
            width="160px"
            align="center"
          >
            <template #default="scope">
              <el-checkbox
                label="主键"
                v-model="scope.row.is_primary"
                disabled
              />
              <el-checkbox
                label="唯一"
                v-model="scope.row.is_unique"
                disabled
              />
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
        <!-- <el-button
          type="success"
          plain
          @click="saveModuleAttribute"
          style="margin-top: 20px"
          >保存</el-button -->
        <!-- > -->
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.warp {
  background: rgba(250, 250, 250, 1);
  // margin-bottom: 2px;
  // padding-left: 20px;
  // padding-right: 20px;
  // padding-top: 20px;
  opacity: 1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 15px NaNpx rgba(0, 0, 0, 0.05);
  display: flex;

  .left {
    margin-left: 0;
    width: 200px;
    height: 100vh;
    background: rgba(250, 250, 250, 1);
    .addBtn {
      margin-top: 20px;
      margin-bottom: 10px;
      margin-left: 10px;
    }
  }

  // .nameList {
  //   margin: 10px;
  //   background: rgba(255, 255, 255, 1);

  //   box-shadow: 0px 6px 15px 2px rgba(0, 0, 0, 0.05);
  // }
  .module {
    margin-top: 10px;
    margin-left: 20px;
    line-height: 20px;
    width: 100%;
    text-align: left;
  }
  .right {
    margin: 20px;
    width: 100%;
  }
}
</style>
