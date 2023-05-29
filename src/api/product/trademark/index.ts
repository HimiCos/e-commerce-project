// 书写品牌管理模块接口
import request from '@/utils/request'
// 引入ts类型定义
import type { TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
// 品牌管理模块接口地址
enum API {
  // 获取品牌列表
  TRADEMARK_URL = '/admin/product/baseTrademark',
  // 新增品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌
  DELETE_URL = '/admin/product/baseTrademark/remove'
}
// 获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `/${page}/${limit}`)

// 新增/修改品牌的接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  // 判断是否有id，有则为修改，无则为新增
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

// 删除品牌的接口方法
export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETE_URL + `/${id}`)