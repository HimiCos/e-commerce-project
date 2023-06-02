// 服务器全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Attr {
  attrId: number | string
  valueId: number | string
}
export interface saleAttr {
  saleAttrId: number | string
  saleAttrValueId: number | string
}
// SKU数据的ts类型
export interface SkuData {
  category3Id: number | string
  spuId: number | string
  tmId: number | string
  skuName: string
  price: number | string
  weight: number | string
  skuDesc: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleAttr[]
  skuDefaultImg: string
  isSale?: number
  id?: number
}
// 获取SKU接口返回的数据ts类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
//获取SKU商品详情接口的ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData
}
