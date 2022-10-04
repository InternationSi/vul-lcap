<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { any, number } from "vue-types";
import _ from 'lodash'
interface FormState {
  name: string;
  introduce: string;
  content: string;
}
export default defineComponent({
  setup() {
  
    const dataList = ref([
      {
        name: "第一个列表",
        introduce: "介绍一下",
        content: "标签1",
      },
      {
        name: "第二个列表",
        introduce: "介绍一下",
        content: "标签2",
      },
      {
        name: "第三个列表",
        introduce: "介绍一下",
        content: "标签3",
      },
    ]);

    const formState = reactive<FormState>({
      name: "",
      introduce: "",
      content: "",
    });
    const editIndex = ref<number>();
    const visible = ref<boolean>(false);
    const add = () => {
      formState.name = "",
      formState.introduce= "",
      formState.content= "",
      visible.value = true;
      console.log(formState,'333');
    };
    const deleteBtn = (index: number) => {
      console.log(index);
      dataList.value.splice(index, 1);
    };

    const edit = (index: number) => {
      editIndex.value = index;
      visible.value = true;
      formState.name = dataList.value[index].name
      formState.introduce = dataList.value[index].introduce
      formState.content = dataList.value[index].content
    };

    const handleOk = (e: MouseEvent) => {
      if (editIndex.value == undefined) {
        var deep = _.cloneDeep(formState);
        dataList.value.push(deep)
      } else {
        var deep1 = _.cloneDeep(formState);
        dataList.value[editIndex.value] = deep1
      }
      visible.value = false;
    };

    return {
      add,
      dataList,
      deleteBtn,
      visible,
      edit,
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
          <span class="header">{{ item.name }}</span>
          <span class="introduce">{{ item.introduce }}</span>
          <p>{{ item.content }}</p>
        </div>
        <div>
          <a-button type="link" @click="edit(index)">编辑</a-button>
          <a-button type="link" @click="deleteBtn(index)">删除</a-button>
        </div>
      </li>
    </ul>
    <a-modal
      v-model:visible="visible"
      :title="editIndex != undefined ? '编辑' : '新增'"
      @ok="handleOk"
    >
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        labelAlign="left"
      >
        <a-form-item
          label="Name"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item
          label="introduce"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input v-model:value="formState.introduce" />
        </a-form-item>
        <a-form-item
          label="content"
          name="content"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input v-model:value="formState.content" />
        </a-form-item>
      </a-form>
      <!-- <a-input
        v-model:value="value1"
        placeholder="请输入名称"
        style="margin-bottom: 10px"
      />
      <a-input
        v-model:value="value2"
        placeholder="请输入介绍"
        style="margin-bottom: 10px"
      />
      <a-input v-model:value="value3" placeholder="请输入内容" /> -->
    </a-modal>
  </div>
</template>
<style scoped lang='less'>
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


