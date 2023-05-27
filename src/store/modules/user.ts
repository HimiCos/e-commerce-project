// 創建用戶相關的小倉庫
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user'
// 引入數據類型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from '@/store/modules/types/type'
// 引入操作本地存儲的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 創建用戶小倉庫
let useUserStore = defineStore('User', {
  // 小倉庫存儲數據的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用戶登陸成功之後的token
    }
  },
  // 異步｜邏輯的地方
  actions: {
    // 用戶登陸的方法
    async userLogin(data: loginForm) {
      // 登陸請求
      let result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        // pinia倉庫存儲一下token
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        // 保證當前async函數返回一個成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
// 導出用戶小倉庫
export default useUserStore
