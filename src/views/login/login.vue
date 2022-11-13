<script lang="ts">
import { defineComponent, ref, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/store/login';
import { message } from 'ant-design-vue';
export default defineComponent({
  setup() {
    const store = useLoginStore();
    const router = useRouter();
    const activeKey = ref('3');
    let formUser = reactive({
      password: 'admin',
      username: 'superadmin',
    });
    let formPhone = reactive({
      phoneValue: '',
      codePhone: '',
    });
    let formEmail = reactive({
      emailValue: '',
      codeEmail: '',
    });
    let formData = reactive({});
    //判断按钮状态
    const show = ref(true);
    //倒计时
    const count = ref(60);
    //定时器
    const timer = ref('');
    //11位手机号码正则
    const reg_tel =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    //邮箱正则
    const reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let checked = ref('');
    let codeShow = ref(false);
    //判断密码登录还是扫码登录
    let boxShow = ref(true);
    //切换登录方式
    const changeBox = () => {
      boxShow.value = !boxShow.value;
    };
    //登录
    const Login = async () => {
      await store
        .login(formData)
        .then(() => {
          message.success('登录成功');
          router.push('/');
        })
        .catch(() => {
          message.error('登录失败,请稍后再试');
        });
    };
    //倒计时
    const getCode = () => {
      show.value = false;
      const Timer = setInterval(() => {
        if (count.value > 0 && count.value <= 60) {
          count.value--;
        } else {
          show.value = true;
          clearInterval(Timer);
          count.value = 60;
        }
      }, 1000);
    };
    //跳转至注册页
    const toRegister = () => {
      router.push('/register');
    };
    watch(
      activeKey,
      (newVal) => {
        if (newVal == '1') {
          formData = formPhone;
        } else if (newVal == '2') {
          formData = formEmail;
        } else {
          formData = formUser;
        }
      },
      { immediate: true }
    );
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
      store,
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
              <img
                class="imgPath"
                src="../../assets/images/qrcode.png"
                alt=""
                @click="changeBox"
              />
              <div class="title">欢迎使用~~</div>
              <el-tabs v-model="activeKey">
                <el-tab-pane name="1" label="手机号">
                  <el-input
                    v-model="formPhone.phoneValue"
                    placeholder="请输入手机号"
                  />
                  <el-button @click="getCode">
                    <span
                      style="width: 70px; display: inline-block"
                      v-show="show"
                      >获取验证码</span
                    >
                    <span
                      style="width: 70px; display: inline-block"
                      v-show="!show"
                      class="count"
                      >{{ count }} s</span
                    >
                  </el-button>
                  <el-input
                    class="code"
                    v-model="formPhone.codePhone"
                    placeholder="请输入验证码"
                  />
                </el-tab-pane>
                <el-tab-pane name="2" label="邮箱">
                  <el-input
                    v-model="formEmail.emailValue"
                    placeholder="请输入邮箱"
                  />
                  <el-button @click="getCode">
                    <span
                      style="width: 70px; display: inline-block"
                      v-show="show"
                      >获取验证码</span
                    >
                    <span
                      style="width: 70px; display: inline-block"
                      v-show="!show"
                      class="count"
                      >{{ count }} s</span
                    >
                  </el-button>
                  <el-input
                    class="code"
                    v-model="formEmail.codeEmail"
                    placeholder="请输入验证码"
                  />
                </el-tab-pane>
                <el-tab-pane name="3" label="账号密码">
                  <el-input
                    style="width: 288px"
                    v-model="formUser.username"
                    placeholder="请输入用户名"
                  />
                  <el-input
                    class="code"
                    v-model="formUser.password"
                    placeholder="请输入密码"
                    type="password"
                    show-password
                  />
                  <p style="margin-bottom: -5px; float: right">
                    没有账号？<span
                      style="color: skyblue; font-size: 12px; cursor: pointer"
                      @click="toRegister"
                      >请注册</span
                    >
                  </p>
                </el-tab-pane>
              </el-tabs>

              <el-button class="nextBtn" @click="Login">下一步</el-button>
              <div
                class="agreement"
                :class="activeKey == String(3) ? 'agreement1' : ''"
              >
                <el-checkbox v-model:checked="checked"
                  >我已阅读并同意 <a href=""> 服务协议 </a> 和
                  <a href=""> 隐私政策 </a>
                </el-checkbox>
              </div>
              <div class="foot">
                <div class="line"></div>
                <div class="text">更多</div>
                <div class="line"></div>
              </div>
              <el-button class="footBtn">sso登录</el-button>
            </div>
          </div>
          <div v-else style="height: 100%">
            <div class="main">
              <img
                class="imgPath"
                src="../../assets/images/pc.png"
                alt=""
                @click="changeBox"
              />
              <img
                class="imgQrCode"
                src="../../assets/images/laijiaw.png"
                alt=""
              />
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
    height: 70%;
    margin-top: 40px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 1000px;
    z-index: 1;

    .centerBox {
      height: 100%;
      // box-shadow: 0px 20px 80px 0px rgb(0 0 0 / 30%);
      display: flex;

      .leftBox {
        width: 50%;
        background-image: url('../../assets/images/tujiu.jpeg');
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

          .el-input {
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

          .el-tabs {
            margin-bottom: 15px;

            .el-input {
              width: 175px;
              margin-right: 10px;
            }

            .code {
              width: 288px;
              margin-top: 20px;
            }

            .el-btn {
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
          .agreement1 {
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
