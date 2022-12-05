<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, ref, provide, onMounted } from "vue";
import { useRouter } from "vue-router";

import { inject } from "vue";
interface breadList {
  name: string;
  path: string;
}
export default defineComponent({
  setup() {
    const route = useRoute();
    const breadcrumbList = ref<breadList[]>([]);
    onMounted(async () => {
      // provide("breadDataList", {
      //   name: "模型列表",
      //   path: "/admin/moduleNav/moduleList"
      // });
      // const breadDataList = inject("breadData");
      // if (!breadDataList) {
      //   breadcrumbList.value.push({
      //     name: "模型列表",
      //     path: "/admin/moduleNav/moduleList"
      //   });
      // }
    });
    const router = useRouter();
    const url = router.currentRoute;
    console.log(url.value, "000000");
    const breadFn = () => {
      console.log("hhhhh");
      if (url.value.path == "/admin/moduleNav/moduleList") {
        breadcrumbList.value = [
          { name: "模型列表", path: "/admin/moduleNav/moduleList" }
        ];
      } else {
        breadcrumbList.value = [
          { name: "模型列表", path: "/admin/moduleNav/moduleList" },
          { name: "模型属性", path: "/admin/moduleNav/moduleAttribute" }
        ];
      }
    };
    provide("breadDataList", breadFn);
    return {
      route,
      breadcrumbList,
      router,
      url,
      breadFn
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
