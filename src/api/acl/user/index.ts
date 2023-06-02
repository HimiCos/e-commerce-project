// 这里写用户管理页面相关的接口
import request from '@/utils/request'
// 引入接口类型定义
import { UserResponseData, User } from '@/api/acl/user/type'

enum API {
  // 获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新的用户账号
  ADDUSER_URL = '/admin/acl/user/save',
  // 更新已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update',
}

// 获取全部已有用户账号信息
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )
//添加用户与更新已有用户的接口
export const reqAddOrUpdateUser = (data: User) => {
  //携带参数有ID更新
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
