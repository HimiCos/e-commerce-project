// 創建 商品分类全局组件 的小倉庫
import { defineStore } from 'pinia'
// 引入请求商品分类的接口
import { reqC1, reqC2, reqC3, reqAttr } from '@/api/product/attr/index'
// 引入商品分类的接口返回的类型
import type {
  CategoryResponse,
  AttrResponseData,
} from '@/api/product/attr/type'
// 引入state類型
import type { CategoryState } from '@/store/modules/types/type'
import { Get_localStorage } from '@/utils/localStorage'

// 創建用戶小倉庫
let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      // 存储一级分类的数据
      c1Arr: [],
      // 存储选择的一级分类的id
      c1Id: '',
      // 存储二级分类的数据
      c2Arr: [],
      // 存储选择的二级分类的id
      c2Id: '',
      // 存储三级分类的数据
      c3Arr: [],
      // 存储选择的三级分类的id
      c3Id: '',
      // 存储属性的数据
      attrArr: [],
      // 存储当前页码数
      limit: parseInt(Get_localStorage('Limit') as string) || 3,
    }
  },
  actions: {
    //获取一级分类的数据
    async getC1Arr() {
      let result: CategoryResponse = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
    // 获取二级分类的数据
    async getC2Arr() {
      if (this.c1Id) {
        let result: CategoryResponse = await reqC2(this.c1Id)
        if (result.code === 200) {
          this.c2Arr = result.data
          // 清空二级/三级分类的id
          this.c2Id = ''
          this.c3Arr = []
          this.c3Id = ''
          // 清空属性的数据
          this.attrArr = []
        }
      }
    },
    // 获取三级分类的数据
    async getC3Arr() {
      if (this.c2Id) {
        let result: CategoryResponse = await reqC3(this.c2Id)
        if (result.code === 200) {
          this.c3Arr = result.data
          // 清空三级分类的id
          this.c3Id = ''
          // 清空属性的数据
          this.attrArr = []
        }
      }
    },
    // 获取属性的内容
    async getAttrArr() {
      if (this.c3Id) {
        // 发请求
        let result: AttrResponseData = await reqAttr(
          this.c1Id,
          this.c2Id,
          this.c3Id,
        )
        if (result.code === 200) {
          this.attrArr = result.data
        }
      }
    },
  },
  getters: {},
})

export default useCategoryStore
