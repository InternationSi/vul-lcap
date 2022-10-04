<script  lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const password = ref("");
    const user = ref("");
    const activeKey = ref("1");
    const phone = ref("");
    const checkedCode = ref("");
    const router = useRouter();
    const value = ref("");
    const checked = ref("");
    const clickAdd = () => {
      router.push({ path: "/home" });
    };

    let boxShow = ref(true);
    const changeBox = () => {
      boxShow.value = !boxShow.value;
    };
    return {
      activeKey,
      password,
      user,
      phone,
      value,
      checked,
      checkedCode,
      clickAdd,
      changeBox,
      router,
      boxShow,
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
                @click="changeBox"
                class="imgPath"
                src="../../asset/images/qrcode.png"
                alt=""
              />
              <div class="title">欢迎使用~~</div>
              <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="手机号"
                  ><a-input v-model:value="value" placeholder="请输入手机号"
                /></a-tab-pane>
                <a-tab-pane key="2" tab="邮箱">
                  <a-input v-model:value="value" placeholder="请输入邮箱"
                /></a-tab-pane>
              </a-tabs>
              <a-button class="nextBtn">下一步</a-button>
              <div>
                <a-checkbox v-model:checked="checked"
                  >我已阅读并同意 <a href=""> 服务协议 </a> 和
                  <a href=""> 隐私政策 </a></a-checkbox
                >
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
              <img
                @click="changeBox"
                class="imgPath"
                src="../../asset/images/pc.png"
                alt=""
              />
              <img
                class="imgQrCode"
                src="../../asset/images/laijiaw.png"
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

<style scoped lang='less'>
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
      box-shadow: 0px 20px 80px 0px rgb(0 0 0 / 30%);
      display: flex;
      .leftBox {
        width: 50%;
        background-image: url("../../asset/images/tujiu.jpeg");
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
          height: 80%;
          width: 70%;
          background-color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          border-radius: 10px;
          padding: 30px;
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
          .foot {
            display: flex; //生成浏览器兼容性代码
            width: 80%;
            margin: 30px auto 24px auto;
            position: absolute;
            bottom: 50px;
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
            bottom: 20px;
            border: 1px solid rgb(171, 171, 171);
            border-radius: 50px;
          }
        }
      }
    }
  }
}
</style>
