<script lang="ts">
import { defineComponent,ref,reactive } from 'vue'
// import {useRouter} from 'vue-router'
interface FormState {
  username: string;
  nickname: string;
  checkNick: boolean;
}
export default defineComponent({
    setup() {
        const value = ref('')
           const formState = reactive<FormState>({
      username: '',
      nickname: '',
      checkNick: false,
    });
        return{
            value,
            formState
        }
        
    },
})
</script>
<template>
    <div class="block">
        <h3 class="title">编辑模块</h3>

        <div class="message">
            <span>模块信息</span>
            <a-form 
            class="flex"
            :model="formState"
            layout= 'vertical'
            >
               <a-form-item
                label="模块名称"
                name="username"
                
                :rules="[{ required: true, message: '请输入模块名称' }]"
                 >
                     <a-input v-model:value="formState.username" />
                </a-form-item>
                 <a-form-item
                label="模块名称"
                name="username"
                layout= vertical
                :rules="[{ required: true, message: '请输入模块名称' }]"
                 >
                     <a-input v-model:value="formState.username" />
                </a-form-item>
                  <a-form-item
                label="模块名称"
                name="username"
                layout= vertical
                :rules="[{ required: true, message: '请输入模块名称' }]"
                 >
                     <a-input v-model:value="formState.username" />
                </a-form-item>

            </a-form>
        </div>
    </div>
</template>

<style scoped>
.block{
   
    margin-top:10px;
    margin-left:10px;
   
}
.title{
     background:#ffff;
      margin-bottom:2px;
      padding-left:10px;
      padding-top:10px;
}
.message{
    margin-top:0;
    background:#ffff;
}
.flex{
    display:flex;
    justify-content: space-between;
}
.flex div{
    width:250px;
}
</style>
