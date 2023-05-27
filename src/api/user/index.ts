// 統一管理用戶相關的接口
import request from '@/utils/request'
import type { loginForm, loginResponseData, userResponseData } from './type'
// 統一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USER_INFO_URL = '/user/info',
}
// 暴露請求函數
// 登錄接口方法 {username:string,password:string}
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 獲取用戶信息接口方法
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USER_INFO_URL)
