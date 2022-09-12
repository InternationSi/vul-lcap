<script  lang="ts">
import { defineComponent, ref } from "vue";
import {useRouter} from 'vue-router'
export default defineComponent({
  setup() {
    const password = ref("");
    const user = ref("");
    const activeKey = ref("1");
    const phone = ref('');
    const checkedCode = ref('')
    const router = useRouter()
    const clickAdd = ()=>{
      router.push({path:'/home'})
      
    }
    // const value1 = ref('+86')
    return {
      activeKey,
      password,
      user,
      phone,
      checkedCode,
      clickAdd,
     router
    };
  },
});
</script>

<template>
  <div class="box">
    <div class="change">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="验证码登陆">
          <a-input v-model:value="phone" placeholder="请输入手机号"  />
          <a-input v-model:value="checkedCode" placeholder="请输入验证码" style="margin-top:20px;" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="密码登陆" force-render>
          <a-input v-model:value="user" placeholder="请输入账号" />
          <a-input-password v-model:value="password" placeholder="请输入密码" style="margin-top:20px;"/>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="login" @click="clickAdd">登陆</div>
  </div>
</template>

<style scoped >
.box {
  height: 100vh;
  width: 100%;
}
.login{
  background: rgb(65, 60, 217);
  margin-top:50px;
  line-height:30px;
  height:30px;
  color:white;
  text-align: center;
}
</style>
