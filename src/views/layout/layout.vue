<script lang="ts">
import {
  UserOutlined,
  MenuOutlined,
  BellOutlined,
  AppstoreOutlined,
  CloudOutlined
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "home",
  components: {
    UserOutlined,
    MenuOutlined,
    BellOutlined,
    AppstoreOutlined,
    CloudOutlined
  },
  setup() {
    const router = useRouter();
    const selectedKeys = ref<string[]>(["1"]);
    const Email = () => {
      router.push({ path: "/email" });
    };
    const loginOut = () => {
      sessionStorage.clear();
      router.push({ path: "/login" });
    };
    const block = () => {
      router.push({ path: "/moduleEditor" });
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
      openDesign
    };
  }
});
</script>
<template>
  <a-layout-header ref="header" class="header">
    <div>
      <a-button class="headBtn" @click="rename">
        <template #icon>
          <AppstoreOutlined />
        </template>
        应用中心
      </a-button>
      <a-button class="headBtn" @click="openDesign">
        <template #icon>
          <CloudOutlined />
        </template>
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
  <a-layout>
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      style="
        background: #ffff;
        height: calc(100vh - 80px);
        width: 250px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
      "
    >
      <div style="height: 30px">
        <menu-outlined
          v-if="collapsed"
          style="font-size: 14px; margin-left: 32px; padding-top: 10px"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
          style="font-size: 14px; margin-left: 24px; padding-top: 10px"
        />
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="inline"
        style="height: 100%"
      >
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>模块管理</span>
            </span>
          </template>
          <a-menu-item key="1" @click="rename">命名空间</a-menu-item>
          <a-menu-item key="2" @click="block">编辑模块</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout-content class="content">
      <router-view> </router-view>
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.content {
  padding: 12px;
  height: calc(100vh - 50px);
  overflow: auto;
}

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
