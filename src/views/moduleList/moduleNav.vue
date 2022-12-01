<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, ref, reactive, onMounted } from "vue";
interface breadList {
  name: string;
  path: string;
}
export default defineComponent({
  setup() {
    const route = useRoute();
    const breadcrumbList = ref<breadList[]>([]);
    onMounted(async () => {
      breadcrumbList.value.push({
        name: "模型列表",
        path: "/admin/moduleNav/moduleList"
      });
    });

    return {
      route,
      breadcrumbList
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(from, "aaaaa");
    next();
  }
});
</script>
<template>
  <div class="wrap">
    <div style="padding: 20px 0 0 20px">
      <el-breadcrumb>
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="index"
          >{{ item.name }}</el-breadcrumb-item
        >
        <!-- <el-breadcrumb-item :to="{ path: '/admin/moduleNav/moduleList' }"
          >模型列表</el-breadcrumb-item
        > -->
        <!-- <el-breadcrumb-item :to="{ path: '/admin/moduleNav/moduleAttribute' }"
          >模型属性</el-breadcrumb-item
        > -->
      </el-breadcrumb>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
.wrap {
  background: #ffff;
}
</style>
