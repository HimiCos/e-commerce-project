// 登陸接口需要攜帶參數ts類型
export interface loginForm {
  username: string;
  password: string;
}
// 登陸接口返回數據類型
interface dataType{
  token?: string;
  message?: string;
}
export interface loginResponseData {
  code: number;
  data: dataType
}
// 定義服務器返回用戶信息相關的數據類型
interface userInfo{
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}
interface user {
  checkUser: userInfo
}
export interface userResponseData {
  code: number;
  data: user
}