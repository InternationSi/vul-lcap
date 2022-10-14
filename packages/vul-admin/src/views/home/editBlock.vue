<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { VXETable, VxeColumnPropTypes, VxeTablePropTypes } from "vxe-table";
import XEUtils from "xe-utils";
import { getNameSpaces } from "../../request/namespaces";

interface FormState {
  username: string;
  nickname: string;
  checkNick: boolean;
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
    const demo1 = reactive({
      value1: "",
      value2: "",
      showDetails: false,
      selectRow: null,
      isAllChecked: false,
      isIndeterminate: false,
      selectRecords: [] as any[],
      tableData: [
        {
          id: 10001,
          flag1: "Y",
          html1: "",
          html2: "",
          checkedList: [],
          plainOptions: ["多个值", "必需的", "主键值", "主键"],
          button: "",
        },
      ],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    });

    const xTable = ref<VxeTableInstance>();
    const formatDate = (value: any) => {
      return XEUtils.toDateString(value, "yyyy-MM-dd HH:mm:ss.S");
    };

    const filterSexMethod: VxeColumnPropTypes.FilterMethod = ({
      option,
      row,
    }) => {
      return row.sex === option.data;
    };

    const checkboxChangeEvent = () => {
      const $table = xTable.value;
      if (!$table) {
        return;
      }
      demo1.isAllChecked = $table.isAllCheckboxChecked();
      demo1.isIndeterminate = $table.isAllCheckboxIndeterminate();
      demo1.selectRecords = $table.getCheckboxRecords();
    };

    const changeAllEvent = () => {
      const $table = xTable.value;
      if (!$table) {
        return;
      }
      $table.setAllCheckboxRow(demo1.isAllChecked);
      demo1.selectRecords = $table.getCheckboxRecords();
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
    const deleteBtn = async (row: any) => {
      const $table = xTable.value;
      if (!$table) {
        return;
      }
      const type = await VXETable.modal.confirm("您确定要删除该数据?");
      if (type === "confirm") {
        $table.remove(row);
      }
    };
    const add = async (row: any) => {
      const $table = xTable.value;
      if (!$table) {
        return;
      }
      const record = {
        flag1: "Y",
        html1: "",
        html2: "",
        checkedList: [],
        plainOptions: ["多个值", "必需的", "主键值", "主键"],
        button: "",
      };
      const { row: newRow } = await $table.insertAt(record, row);
      await $table.setEditCell(newRow, "name");
    };
    const exportMessage = async () => {
      const res = await getNameSpaces();
      console.log(res, "rrr");
    };
    return {
      value,
      formState,
      demo1,
      xTable,
      formatDate,
      filterSexMethod,
      checkboxChangeEvent,
      changeAllEvent,
      footerMethod,
      deleteBtn,
      add,
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
      <!-- 表格 -->
      <vxe-table
        style="width: auto"
        border
        ref="xTable"
        header-align="center"
        :column-config="{ resizable: true }"
        :footer-method="footerMethod"
        :data="demo1.tableData"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-all="checkboxChangeEvent"
      >
        <vxe-column field="html1" title="名称" width="25%" show-overflow>
          <template #default="{ row }">
            <vxe-input
              v-model="row.value1"
              placeholder="请输入名称"
              size="mini"
            ></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="html2" title="标题" width="25%" show-overflow>
          <template #default="{ row }">
            <vxe-input
              v-model="row.value1"
              placeholder="请输入标题"
              size="mini"
            ></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="flag1" title="类型" width="15%" show-overflow>
          <template #default="{ row }">
            <vxe-select v-model="row.flag1" transfer>
              <vxe-option value="Y" label="是"></vxe-option>
              <vxe-option value="N" label="否"></vxe-option>
            </vxe-select>
          </template>
        </vxe-column>
        <vxe-column field="checkbox" title="属性" width="35%" show-overflow>
          <template #default="{ row }">
            <a-checkbox-group
              v-model="row.checkedList"
              :options="row.plainOptions"
            />
          </template>
        </vxe-column>
        <vxe-column field="button" title="编辑" align="center" show-overflow>
          <template #default="{ row }">
            <a-button type="link" @click="deleteBtn(row)">删除</a-button>
          </template>
        </vxe-column>
      </vxe-table>
      <div class="btn">
        <a-button type="primary" @click="add(-1)"> + 新增加字段</a-button>
      </div>
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
  margin-top: 10px;
  margin-left: 10px;
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
