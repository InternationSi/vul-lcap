<script lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";

import { useRoute } from "vue-router";
import { defineComponent, ref, reactive, onMounted } from "vue";
export default defineComponent({
  setup() {
    const route = useRoute();

    return {
      route
    };
  }
});
</script>
<template>
  <div>
    <div style="margin: 20px">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/admin/moduleNav/moduleList' }"
          >模型列表</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/admin/moduleNav/moduleAttribute' }"
          >模型属性</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <router-view></router-view>
  </div>
</template>

<style></style>
