<script lang="ts">
import { defineComponent, ref, provide } from "vue";
import { useRouter } from "vue-router";

interface breadList {
  name: string;
  path: string;
}
export default defineComponent({
  setup() {
    const breadcrumbList = ref<breadList[]>([]);
    const router = useRouter();
    const url = router.currentRoute;
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
    const breadClick = (item: any) => {
      router.push({ path: item.path });
    };
    return {
      breadcrumbList,
      router,
      url,
      breadFn,
      breadClick
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
          @click="breadClick(item)"
          >{{ item.name }}</el-breadcrumb-item
        >
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
