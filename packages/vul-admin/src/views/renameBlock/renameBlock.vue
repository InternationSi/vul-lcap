<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
// import { any, number } from "vue-types";
import type { FormInstance } from "ant-design-vue";
// import type { Rule } from "ant-design-vue/es/form";
import { message } from "ant-design-vue";
import {
  getNameSpaces,
  addNameSpaces,
  editNameSpaces,
  deletNameSpaces,
} from "../../request/namespaces";
import _ from "lodash";
import type { NsType } from "./renameBlock.type";
export default defineComponent({
  setup() {
    const dataList = ref<NsType[]>([]);
    onMounted(async () => {
      const res = await getNameSpaces();
      if (res.sucess) {
        dataList.value = res.data;
      }
    });
    const formRef = ref<FormInstance>();
    const formState = reactive<NsType>({
      namespacesName: "",
      label: "",
      describe: "",
    });
    const editIndex = ref<boolean>(false);
    const visible = ref<boolean>(false);
    const add = () => {
      (formState.namespacesName = ""),
        (formState.label = ""),
        (formState.describe = ""),
        (visible.value = true);
      editIndex.value = false;
    };

    const edit = (index: number) => {
      editIndex.value = true;
      visible.value = true;
      formState.namespacesName = dataList.value[index].namespacesName;
      formState.label = dataList.value[index].label;
      formState.describe = dataList.value[index].describe;
    };
    const cancel = () => {
      visible.value = false;
    };
    const handleOk = async (e: MouseEvent) => {
      console.log(formState.label, "11111");
      const res = await formRef.value?.validateFields();
      console.log(res, "===");
      if (!editIndex.value) {
        let deep = _.cloneDeep(formState);
        console.log(deep, "77777");
        const res = await addNameSpaces(deep);
        console.log(res, "222");
        message.success(res.msg);
        const resList = await getNameSpaces();
        dataList.value = resList.data;
      } else {
        var deep1 = _.cloneDeep(formState);
        const resList = await editNameSpaces(deep1);
        message.success(resList.msg);
        if (resList.sucess) {
          const resList = await getNameSpaces();
          dataList.value = resList.data;
        }
      }
      visible.value = false;
    };
    const confirm = async (index: number) => {
      var name = _.cloneDeep(dataList.value[index].namespacesName);
      const res = await deletNameSpaces(name);
      if (res.sucess) {
        message.success(res.msg);
        const res2 = await getNameSpaces();
        if (res2.sucess) {
          dataList.value = res2.data;
        }
      }
    };
    const cancelPop = (e: MouseEvent) => {
      console.log(e);
    };
    const layout = reactive({
      labelCol: { span: 3 },
    });

    return {
      formRef,
      add,
      dataList,
      // deleteBtn,
      visible,
      edit,
      cancel,
      handleOk,
      editIndex,
      formState,
      confirm,
      cancelPop,
      layout,
    };
  },
});
</script>
<template>
  <div class="warp">
    <div class="top">命名空间</div>
    <a-button type="primary" @click="add()" class="btn">新增</a-button>
    <ul
      class="content"
      v-for="(item, index) in dataList"
      :key="index"
      style="padding-right: 30px"
    >
      <li>
        <div>
          <span class="header" style="font-size: 14px">{{ item.label }}</span>
          <a-tag color="blue" style="margin-left: 20px; font-size: 12px">{{
            item.namespacesName
          }}</a-tag>
          <p style="color: rgba(117, 117, 117, 1); font-size: 12px">
            {{ item.describe }}
          </p>
        </div>
        <div>
          <a-button type="link" @click="edit(index)" style="font-size: 14px"
            >编辑</a-button
          >
          <a-popconfirm
            title="是否确定删除此项目?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(index)"
            @cancel="cancelPop"
          >
            <a href="#" style="font-size: 14px">删除</a>
          </a-popconfirm>
        </div>
      </li>
    </ul>
    <a-modal
      :visible="visible"
      :title="editIndex == true ? '编辑' : '新增'"
      @ok="handleOk"
      @cancel="cancel"
      cancelText="取消"
      okText="确定"
      style="min-height: 330px"
    >
      <a-form
        ref="formRef"
        name="custom-validation"
        :model="formState"
        :labelCol="{ span: 3 }"
      >
        <a-form-item
          label="Names"
          name="namespacesName"
          :rules="[{ required: true, message: '请填写名称' }]"
        >
          <a-input
            v-model:value="formState.namespacesName"
            :disabled="editIndex"
          />
        </a-form-item>
        <a-form-item
          label="标签"
          name="label"
          :rules="[{ required: true, message: '请填写标签' }]"
        >
          <a-input v-model:value="formState.label" />
        </a-form-item>
        <a-form-item label="介绍" name="describe">
          <a-textarea v-model:value="formState.describe" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<style scoped lang="less">
.warp {
  background: rgba(250, 250, 250, 1);

  .top {
    font-size: 35px;
    opacity: 1;
    font-size: 25px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 42px;
    color: rgba(34, 34, 38, 1);
    text-align: left;
    padding-top: 32px;
    margin-left: 30px;
  }

  .btn {
    margin-left: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .content {
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(238, 238, 238, 1);

      li div .header {
        font-size: 25px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 20px;
        color: rgba(34, 34, 38, 1);
      }

      li div p {
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 17px;
        color: rgba(117, 117, 117, 1);
      }
    }
  }
}
</style>
