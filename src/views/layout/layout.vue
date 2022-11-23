<!--
 * @Author: sfy
 * @Date: 2022-11-07 22:22:36
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-23 23:06:59
 * @FilePath: /vulture/src/views/layout/layout.vue
 * @Description: update here
-->
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import vulLogo from "@/components/vulLogo";
export default defineComponent({
  name: "layout-admin",
  components: { vulLogo },
  setup() {
    const router = useRouter();
    const loginOut = () => {
      localStorage.clear();
      router.push({ path: "/login" });
    };
    const toPersonalCenter = () => {
      router.push({ path: "/personalCenter" });
    };
    return {
      loginOut,
      toPersonalCenter
    };
  }
});
</script>
<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" :ellipsis="false">
        <div style="margin: 10px 20px">
          <vulLogo />
        </div>
        <div style="margin: 15px 10px">
          <el-button
            type="warning"
            text
            bg
            @click="$router.push({ path: '/admin/renameBlock' })"
            >应用中心
          </el-button>
          <el-button
            type="warning"
            text
            bg
            @click="$router.push({ path: '/design' })"
            >页面配置
          </el-button>
        </div>
        <div class="flex-grow"></div>
        <el-sub-menu index="user">
          <template #title>
            <el-avatar
              :size="30"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            我的
          </template>
          <el-menu-item index="user-center" @click="toPersonalCenter"
            >个人中心</el-menu-item
          >
          <el-menu-item index="loginout" @click="loginOut"
            >退出登陆</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<style scoped>
.el-header {
  padding: 0px;
}
.el-container {
  height: 100vh;
  overflow: auto;
}
.el-main {
  margin: 0px;
}
.flex-grow {
  flex-grow: 1;
}
</style>
