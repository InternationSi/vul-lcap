<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import type { selectItem, ModuleName } from "./blockList.type";
import { getNameSpaces } from "../../request/namespaces";
import { getModule } from "../../request/module";
import type { NsType } from "../renameBlock/renameBlock.type";
import type { FormInstance, ElMessage, FormRules } from "element-plus";
import _ from "lodash";
import {
  addModule,
  // addModuleField,
  editModuleList,
  getModuleList
  // updateModuleField
} from "@/request/module";

interface DialogForm {
  module_key: string;
  module_name: string;
  category: string;
  namespace_id: string;
  id: string;
}
interface Data {
  fieldName: string; //表格名称
  label: string; //表格标题
  selfType: string; //表格类型
  isPrimary: boolean; //表格是否主键
  isUnique: boolean; //表格是否唯一
}
export default defineComponent({
  setup() {
    const nsValue = ref("");
    const options = ref<selectItem[]>([]);
    // const moduleList = ref<selectItem[]>([]);
    //弹框所属命名空间下拉值
    const renameBlockSelectList = ref<NsType[]>([]);
    onMounted(async () => {
      //模块信息 命名空间下拉框值
      const res = await getNameSpaces();
      options.value = res;
      renameBlockSelectList.value = res;
      //查询所有模型名称
      const moduleList = await getModuleList();
      moduleNameList.value = moduleList;
      temptyModule.value = moduleList;
    });
    const isAddModule = ref(false); //编辑还是添加模型数据
    const dialogFormVisible = ref(false); // 对话框是否关闭
    //添加模型数据按钮
    const addItem = async () => {
      dialogFormVisible.value = true;
      isAddModule.value = false;
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
    //添加属性表格是否展示
    const isShowTable = ref(false);
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
      if (!isAddModule.value) {
        const res = await addModule(formStateParam);
        console.log(res, "添加数据成功");
        //更新模型数据名称
        const moduleList = await getModuleList();
        moduleNameList.value = moduleList;
        //弹框关闭
        dialogFormVisible.value = false;
      } else {
        const updateModule = await editModuleList(formStateParam, formState.id); //报500
        console.log(updateModule, "更新接口");
        dialogFormVisible.value = false;
        //更新模型数据
        const moduleList = await getModuleList();
        moduleNameList.value = moduleList;
      }
    };
    //编辑模块属性
    const editItem = async () => {
      dialogFormVisible.value = true;
      isAddModule.value = true;
    };
    //删除一条模块属性
    const deleteItem = async () => {
      console.log("666");
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
    const moduleName = async (index: number, id: string) => {
      console.log(moduleNameList.value, "zzzzz");
      formState.module_key = moduleNameList.value[index].module_key;
      formState.module_name = moduleNameList.value[index].module_name;
      formState.category = moduleNameList.value[index].category;
      formState.namespace_id = moduleNameList.value[index].namespace_id;
      formState.id = moduleNameList.value[index].id;
      isShowBtn.value = true;
    };
    //定义表格数据
    const tableData = ref<Data[]>([
      {
        fieldName: "", //表格名称
        label: "", //表格标题
        selfType: "", //表格类型
        isPrimary: false, //表格是否主键
        isUnique: false
      } //表格是否唯一
    ]);
    //删除一条模块属性
    const confirmEvent = (index: number) => {
      console.log(index, "confirm");
      tableData.value.splice(index, 1);
    };
    const cancelEvent = () => {
      console.log("cancel!");
    };
    //新增模块属性
    const onAddItem = () => {
      isShowTable.value = true;
      tableData.value.push({
        fieldName: "",
        label: "",
        selfType: "",
        isPrimary: false,
        isUnique: false
      });
    };
    const saveModuleAttribute = () => {
      console.log("保存或更新模块属性");
    };
    return {
      nsValue,
      options,
      onChange,
      data,
      addItem,
      formStateParam,
      dialogFormVisible,
      isAddModule,
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
      onAddItem,
      editItem,
      deleteItem,
      saveModuleAttribute,
      isShowBtn,
      isShowTable
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
      <el-dialog v-model="dialogFormVisible">
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
            <el-input v-model="formState.module_key" :disabled="isAddModule" />
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
      <div v-for="(item, index) in temptyModule" :key="index" class="module">
        <el-link :underline="false" @click="moduleName(index, item.id)">{{
          item.module_name
        }}</el-link>
      </div>
    </div>
    <div class="right">
      <div v-if="isShowBtn">
        <el-button type="primary" plain @click="editItem">编辑</el-button>
        <el-button type="danger" plain @click="deleteItem">删除</el-button>
        <el-button type="primary" plain @click="onAddItem">新增</el-button>
      </div>
      <!-- 模型数据描述 -->
      <el-descriptions
        title="Vertical list without border"
        :column="4"
        direction="vertical"
      >
        <el-descriptions-item label="Username"
          >kooriookami</el-descriptions-item
        >
        <el-descriptions-item label="Telephone"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="Place" :span="2"
          >Suzhou</el-descriptions-item
        >
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <div class="table" v-if="isShowTable">
        <el-table
          :data="tableData"
          style="width: 100%; font-size: 12px; margin-top: 10px"
          border
        >
          <el-table-column fixed prop="fieldName" label="名称" align="center">
            <template #default="scope">
              <el-input
                v-model="scope.row.fieldName"
                placeholder="请输入名称"
                style="font-size: 12px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="label" label="标题" align="center">
            <template #default="scope">
              <el-input
                v-model="scope.row.label"
                placeholder="请输入标题"
                style="font-size: 12px"
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
                v-model="scope.row.selfType"
                style="width: 70%; margin-right: 15px"
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
              <el-checkbox label="主键" v-model="scope.row.isPrimary" />
              <el-checkbox label="唯一" v-model="scope.row.isUnique" />
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
        <el-button type="success" plain @click="saveModuleAttribute"
          >保存</el-button
        >
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
