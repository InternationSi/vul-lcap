<script lang="ts">
import { defineComponent, ref, reactive, Ref, UnwrapRef } from "vue";
import { VXETable, VxeColumnPropTypes, VxeTablePropTypes } from "vxe-table";
import XEUtils from "xe-utils";
import { cloneDeep } from "lodash-es";
import { getNameSpaces } from "../../request/namespaces";

interface FormState {
  username: string;
  nickname: string;
  checkNick: boolean;
}

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}
import { VxeTableInstance } from "vxe-table";
export default defineComponent({
  setup() {
    const value = ref("");
    const formState = reactive<FormState>({
      username: "",
      nickname: "",
      checkNick: false,
    });

    //定义表格数据
    const data = [
      {
        key: "1",
        name: "John",

        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
      },
    ];
    const formatDate = (value: any) => {
      return XEUtils.toDateString(value, "yyyy-MM-dd HH:mm:ss.S");
    };

    const filterSexMethod: VxeColumnPropTypes.FilterMethod = ({
      option,
      row,
    }) => {
      return row.sex === option.data;
    };

    const sumNum = (list: any[], field: string) => {
      let count = 0;
      list.forEach((item) => {
        count += Number(item[field]);
      });
      return count;
    };

    const footerMethod: VxeTablePropTypes.FooterMethod = ({
      columns,
      data,
    }) => {
      return [
        columns.map((column) => {
          if (["sex", "num"].includes(column.field)) {
            return sumNum(data, column.field);
          }
          return null;
        }),
      ];
    };

    const handleAdd = () => {
      // const newData = {
      //   key: `${count.value}`,
      //   name: `Edward King ${count.value}`,
      //   age: 32,
      //   address: `London, Park Lane no. ${count.value}`,
      // };
      // dataSource.value.push(newData);
    };

    //   const { row: newRow } = await $table.insertAt(record, row);
    //   await $table.setEditCell(newRow, "name");
    // };
    const exportMessage = async () => {
      const res = await getNameSpaces();
      console.log(res, "rrr");
    };
    return {
      value,
      formState,
      data,
      formatDate,
      filterSexMethod,
      footerMethod,
      handleAdd,
      exportMessage,
    };
  },
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
    </div>
    <div class="table">
      <p style="padding-top: 20px; font-weight: 600px">管理记录字段</p>
      <a-button
        class="editable-add-btn"
        style="margin-bottom: 8px"
        @click="handleAdd"
        >Add</a-button
      >
      <a-table :data-source="data">
        <a-table-column key="name" title="名称" data-index="name">
          <template #default>
            <span>
              <a-input></a-input>
            </span>
          </template>
        </a-table-column>
        <a-table-column key="age" title="标题" data-index="age">
          <template #default>
            <span>
              <a-input></a-input>
            </span>
          </template>
        </a-table-column>
        <a-table-column key="address" title="类型" data-index="address" />
        <a-table-column key="tags" title="属性" data-index="tags">
          <template #default="{ text: tags }">
            <span>
              <a-tag v-for="tag in tags" :key="tag" color="blue">{{
                tag
              }}</a-tag>
            </span>
          </template>
        </a-table-column>
        <a-table-column key="Action" title="操作">
          <template #default="{ record }">
            <span>
              <a>Action 一 {{ record.firstName }}</a>
              <a-divider type="vertical" />
              <a>Delete</a>
            </span>
          </template>
        </a-table-column>
      </a-table>
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
