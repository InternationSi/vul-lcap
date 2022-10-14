<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
// import { any, number } from "vue-types";

import {
  getNameSpaces,
  addNameSpaces,
  editNameSpaces,
} from "../../request/namespaces";
import _ from "lodash";
import type { NsType } from "./renameBlock.type";
// import { string } from "vue-types";

export default defineComponent({
  setup() {
    const dataList = ref<NsType[]>([]);
    onMounted(async () => {
      const res = await getNameSpaces();
      if (res.sucess) {
        dataList.value = res.data;
      }
    });
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
    const deleteBtn = (index: number) => {
      console.log(index);
      dataList.value.splice(index, 1);
    };

    const edit = (index: number) => {
      editIndex.value = true;
      visible.value = true;
      formState.namespacesName = dataList.value[index].namespacesName;
      formState.label = dataList.value[index].label;
      formState.describe = dataList.value[index].describe;
    };
    const handleCancel = () => {
      visible.value = false;
    };
    const handleOk = async (e: MouseEvent) => {
      if (!editIndex.value) {
        let deep = _.cloneDeep(formState);
        const res = await addNameSpaces(deep);
        console.log(res, "uuuu");
        const resList = await getNameSpaces();
        dataList.value = resList.data;
      } else {
        var deep1 = _.cloneDeep(formState);
        const resList = await editNameSpaces(deep1);
        console.log(resList, "pppp");
        if (resList.sucess) {
          const resList = await getNameSpaces();
          dataList.value = resList.data;
        }
      }
      visible.value = false;
    };

    return {
      add,
      dataList,
      deleteBtn,
      visible,
      edit,
      handleCancel,
      handleOk,
      editIndex,
      formState,
    };
  },
});
</script>
<template>
  <div class="warp">
    <div class="top">命名空间</div>
    <a-button type="primary" @click="add()" class="btn">新增</a-button>
    <ul class="content" v-for="(item, index) in dataList" :key="index">
      <li>
        <div>
          <span class="header">{{ item.namespacesName }}</span>
          <span class="introduce">{{ item.label }}</span>
          <p>{{ item.describe }}</p>
        </div>
        <div>
          <a-button type="link" @click="edit(index)">编辑</a-button>
          <a-button type="link" @click="deleteBtn(index)">删除</a-button>
        </div>
      </li>
    </ul>
    <a-modal
      :visible="visible"
      cancelText="取消"
      okText="确定"
      :title="editIndex == true ? '编辑' : '新增'"
      @ok="handleOk"
      @cancel="handleCancel"
      style="min-height: 330px"
    >
      <a-form :model="formState">
        <a-form-item label="Name" prop="namespacesName">
          <a-input
            v-model="formState.namespacesName"
            :disabled="editIndex == true"
          />
        </a-form-item>

        <a-form-item label="标签">
          <a-input v-model="formState.label" />
        </a-form-item>
        <a-form-item label="介绍">
          <a-input type="textarea" rows="3" v-model="formState.describe" />
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
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 20px;
        color: rgba(34, 34, 38, 1);
      }

      li div p {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 17px;
        color: rgba(117, 117, 117, 1);
      }
    }
  }
}
</style>
