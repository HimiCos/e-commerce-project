// 創建用戶相關的小倉庫
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入ts類型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import type { UserState } from '@/store/modules/types/type'
// 引入操作本地存儲的工具方法
import {
  Set_localStorage,
  Get_localStorage,
  Del_localStorage,
} from '@/utils/localStorage'
// 引入路由（常量）
import { constantRoute } from '@/router/routes'
// 創建用戶小倉庫
let useUserStore = defineStore('User', {
  // 小倉庫存儲數據的地方
  state: (): UserState => {
    return {
      token: Get_localStorage('TOKEN'), // 用戶登陸成功之後的token
      menuRouters: constantRoute, // 仓库存储生成菜单需要的数组（路由）
      username: '', // 用戶名
      avatar: '', // 用戶頭像
      roles: [], // 用戶的角色
    }
  },
  // 異步｜邏輯的地方
  actions: {
    // 用戶登陸的方法
    async userLogin(data: loginFormData) {
      // 登陸請求
      let result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        // pinia倉庫存儲一下token
        this.token = result.data as string
        Set_localStorage('TOKEN', result.data as string)
        // 保證當前async函數返回一個成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 獲取用戶信息的方法
    async userInfo() {
      // 請求用戶信息，存储到倉庫中
      let result: userInfoResponseData = await reqUserInfo()
      // 如果获取用户信息成功，存储到仓库中
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.roles = result.data.roles
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登陸的方法
    async userLogout() {
      let result: any = await reqLogout()
      if (result.code === 200) {
        // 退出登陸成功
        // 清空倉庫中的數據
        this.token = ''
        this.username = ''
        this.avatar = ''
        // 清空本地存儲中的token數據
        Del_localStorage('TOKEN')
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
// 導出用戶小倉庫
export default useUserStore
