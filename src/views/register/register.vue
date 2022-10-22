<script lang='ts'>
import { defineComponent, ref, reactive, watch } from 'vue';
import { useRouter } from "vue-router";
import { handleRegister } from "@/request/index";
import { message } from 'ant-design-vue';
export default defineComponent({
    setup() {
        const router = useRouter();
        const formData = reactive({
            userName: '',
            password: '',
            phone: '1234'
        })

        const register = async () => {
            const res = await handleRegister(formData)
            if (res.code == 200) {
                message.success(res.msg);
                router.push('/login')
            } else {
                message.error(res.msg);
            }
        }
        return {
            router,
            formData,
            register
        };
    },
});
</script>
<template>
    <div class="register">
        <div class="registerBox">
            <div class="centerBox">
                <div class="leftBox">
                    <div class="introduce">项目成立于2022年</div>
                </div>
                <div class="rightBox">
                    <div style="height: 100%">
                        <div class="main">
                            <h3>欢迎注册</h3>
                            <a-input v-model:value="formData.userName" placeholder="请输入用户名" />
                            <a-input v-model:value="formData.password" placeholder="请输入密码" />
                            <a-button @click="register" class="nextBtn" type="primary">立即注册</a-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottomBox"></div>
        </div>
    </div>
</template>
<style scoped lang="less">
.register {
    min-width: 1040px;
    min-height: 99.9vh;
    position: relative;

    .registerBox {
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
                        margin-bottom: 20px;
                    }

                    .nextBtn {
                        width: 100%;
                        border-radius: 5px;
                        background-color: #3270ff;
                        color: #fff;
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }
}
</style>