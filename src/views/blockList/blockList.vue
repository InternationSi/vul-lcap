<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
// import { any, number } from "vue-types";
import type { selectItem } from "./blockList.type";
// import type { Rule } from "ant-design-vue/es/form";
import { message } from "ant-design-vue";
import {
  getNameSpaces,
  addNameSpaces,
  editNameSpaces,
  deletNameSpaces
} from "../../request/namespaces";
import _ from "lodash";
export default defineComponent({
  setup() {
    const value = ref("");
    const options = ref<selectItem[]>([]);
    onMounted(async () => {
      //模块信息 命名空间下拉框值
      const res = await getNameSpaces();
      if (res.sucess) {
        console.log(res.data, "00000");
        options.value = res.data;
      }
    });

    return {
      value,
      options
    };
  }
});
</script>
<template>
  <div class="warp">
    <div class="left">
      <el-select v-model="value" class="m-2" placeholder="请选择命名空间">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          size="small"
        />
      </el-select>
    </div>
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

  .left {
    width: 200px;
    height: 100vh;
    background: rgba(250, 250, 250, 1);
  }
}
</style>
