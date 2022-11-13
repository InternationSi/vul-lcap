import { defineStore } from "pinia"
import { ref,reactive } from "vue"
import { handleLogin} from "@/request"
import {tokenService} from '@/utils/tokenService'
import {userService} from '@/utils/userService'
import {permissionService} from '@/utils/permissionService'
interface userInfoType {
  username: string,
  realname: string,
  avatar: string,
  authorities: any[],
  roles: string
}

export const useLoginStore = defineStore('login', () => {
  const token = ref<string>(tokenService.getTokenInfo())
  let userInfo = reactive<userInfoType>({
    username: "",
    realname: "",
    avatar: "",
    authorities: [],
    roles: ""
  
  })
  function login(params:any) {
   return  new Promise((resolve, reject) => {
    handleLogin(params)
      .then(data => {
          //session方式登录，其实不需要token，这里为了JWT登录预留，用username代替。
          //通过Token是否为空判断本地有没有登录过，方便后续处理。
          updateToken(data.principal.username);
          const newUserInfo = {
            username: data.principal.username,
            realname: data.principal.realname || data.principal.username,
            avatar: "",
            authorities: data.principal.authorities || [],
            roles: data.principal.roles || []
          };
          updateUserInfo(newUserInfo);
          const permissions:any[] = data.authorities || [];
          let isSuperAdmin = false;
          if (permissions.findIndex(t => t.authority === "ROLE_SUPER_ADMIN") >= 0) {
            isSuperAdmin = true;
          }
          permissionService.set({
            permissions: permissions,
            isSuperAdmin: isSuperAdmin
          });

          resolve(newUserInfo);
      })
      .catch(error => {
        reject(error);
      });
  });
  }

  function updateToken(tokenValue: string) {
    token.value = tokenValue
    tokenService.setTokenInfo(token.value)
  }
  function updateUserInfo(userInfoValue: userInfoType) {
    userInfo = userInfoValue
    userService.setUserInfo(userInfo)
  }

  return { login,userInfo }
})