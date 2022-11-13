<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "ant-design-vue";
import { message } from "ant-design-vue";
import {
  getNameSpaces,
  addNameSpaces,
  editNameSpaces,
  deletNameSpaces
} from "../../request/namespaces";
import _ from "lodash";
import type { NsType } from "./renameBlock.type";

export default defineComponent({
  setup() {
    const dataList = ref<NsType[]>([]);
    onMounted(async () => {
      const res = await getNameSpaces();
      dataList.value = res;
    });
    const formRef = ref<FormInstance>();
    const formState = reactive<NsType>({
      namespace_name: "",
      namespace_label: "",
      describe: "",
      id: ""
    });
    const editIndex = ref<boolean>(false);
    const visible = ref<boolean>(false);
    const add = () => {
      (formState.namespace_name = ""),
        (formState.namespace_label = ""),
        (formState.describe = ""),
        (visible.value = true);
      editIndex.value = false;
    };

    const edit = (index: number) => {
      editIndex.value = true;
      visible.value = true;
      formState.namespace_name = dataList.value[index].namespace_name;
      formState.namespace_label = dataList.value[index].namespace_label;
      formState.describe = dataList.value[index].describe;
    };
    const cancel = () => {
      visible.value = false;
    };
    const handleOk = async (e: MouseEvent) => {
      console.log(formState.namespace_label, "11111");
      // const res = await formRef.value?.validateFields();
      // console.log(res, "===");
      if (!editIndex.value) {
        let deep = _.cloneDeep(formState);
        console.log(deep, "77777");
        const res = await addNameSpaces(deep);
        ElMessage({
          message: "添加数据成功",
          type: "success"
        });
        console.log(res, "222");
        //查询接口
        const resList = await getNameSpaces();
        dataList.value = resList;
      } else {
        var deep1 = _.cloneDeep(formState);
        const editList = await editNameSpaces(deep1);
        ElMessage({
          message: "修改数据成功",
          type: "success"
        });
        const resList = await getNameSpaces();
        dataList.value = resList;
      }
      visible.value = false;
    };
    const confirm = async (index: number) => {
      var deleteId = _.cloneDeep(dataList.value[index].id);
      const res = await deletNameSpaces(deleteId);
      ElMessage({
        message: "删除成功",
        type: "success"
      });
      const res2 = await getNameSpaces();

      dataList.value = res2;
    };
    const cancelPop = (e: MouseEvent) => {
      console.log(e);
    };
    const labelPosition = ref("right");
    const layout = reactive({
      labelCol: { span: 3 }
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
      labelPosition
    };
  }
});
</script>
<template>
  <div class="warp">
    <h2>命名空间</h2>
    <el-button type="primary" @click="add()" class="btn">新增</el-button>
    <ul
      class="content"
      v-for="(item, index) in dataList"
      :key="index"
      style="padding-right: 30px"
    >
      <li>
        <div>
          <span class="header" style="font-size: 14px">{{
            item.namespace_label
          }}</span>
          <el-tag style="margin-left: 20px">{{ item.namespace_name }}</el-tag>
          <p
            style="color: rgba(117, 117, 117, 1); font-size: 12px; height: 55px"
          >
            {{ item.describe }}
          </p>
          <p style="color: rgba(117, 117, 117, 1); font-size: 12px"></p>
        </div>
        <div>
          <el-button
            type="primary"
            text
            @click="edit(index)"
            style="font-size: 14px"
            >编辑</el-button
          >
          <el-popconfirm
            title="是否确定删除此项目?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(index)"
            @cancel="cancelPop"
          >
            <template #reference>
              <el-button text type="primary" style="font-size: 14px"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </div>
      </li>
    </ul>
    <el-dialog
      v-model="visible"
      :title="editIndex == true ? '编辑' : '新增'"
      style="min-height: 330px"
    >
      <el-form
        ref="formRef"
        :label-position="labelPosition"
        :model="formState"
        :labelCol="{ span: 3 }"
      >
        <el-form-item
          label="Names"
          label-width="70px"
          :rules="[
            {
              required: true,
              message: '只能输入字母!',
              pattern: /^[a-z]+$/,
              trigger: 'blur'
            }
          ]"
        >
          <el-input v-model="formState.namespace_name" :disabled="editIndex" />
        </el-form-item>
        <el-form-item
          label="标签"
          label-width="70px"
          :rules="[{ required: true, message: '请填写标签' }]"
        >
          <el-input v-model="formState.namespace_label" />
        </el-form-item>
        <el-form-item label="介绍" label-width="70px">
          <el-input type="textarea" v-model="formState.describe" />
        </el-form-item>
      </el-form>
      <el-button @click="cancel" style="margin-left: 280px">取消</el-button>
      <el-button type="primary" @click="handleOk"> 确定 </el-button>
    </el-dialog>
  </div>
</template>
<style scoped lang="less">
.warp {
  background: rgba(250, 250, 250, 1);
  margin-bottom: 2px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  opacity: 1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 15px NaNpx rgba(0, 0, 0, 0.05);

  .top {
    font-size: 35px;
    opacity: 1;
    font-size: 25px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 42px;
    color: rgba(34, 34, 38, 1);
    text-align: left;
    padding-top: 10px;
    margin-left: 30px;
  }

  .btn {
    // margin-left: 30px;
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
        height: 55px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 17px;
        color: rgba(117, 117, 117, 1);
      }
    }
  }
}
</style>
