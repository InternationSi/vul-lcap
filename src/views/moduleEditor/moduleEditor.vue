<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { getNameSpaces } from "../../request/namespaces";
import type { NsType } from "../renameBlock/renameBlock.type";
import { ElMessage } from "element-plus";
// import type { Moduletype } from "../moduleEditor/moduleEdit.type";
import {
  addModule,
  addModuleField,
  getModuleList,
  updateModuleField
} from "@/request/module";
interface FormState {
  label: string;
  moduleName: string;
  category: string;
  namespaceName: string;
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
    const formState = reactive<FormState>({
      label: "",
      moduleName: "",
      category: "",
      namespaceName: ""
    });
    //模块信息 命名空间下拉框值
    const renameBlockSelectList = ref<NsType[]>([]);
    onMounted(async () => {
      //模块信息 命名空间下拉框值
      const res = await getNameSpaces();
      if (res.sucess) {
        console.log(res.data, "00000");
        renameBlockSelectList.value = res.data;
      }
    });
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
    //表格下拉框
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
    //表格添加一条数据
    const onAddItem = () => {
      tableData.value.push({
        fieldName: "",
        label: "",
        selfType: "",
        isPrimary: false,
        isUnique: false
      });
    };

    //删除弹框
    const confirmEvent = (index: number) => {
      console.log(index, "confirm");
      tableData.value.splice(index, 1);
    };
    const cancelEvent = () => {
      console.log("cancel!");
    };
    const exportMessage = async () => {
      const res = await getNameSpaces();
      console.log(res, "rrr");
    };
    //底部保存按钮

    return {
      value: ref({ value: "string" }),
      formState,
      tableData,
      exportMessage,
      onAddItem,
      options,
      confirmEvent,
      cancelEvent,
      renameBlockSelectList
    };
  }
});
</script>
<template>
  <div class="block">
    <div class="top">
      <h2 class="title">编辑模块</h2>
      <el-button class="btn" @click="exportMessage">导出</el-button>
    </div>

    <div class="message">
      <p>模块信息</p>
      <el-form class="flex" :model="formState" layout="vertical">
        <el-form-item
          label="moduleName"
          name="moduleName"
          layout="vertical"
          :rules="[{ required: true, message: '请输入模块英文名称' }]"
        >
          <el-input v-model:value="formState.moduleName" />
        </el-form-item>
        <el-form-item
          label="模型名称"
          name="label"
          :rules="[{ required: true, message: '请输入模块中文名称' }]"
        >
          <el-input v-model:value="formState.label" />
        </el-form-item>
        <el-form-item
          label="类型"
          name="category"
          layout="vertical"
          :rules="[{ required: true, message: '请选择模块类型' }]"
        >
          <el-select
            v-model="formState.category"
            class="m-2"
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属命名空间"
          name="ModelRenameBlock"
          layout="vertical"
          :rules="[{ required: true, message: '请选择模块' }]"
        >
          <el-select
            v-model="formState.namespaceName"
            class="m-2"
            placeholder="Select"
          >
            <el-option
              v-for="item in renameBlockSelectList"
              :key="item.describe"
              :label="item.namespace_label"
              :value="item.namespace_name"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" style="width: 100%; font-size: 12px" border>
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
                v-for="item in options"
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
      <el-button class="mt-4" style="width: 100%" @click="onAddItem"
        >新增</el-button
      >
    </div>
  </div>

  <div class="saveBtn">
    <div class="bottom">
      <el-radio-button value="default" class="saveClose"
        >保存并关闭</el-radio-button
      >
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.block {
  overflow: hidden;
}
.top {
  margin-bottom: 2px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  opacity: 1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 15px NaNpx rgba(0, 0, 0, 0.05);
}
.btn {
  margin-bottom: 10px;
  background: #d8d8d8;
}
.message {
  overflow-y: scroll;
  height: 565px;
  margin-bottom: 2px;
  padding-left: 20px;
  padding-right: 20px;
  opacity: 1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 15px NaNpx rgba(0, 0, 0, 0.05);
  p {
    font-size: 20px;
    font-weight: 700px;
    padding-top: 20px;
  }
  .btn {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
}
.flex div {
  width: 250px;
}
.table {
  width: 100%;
  margin-top: 0;
  padding-left: 20px;
  padding-right: 20px;
  opacity: 1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 15px NaNpx rgba(0, 0, 0, 0.05);
  p {
    font-size: 20px;
    font-weight: 700px;
  }

  .btn {
    margin-top: 20px;
    padding-bottom: 20px;
    background: #ffff;
  }
}
.saveBtn {
  height: 60px;
  position: fixed;
  left: 210px;
  right: 0;
  bottom: 0;
  width: e("calc(100vw - 220px)");
  opacity: 1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 15px NaNpx rgba(0, 0, 0, 0.05);
  .bottom {
    float: right;
    line-height: 60px;
    padding-right: 20px;
    .saveClose {
      margin-right: 20px;
    }
  }
}
.mt-4 {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
