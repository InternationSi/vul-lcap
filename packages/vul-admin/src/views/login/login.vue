<script lang="ts">
import { defineComponent, ref, watch, reactive } from "vue";
import { useRouter } from "vue-router";
import { handleLogin } from "@/request/index";
import { message } from 'ant-design-vue';


export default defineComponent({
  setup() {
    const router = useRouter();
    const activeKey = ref("1");
    let formUser = reactive({
      password: '',
      userName: ''
    })
    let formPhone = reactive({
      phoneValue: '',
      codePhone: ''
    })
    let formEmail = reactive({
      emailValue: '',
      codeEmail: ''
    })
    let formData = reactive({
    })
    //判断按钮状态
    const show = ref(true)
    //倒计时
    const count = ref(60)
    //定时器
    const timer = ref('')
    //11位手机号码正则
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    //邮箱正则
    const reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let checked = ref("");
    let codeShow = ref(false)
    //判断密码登录还是扫码登录
    let boxShow = ref(true);
    //切换登录方式
    const changeBox = () => {
      boxShow.value = !boxShow.value;
    };
    //登录
    const Login = async () => {
      // if (formData.hasOwnProperty("phoneValue")) {
      //   !reg_tel.test(formData.phoneValue)
      // }
      const res = await handleLogin(formData)
      if (res.code == 200) {
        message.success(res.msg);
        router.push('/')
        sessionStorage.setItem('login', JSON.stringify(res.data))
      } else {
        message.error(res.msg);
      }
    }
    //倒计时
    const getCode = () => {
      show.value = false;
      const Timer = setInterval(() => {
        if (count.value > 0 && count.value <= 60) {
          count.value--;
        } else {
          show.value = true;
          clearInterval(Timer);
          count.value = 60
        }
      }, 1000)
    };
    //跳转至注册页
    const toRegister = () => {
      router.push('/register')
    }
    watch(activeKey, (newVal) => {
      if (newVal == '1') {
        formData = formPhone
      } else if (newVal == '2') {
        formData = formEmail
      } else {
        formData = formUser
      }
    })
    return {
      //变量
      activeKey,
      codeShow,
      timer,
      show,
      count,
      formPhone,
      formEmail,
      formUser,
      reg_tel,
      reg_email,
      checked,
      router,
      boxShow,
      //函数
      changeBox,
      Login,
      getCode,
      toRegister
    };
  },
});
</script>

<template>
  <div class="login">
    <div class="loginBox">
      <div class="centerBox">
        <div class="leftBox">
          <div class="introduce">项目成立于2022年</div>
        </div>
        <div class="rightBox">
          <div v-if="boxShow" style="height: 100%">
            <div class="main">
              <img class="imgPath" src="../../assets/images/qrcode.png" alt="" @click="changeBox" />
              <div class="title">欢迎使用~~</div>
              <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="手机号">
                  <a-input v-model:value="formPhone.phoneValue" placeholder="请输入手机号" />
                  <a-button @click="getCode">
                    <span style="width: 70px;display: inline-block;" v-show="show">获取验证码</span>
                    <span style="width: 70px;display: inline-block;" v-show="!show" class="count">{{count}} s</span>
                  </a-button>
                  <a-input class="code" v-model:value="formPhone.codePhone" placeholder="请输入验证码" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="邮箱">
                  <a-input v-model:value="formEmail.emailValue" placeholder="请输入邮箱" />
                  <a-button @click="getCode">
                    <span style="width: 70px;display: inline-block;" v-show="show">获取验证码</span>
                    <span style="width: 70px;display: inline-block;" v-show="!show" class="count">{{count}} s</span>
                  </a-button>
                  <a-input class="code" v-model:value="formEmail.codeEmail" placeholder="请输入验证码" />
                </a-tab-pane>
                <a-tab-pane key="3" tab="账号密码">
                  <a-input style="width:288px" v-model:value="formUser.userName" placeholder="请输入用户名" />
                  <a-input class="code" v-model:value="formUser.password" placeholder="请输入密码" />
                  <p style="margin-bottom: -5px;float: right;">没有账号？<span
                      style="color: skyblue;font-size: 12px;cursor: pointer;" @click="toRegister">请注册</span> </p>
                </a-tab-pane>
              </a-tabs>

              <a-button class="nextBtn" @click="Login">下一步</a-button>
              <div class="agreement">
                <a-checkbox v-model:checked="checked">我已阅读并同意 <a href=""> 服务协议 </a> 和
                  <a href=""> 隐私政策 </a>
                </a-checkbox>
              </div>
              <div class="foot">
                <div class="line"></div>
                <div class="text">更多</div>
                <div class="line"></div>
              </div>
              <a-button class="footBtn">sso登录</a-button>
            </div>
          </div>
          <div v-else style="height: 100%">
            <div class="main">
              <img class="imgPath" src="../../assets/images/pc.png" alt="" @click="changeBox" />
              <img class="imgQrCode" src="../../assets/images/laijiaw.png" alt="" />
              <h2 style="font-weight: bold">来加我</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomBox"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  min-width: 1040px;
  min-height: 99.9vh;
  position: relative;

  .loginBox {
    height: calc(100% - 40px);
    margin-top: 40px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 1000px;
    z-index: 1;

    .centerBox {
      height: 80%;
      // box-shadow: 0px 20px 80px 0px rgb(0 0 0 / 30%);
      display: flex;

      .leftBox {
        width: 50%;
        background-image: url("../../assets/images/tujiu.jpeg");
        // background-repeat: no-repeat;
        // background-size: 170%;
        font-size: 18px;
        font-weight: bold;
      }

      .rightBox {
        width: 50%;

        background-color: rgb(223, 223, 223);
        position: relative;

        .main {
          height: 90%;
          width: 70%;
          background-color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          border-radius: 10px;
          padding: 30px;

          .ant-input {
            border-radius: 5px;
            border: 1px solid rgb(171, 171, 171);
          }

          .imgPath {
            position: absolute;
            top: 0;
            right: 0;
          }

          .imgQrCode {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
          }

          .title {
            // padding-left: 30px;
            // padding-top: 30px;
            font-weight: bold;
            font-size: 22px;
          }

          .ant-tabs {
            margin-bottom: 20px;

            .ant-input {
              width: 175px;
              margin-right: 10px;
            }

            .code {
              width: 288px;
              margin-top: 20px;
            }

            .ant-btn {
              border-radius: 5px;
              border: 1px solid rgb(171, 171, 171);
            }
          }

          .nextBtn {
            width: 100%;
            border-radius: 5px;
            background-color: #3270ff;
            color: #fff;
            margin-bottom: 20px;
          }

          .agreement {
            position: absolute;
            bottom: 100px;
          }

          .foot {
            display: flex; //生成浏览器兼容性代码
            width: 80%;
            margin: 30px auto 24px auto;
            position: absolute;
            bottom: 40px;

            .line {
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgb(190, 188, 188);
            }

            .text {
              padding: 0 14px;
              font-size: 14px;
            }
          }

          .footBtn {
            width: 80%;
            position: absolute;
            bottom: 15px;
            right: 38px;
            border: 1px solid rgb(171, 171, 171);
            border-radius: 50px;
          }
        }
      }
    }
  }
}
</style>
