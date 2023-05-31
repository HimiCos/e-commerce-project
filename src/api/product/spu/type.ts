// 服务器全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// SPU数据的ts类型
export interface SpuData {
  category3Id: number | string
  id?: number
  spuName: string
  tmId: number | string
  description: string
  spuImageList: null | SpuImg[]
  spuSaleAttrList: null | SaleAttr[]
}
// 数组：元素都是已有SPU数据类型
export type Records = SpuData[]
// 定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    total: number
    records: Records
  }
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}

// 品牌数据的ts类型
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
// 全部品牌数据的ts类型
export type AllTrademark = Trademark[]
// 定义获取全部品牌接口返回的数据ts类型
export interface AllTrademarkResponseData extends ResponseData {
  data: AllTrademark
}

// 图片数据的ts类型
export interface SpuImg {
  id?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: number
  name?: string
  url?: string
}
// 全部图片数据的ts类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

// 已有的销售属性值对象的ts类型
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}
// 存储已有的销售属性值对象的数组的ts类型
export type spuSaleAttrValueList = SaleAttrValue[]
// 已有的销售属性对象的ts类型
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}
// 存储已有的销售属性对象的ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 全部销售属性值对象的ts类型
export interface HasSaleAttr {
  id: number
  name: string
}
// 存储全部销售属性值对象的ts类型
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
