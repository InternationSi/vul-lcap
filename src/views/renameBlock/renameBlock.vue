<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { number } from "vue-types";
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
    const editIndex = ref<number>();
    const visible = ref<boolean>(false);
    const add = () => {
      visible.value = true;
      console.log(editIndex.value,'000');
      
    };
    const deleteBtn = (index: number) => {
      console.log(index);
      dataList.value.splice(index, 1);
    };

    const edit = (index: number) => {
      editIndex.value = index;
      
      visible.value = true;
    };
    const value1 = ref<String>("");
    const value2 = ref<String>("");
    const value3 = ref<String>("");
    const handleOk = (e: MouseEvent) => {
        const addData = {
          name: value1,
          introduce: value2,
          content: value3,
        } as any;
      if (editIndex.value == undefined) {
        dataList.value.push(addData);
      }else{
        dataList.value[editIndex.value] = addData
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
      value1,
      value2,
      value3,
      editIndex,
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
      <a-input
        v-model:value="value1"
        placeholder="请输入名称"
        style="margin-bottom: 10px"
      />
      <a-input
        v-model:value="value2"
        placeholder="请输入介绍"
        style="margin-bottom: 10px"
      />
      <a-input v-model:value="value3" placeholder="请输入内容" />
    </a-modal>
  </div>
</template>
<style scoped lang='less'>
.warp {
  background: rgba(250, 250, 250, 1);

  .top {
    font-size: 35px;
    opacity: 1;
    font-size: 35px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 42px;
    color: rgba(34, 34, 38, 1);
    text-align: left;
    margin-top: 32px;
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
      //   li div .introduce{
      //     padding-left:20px;
      //   }
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


