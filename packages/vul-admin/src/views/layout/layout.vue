<script lang="ts">
import { UserOutlined, MenuOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "home",
  components: {
    UserOutlined,
    MenuOutlined,
  },
  setup() {
    const router = useRouter();
    const selectedKeys = ref<string[]>(["1"]);
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
</style>
