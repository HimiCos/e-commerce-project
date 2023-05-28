import type { RouteRecordRaw } from 'vue-router'
// 定義小倉庫數據state類型
export interface UserState {
  token: string | null
  menuRouters: RouteRecordRaw[]
  username: string | null
  avatar: string | null
}
