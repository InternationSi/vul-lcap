<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { InfoFilled } from "@element-plus/icons-vue";
import { getNameSpaces } from "../../request/namespaces";
interface FormState {
  username: string;
  nickname: string;
  checkNick: boolean;
}
interface Data {
  name: string;
  title: string;
  types: string;
  checks: string;
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
    const onAddItem = () => {
      tableData.value.push({
        name: "",
        title: "",
        types: "",
        checks: ""
      });
    };
    //下拉框
    const options = [
      {
        value: "Option1",
        label: "select"
      },
      {
        value: "Option2",
        label: "string"
      }
    ];
    const deleteRow = (index: number) => {
      tableData.value.splice(index, 1);
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
      options
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
      <a-form class="flex" :model="formState" layout="vertical">
        <a-form-item
          label="模块名称"
          name="username"
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
          label="模块名称"
          name="username"
          layout="vertical"
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
          label="模块名称"
          name="username"
          layout="vertical"
          :rules="[{ required: true, message: '请输入模块名称' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
      </a-form>
      <el-button class="mt-4" @click="onAddItem">新增</el-button>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column fixed prop="name" label="名称">
          <template #default="scope">
            <el-input placeholder="Please input" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题">
          <template #default="scope">
            <el-input placeholder="Please input" />
          </template>
        </el-table-column>
        <el-table-column prop="types" label="类型">
          <template #default="scope">
            <el-select v-model="value" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="checks" label="属性" />
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-popconfirm
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              icon-color="#626AEF"
              title="Are you sure to delete this?"
            />
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
  background: #ffff;
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  .bottom {
    line-height: 80px;
    margin-left: 70%;

    .saveClose {
      margin-right: 20px;
    }
  }
}
</style>
