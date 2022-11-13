<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import type { selectItem } from "./blockList.type";
import { getNameSpaces } from "../../request/namespaces";
import { getModule } from "../../request/module";
import _ from "lodash";
export default defineComponent({
  setup() {
    const value = ref("");
    const options = ref<selectItem[]>([]);
    // const moduleList = ref<selectItem[]>([]);
    onMounted(async () => {
      //模块信息 命名空间下拉框值
      const res = await getNameSpaces();
      if (res.sucess) {
        console.log(res.data, "00000");
        options.value = res.data;
      }
    });
    const data = ref<selectItem[]>([]);

    const handleNodeClick = (data: selectItem) => {
      console.log(data, "4444");
    };
    const defaultProps = {
      label: "label"
    };

    const onChange = async () => {
      console.log("触发change事件");
      console.log(value.value, "6666");
      const res = await getModule(value.value);
      console.log(res.data, "rrr");
      data.value = res.data;
    };

    return {
      value,
      options,
      onChange,
      handleNodeClick,
      data,
      defaultProps
    };
  }
});
</script>
<template>
  <div class="warp">
    <div class="left">
      <el-select
        v-model="value"
        class="m-2"
        placeholder="请选择命名空间"
        @change="onChange"
      >
        <el-option
          v-for="item in options"
          :key="item.namespacesName"
          :label="item.label"
          :value="item.namespacesName"
          size="small"
        />
      </el-select>
      <el-tree
        :data="data"
        icon="ArrowLeft"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </div>
  </div>
</template>
<style scoped lang="less">
.warp {
  background: rgba(250, 250, 250, 1);
  margin-bottom: 2px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  opacity: 1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 15px NaNpx rgba(0, 0, 0, 0.05);

  .left {
    margin-left: 0;
    width: 200px;
    height: 100vh;
    background: rgba(250, 250, 250, 1);
  }
  // .nameList {
  //   margin: 10px;
  //   background: rgba(255, 255, 255, 1);

  //   box-shadow: 0px 6px 15px 2px rgba(0, 0, 0, 0.05);
  // }
}
</style>
