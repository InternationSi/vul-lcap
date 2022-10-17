<!--
 * @Author: sfy
 * @Date: 2022-10-13 09:57:29
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-16 21:20:01
 * @FilePath: /vulture/packages/vul-admin/src/App.vue
 * @Description: update here
-->
<script lang="ts">
import {
  MailOutlined,
  BellOutlined,
  AppstoreOutlined,
  CloudOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "home",
  components: {
    MailOutlined,
    BellOutlined,
    AppstoreOutlined,
    CloudOutlined,
  },
  setup() {
    const router = useRouter();
    const Email = () => {
      router.push({ path: "/email" });
    };
    const loginOut = () => {
      router.push({ path: "/login" });
    };
    const block = () => {
      router.push({ path: "/editBlock" });
    };
    const rename = () => {
      router.push({ path: "/renameBlock" });
    };
    const openDesign = () => {
      router.push("/grid");
    };
    return {
      selectedKeys: ref<string[]>(["1"]),
      collapsed: ref<boolean>(false),
      Email,
      loginOut,
      block,
      rename,
      openDesign,
    };
  },
});
</script>

<template>
  <div>
    <a-layout-header class="header">
      <div>
        <a-button class="headBtn" @click="rename">
          <template #icon><AppstoreOutlined /></template>
          应用中心
        </a-button>
        <a-button class="headBtn" @click="openDesign">
          <template #icon><CloudOutlined /></template>
          页面中心
        </a-button>
      </div>
      <div style="display: flex; align-items: center">
        <a-dropdown :trigger="['hover']">
          <div>
            <bell-outlined class="bell" />
          </div>
          <template #overlay>
            <a-menu class="dropMenu">
              <a-menu-item key="1">个人中心</a-menu-item>
              <a-menu-item key="2">设置</a-menu-item>
              <a-menu-item key="3" @click="loginOut">退出登陆</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <mail-outlined class="mail" @click="Email" />
      </div>
    </a-layout-header>
    <router-view />
  </div>
</template>

<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
.header {
  background: #fff;
  padding: 0px 20px 0px 200px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
}

.bell {
  font-size: 14px;
  margin-left: 20px;
  margin-right: 20px;
}
.mail {
  font-size: 14px;
}
.dropMenu {
  width: 200px;
  height: auto;
  float: right;
  margin-top: 50px;
}
.headBtn {
  margin-right: 10px;
}
</style>
