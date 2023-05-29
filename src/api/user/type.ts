// 定义用户相关数据的ts类型
// 用户登陆接口携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}
// 定义所有接口返回数据的ts类型
export interface responseData {
  code: number
  message: string
  ok: boolean
}

// 登陆接口返回数据的ts类型
export interface loginResponseData extends responseData {
  data: string
}

// 获取用户信息接口返回数据的ts类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
