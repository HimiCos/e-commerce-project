// SKU模塊的接口
import request from '@/utils/request'
// 引入ts类型
import type { SkuResponseData, SkuInfoData } from '@/api/product/sku/type'

// 枚举地址
enum API {
  // 获取SKU列表
  SKU_URL = '/admin/product/list/',
  // 上架的接口
  ONSALE_URL = '/admin/product/onSale/',
  // 下架的接口
  CANCELSALE_URL = '/admin/product/cancelSale/',
  // 获取商品详情的接口
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  // 删除已有的SKU
  Delete_URL = '/admin/product/deleteSku/',
}

// 获取SKU列表的接口
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + page + '/' + limit)
// 上架的接口
export const reqOnSale = (skuId: number) =>
  request.get<any, any>(API.ONSALE_URL + skuId)
// 下架的接口
export const reqCancelSale = (skuId: number) =>
  request.get<any, any>(API.CANCELSALE_URL + skuId)
// 获取商品详情的接口
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
// 删除已有的SKU
export const reqDeleteSku = (skuId: number) =>
  request.delete<any, any>(API.Delete_URL + skuId)
