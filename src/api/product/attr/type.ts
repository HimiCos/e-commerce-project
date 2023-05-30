// 分类相关数据的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 分类ts类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
// 相应的分类接口返回数据的类型
export interface CategoryResponse extends ResponseData {
  data: CategoryObj[]
}

// 属性与属性值的ts类型

// 属性值对象的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
}
// 存储每一个属性值的数组的ts类型
export type AttrValueList = AttrValue[]

// 属性对象的ts类型
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}
// 存储每一个属性的数组的ts类型
export type AttrList = Attr[]
// 相应的属性接口返回数据的类型
export interface AttrResponseData extends ResponseData {
  data: AttrList
}
