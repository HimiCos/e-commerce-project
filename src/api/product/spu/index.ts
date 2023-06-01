// SPU管理模块的接口
import request from '@/utils/request'
// 引入数据类型
import type {
  HasSpuResponseData,
  AllTrademarkResponseData,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
  SkuData,
} from '@/api/product/spu/type'
enum API {
  // 获取SPU列表
  HASSPU_URL = '/admin/product/',
  // 获取全部品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU下的全部图片列表
  IMAGES_URL = '/admin/product/spuImageList/',
  // 获取某个SPU下的全部销售属性列表
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性（颜色，版本，尺码）
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 追加一个新的SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 更新已有的SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 追加一個新的SKU地址
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  // 查看某个已有的SPU下的全部SKU列表
  SKUINFO_URL = '/admin/product/findBySpuId/',
  // 删除某个已有的SPU
  DELETESPU_URL = '/admin/product/deleteSpu/',
}
// 获取某一个三级分类下已有的SPU列表
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
// 获取全部SPU品牌的数据
export const reqAllTrademark = () =>
  request.get<any, AllTrademarkResponseData>(API.ALLTRADEMARK_URL)
// 获取某个SPU下的全部图片列表
export const reqSpuImagesList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGES_URL + spuId)
// 获取某个SPU下的全部销售属性列表
export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
// 获取整个项目全部的销售属性（颜色，版本，尺码）
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
// 添加/更新已有的SPU
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}
// 添加一个新的SKU
export const reqAddSku = (data: SkuData) =>
  request.post<any, any>(API.ADDSKU_URL, data)
// 获取某个SPU下的全部SKU列表
export const reqSkuList = (spuId: number) =>
  request.get<any, any>(API.SKUINFO_URL + spuId)
// 删除某个已有的SPU
export const reqDeleteSpu = (spuId: number) =>
  request.delete<any, any>(API.DELETESPU_URL + spuId)
