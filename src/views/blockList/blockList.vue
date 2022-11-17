<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import type { selectItem, moduleName } from "./blockList.type";
import { getNameSpaces } from "../../request/namespaces";
import { getModule } from "../../request/module";
import type { NsType } from "../renameBlock/renameBlock.type";
import type { FormInstance, ElMessage, FormRules } from "element-plus";
import _ from "lodash";
import {
  addModule,
  // addModuleField,
  getModuleList
  // updateModuleField
} from "@/request/module";

interface DialogForm {
  module_key: string;
  module_name: string;
  category: string;
  namespace_id: string;
}
export default defineComponent({
  setup() {
    const value = ref("");
    const options = ref<selectItem[]>([]);
    // const moduleList = ref<selectItem[]>([]);
    //弹框所属命名空间下拉值
    const renameBlockSelectList = ref<NsType[]>([]);
    onMounted(async () => {
      //模块信息 命名空间下拉框值
      const res = await getNameSpaces();
      console.log(res, "44444");
      options.value = res;
      renameBlockSelectList.value = res;
      //查询所有模型名称
      const moduleList = await getModuleList();
      moduleNameList.value = moduleList;
    });
    //  所有模型名称数据
    const moduleNameList = ref<moduleName[]>([]);
    const data = ref<selectItem[]>([]);
    const onChange = async () => {
      console.log("触发change事件");
      console.log(value.value, "6666");
      const res = await getModule(value.value);
      console.log(res.data, "rrr");
      data.value = res.data;
    };
    const dialogTableVisible = ref(false); // 对话框是否关闭
    const dialogFormVisible = ref(false);
    const formState = reactive<DialogForm>({
      module_key: "",
      namespace_id: "",
      category: "",
      module_name: ""
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
    //添加一条模块数据
    const dialogConfirm = async (formEl: FormInstance | undefined) => {
      console.log(formEl, "rrrrr");
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          const res = addModule(formState);
          console.log(res, "添加数据成功");

          //弹框关闭
          dialogFormVisible.value = false;
        } else {
          console.log("提交失败!", fields);
        }
      });
      console.log(formState, "ttttt");
    };
    //校验表单
    const rules = reactive<FormRules>({
      module_key: [
        { required: true, message: "请输入模块英文名称", trigger: "blur" }
      ],
      module_name: [
        { required: true, message: "请选择模块类型", trigger: "blur" }
      ]
    });
    const ruleFormRef = ref<FormInstance>();
    return {
      value,
      options,
      onChange,
      data,
      dialogFormVisible,
      dialogTableVisible,
      formState,
      typeOptions,
      renameBlockSelectList,
      dialogConfirm,
      ruleFormRef,
      rules,
      moduleNameList
    };
  }
});
</script>
<template>
  <div class="warp">
    <div class="left">
      <el-button
        class="addBtn"
        type="primary"
        plain
        @click="dialogFormVisible = true"
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
            :rules="[
              { required: true, message: '请输入模块英文名称', trigger: 'blur' }
            ]"
          >
            <el-input v-model="formState.module_key" />
          </el-form-item>
          <el-form-item
            label="模型名称"
            label-width="110px"
            :rules="[
              { required: true, message: '请输入模块英文名称', trigger: 'blur' }
            ]"
          >
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
            :rules="[
              { required: true, message: '请选择模块', trigger: 'blur' }
            ]"
          >
            <el-select
              v-model="formState.namespace_id"
              class="m-2"
              placeholder="请选择所属命名空间"
              style="width: 100%"
            >
              <el-option
                v-for="item in renameBlockSelectList"
                :key="item.describe"
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
        v-model="value"
        class="m-2"
        placeholder="请选择命名空间"
        @change="onChange"
      >
        <el-option
          v-for="item in options"
          :key="item.namespace_label"
          :label="item.namespace_label"
          :value="item.namespace_name"
          size="small"
        />
      </el-select>
      <div v-for="(item, index) in moduleNameList" :key="index" class="module">
        <el-link :underline="false">{{ item.module_name }}</el-link>
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
}
</style>
