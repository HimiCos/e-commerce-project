// 书写属性管理模块接口
import request from '@/utils/request'
// 引入ts类型定义
import { CategoryResponse, AttrResponseData, Attr } from './type'
// 品牌管理模块接口地址
enum API {
  // 获取一级分类列表
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类列表
  C2_URL = '/admin/product/getCategory2/',
  // 获取三级分类列表
  C3_URL = '/admin/product/getCategory3/',
  // 获取属性列表
  ATTR_URL = '/admin/product/attrInfoList/',
  // 新增/修改属性的接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  // 删除属性的接口
  DELETE_ATTR_URL = '/admin/product/deleteAttr/',
}

// 获取一级分类列表
export const reqC1 = () => request.get<any, CategoryResponse>(API.C1_URL)
// 获取二级分类列表
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponse>(API.C2_URL + category1Id)
// 获取三级分类列表
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponse>(API.C3_URL + category2Id)
// 获取属性列表
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + category1Id + '/' + category2Id + '/' + category3Id,
  )

// 新增/修改属性的接口
export const reqAddOrUpdateAttr = (data: Attr) => {
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
}
// 删除属性的接口
export const reqDeleteAttr = (attrId: number | string) => {
  request.delete<any, any>(API.DELETE_ATTR_URL + attrId)
}
