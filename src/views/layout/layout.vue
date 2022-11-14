<!--
 * @Author: sfy
 * @Date: 2022-11-07 22:22:36
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-13 20:40:16
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
    return {
      loginOut
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
        <div class="flex-grow"></div>
        <el-sub-menu index="user">
          <template #title>
            <el-avatar
              :size="30"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            我的
          </template>
          <el-menu-item index="user-center">个人中心</el-menu-item>
          <el-menu-item index="loginout" @click="loginOut"
            >退出登陆</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="module">
          <el-sub-menu index="module">
            <template #title>
              <el-icon><location /></el-icon>
              <span>模块管理</span>
            </template>
            <el-menu-item
              index="renameBlock"
              @click="$router.push({ path: '/renameBlock' })"
              >命名空间</el-menu-item
            >
            <el-menu-item
              index="moduleEditor"
              @click="$router.push({ path: '/moduleEditor' })"
              >编辑模块</el-menu-item
            >
            <el-menu-item
              index="blockList"
              @click="$router.push({ path: '/blockList' })"
              >模型列表</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="page">
            <template #title>
              <el-icon><location /></el-icon>
              <span>业务编排</span>
            </template>
            <el-menu-item index="grid" @click="$router.push({ path: '/grid' })"
              >页面配置</el-menu-item
            >
            <el-menu-item
              index="comsCreate"
              @click="$router.push({ path: '/comsCreate' })"
              >组件配置</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
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
