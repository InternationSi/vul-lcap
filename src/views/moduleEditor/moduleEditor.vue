<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { getNameSpaces } from "../../request/namespaces";
interface FormState {
  username: string;
  nickname: string;
  checkNick: boolean;
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
      username: "",
      nickname: "",
      checkNick: false
    });

    //定义表格数据
    const tableData = ref<Data[]>([]);
    //下拉框
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

    const deleteRow = (index: number) => {
      tableData.value.splice(index, 1);
    };
    //删除弹框
    const confirmEvent = () => {
      console.log("confirm");
    };
    const cancelEvent = () => {
      console.log("cancel!");
    };
    const exportMessage = async () => {
      const res = await getNameSpaces();
      console.log(res, "rrr");
    };
    return {
      value: ref({ value: "string" }),
      formState,
      tableData,
      exportMessage,
      onAddItem,
      deleteRow,
      options,
      confirmEvent,
      cancelEvent
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
          label="模块名称"
          name="username"
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <a-input v-model:value="formState.username" />
        </el-form-item>
        <el-form-item
          label="模块名称"
          name="username"
          layout="vertical"
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <a-input v-model:value="formState.username" />
        </el-form-item>
        <el-form-item
          label="模块名称"
          name="username"
          layout="vertical"
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <a-input v-model:value="formState.username" />
        </el-form-item>
        <el-form-item
          label="模块名称"
          name="username"
          layout="vertical"
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <a-input v-model:value="formState.username" />
        </el-form-item>
      </el-form>

      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column fixed prop="name" label="名称" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.name" placeholder="请输入名称" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.title" placeholder="请输入标题" />
          </template>
        </el-table-column>
        <el-table-column prop="types" label="类型" align="center" width="150px">
          <template #default="scope">
            <el-select v-model="scope.row.types">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="checks"
          label="属性"
          width="170px"
          align="center"
        >
          <template #default="scope">
            <el-checkbox-group v-model="scope.row.checks">
              <el-checkbox label="主键" />
              <el-checkbox label="唯一" />
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          fixed="right"
          label="操作"
          width="100px"
          align="center"
        >
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon-color="#626AEF"
            title="是否确认删除此行?"
            @confirm="confirmEvent()"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-button>删除</el-button>
            </template>
          </el-popconfirm>

          <!-- <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.$index)"
            >
              删除
            </el-button>
          </template> -->
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
      <a-button type="primary">保存</a-button>
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
