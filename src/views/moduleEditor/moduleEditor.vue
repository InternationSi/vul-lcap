<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { getNameSpaces } from "../../request/namespaces";
import type { NsType } from "../renameBlock/renameBlock.type";
import { addModule } from "@/request/module";
interface FormState {
  ModelEnglishName: string;
  ModelName: string;
  ModelType: string;
  ModelRenameBlock: string;
}
interface Obj {
  value: string;
  label: string;
}
interface Data {
  name: string;
  title: string;
  types: Obj[];
  checks: string[];
}

export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      ModelEnglishName: "",
      ModelName: "",
      ModelType: "",
      ModelRenameBlock: ""
    });
    //模块信息 命名空间下拉框值
    const renameBlockSelectList = ref<NsType[]>([]);
    onMounted(async () => {
      const res = await getNameSpaces();
      if (res.sucess) {
        console.log(res.data, "00000");
        renameBlockSelectList.value = res.data;
        // dataList.value = res.data;
      }
    });
    //定义表格数据
    const tableData = ref<Data[]>([]);
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
    const onAddItem = () => {
      tableData.value.push({
        name: "",
        title: "",
        types: [],
        checks: []
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
    const save = async () => {
      // const saveBtn = await addModule();
      // console.log(saveBtn, "3333");
    };
    return {
      value: ref({ value: "string" }),
      formState,
      tableData,
      exportMessage,
      onAddItem,
      options,
      confirmEvent,
      cancelEvent,
      renameBlockSelectList,
      save
    };
  }
});
</script>
<template>
  <div class="block">
    <div class="top">
      <h2 class="title">编辑模块</h2>
      <a-button class="btn" @click="exportMessage">导出</a-button>
    </div>

    <div class="message">
      <p>模块信息</p>
      <el-form class="flex" :model="formState" layout="vertical">
        <el-form-item
          label="ModelName"
          name="ModelEnglishName"
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <a-input v-model:value="formState.ModelEnglishName" />
        </el-form-item>
        <el-form-item
          label="模型名称"
          name="ModelName"
          layout="vertical"
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <a-input v-model:value="formState.ModelName" />
        </el-form-item>
        <el-form-item
          label="类型"
          name="ModelType"
          layout="vertical"
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <el-select
            v-model="formState.ModelType"
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
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <el-select
            v-model="formState.ModelRenameBlock"
            class="m-2"
            placeholder="Select"
          >
            <el-option
              v-for="item in renameBlockSelectList"
              :key="item.describe"
              :label="item.namespacesName"
              :value="item.namespacesName"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" style="width: 100%; font-size: 12px" border>
        <el-table-column fixed prop="name" label="名称" align="center">
          <template #default="scope">
            <el-input
              v-model="scope.row.name"
              placeholder="请输入名称"
              style="font-size: 12px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
          <template #default="scope">
            <el-input
              v-model="scope.row.title"
              placeholder="请输入标题"
              style="font-size: 12px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="types" label="类型" align="center" width="160px">
          <template #default="scope">
            <el-select
              v-model="scope.row.types"
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
            <el-checkbox-group
              v-model="scope.row.checks"
              style="font-size: 12px"
            >
              <el-checkbox label="主键" />
              <el-checkbox label="唯一" />
            </el-checkbox-group>
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
      <a-radio-button value="default" class="saveClose"
        >保存并关闭</a-radio-button
      >
      <a-button type="primary" @click="save">保存</a-button>
    </div>
  </div>
</template>
<style scoped lang="less">
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
