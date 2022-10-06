<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  SearchOutlined,
  MenuOutlined,
  MailOutlined,
  BellOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    SearchOutlined,
    MenuOutlined,
    MailOutlined,
    BellOutlined,
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
    const rename =()=>{
      router.push({path:"/renameBlock"})
    }
    const openDesign = () => {
      router.push('/client/design')
    }
    return {
      selectedKeys: ref<string[]>(["1"]),
      collapsed: ref<boolean>(false),
      Email,
      loginOut,
      block,
      rename,
      openDesign
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
      style="background: #ffff; width: 272px border-left: 1px solid rgba(0, 0, 0, 0.1);"
    >
      <div style="height: 50px">
        <menu-outlined
          v-if="collapsed"
          style="font-size: 14px; margin-left: 24px; padding-top: 20px"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
          style="font-size: 14px; margin-left: 24px; padding-top: 20px"
        />
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="inline"
        style="height: 100vh"
      >
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>模块管理</span>
            </span>
          </template>
          <a-menu-item key="4" @click="rename">命名空间</a-menu-item>
          <a-menu-item key="3" @click="block">编辑模块</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>应用空间</span>
            </span>
          </template>
          <a-menu-item key="6" @click="openDesign">页面构建器</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout class="right">
      <a-layout-header class="header">
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
      </a-layout-header>
      <a-layout-content class="content">
          <router-view > </router-view>
      </a-layout-content>
      <a-layout-footer class="foot">
        <div class="saveBtn">
          <a-radio-button value="default" class="saveClose">保存并关闭</a-radio-button>
          <a-button type="primary">保存</a-button>
        </div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.site-layout .site-layout-background {
  background: #fff;
}
.right{
  display:flex;
  flex-direction: column;
}
.header {
  background: #fff;
  padding: 0;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  height: 50px;
}

.content{
  overflow: hidden;
  padding-bottom:80px;
}
.bell {
  font-size: 14px;
  float: right;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}
.mail {
  font-size: 14px;
  float: right;
  margin-top: 20px;
}
.dropMenu {
  width: 200px;
  height: auto;
  float: right;
  margin-top: 50px;
}
.foot{
  /* padding-left:200px; */
  position: fixed;
  height: 80px;
  width:86%;
  bottom:0;
  background: #ffff;
  justify-content: space-between ;
  padding-left:0;
  padding-right:0;
}
.saveBtn{
  float:right;
   margin-right:15px;
}
.saveClose{
  margin-right:20px;
}
</style>
