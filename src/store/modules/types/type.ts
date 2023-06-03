import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
import type { Attr } from '@/api/product/attr/type'
// 定義小倉庫數據state類型
export interface UserState {
  token: string | null
  menuRouters: RouteRecordRaw[]
  username: string | null
  avatar: string | null
  roles: string[]
}
// 定义分类仓库state类型
export interface CategoryState {
  // 存储一级分类的数据
  c1Arr: CategoryObj[]
  // 存储选择的一级分类的id
  c1Id: number | string
  // 存储二级分类的数据
  c2Arr: CategoryObj[]
  // 存储选择的二级分类的id
  c2Id: number | string
  // 存储三级分类的数据
  c3Arr: CategoryObj[]
  // 存储选择的三级分类的id
  c3Id: number | string
  // 存储属性的数据
  attrArr: Attr[]
  // 存储当前页码数
  limit: number
}
