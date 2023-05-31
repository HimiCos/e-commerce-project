<template>
  <div>
    <!-- 三个分类 -->
    <Category :scene="scene" />
    <!-- 卡片 -->
    <el-card>
      <!-- 场景0 -->
      <div v-show="scene == 0">
        <!-- 添加按钮 -->
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <!-- 表格 -->
        <el-table border style="margin: 15px 0" :data="records">
          <el-table-column
            label="序号"
            width="100"
            align="center"
            type="index"
          />
          <el-table-column
            label="SPU名称"
            width="180"
            align="center"
            prop="spuName"
          />
          <el-table-column label="SPU描述" align="center" prop="description" />
          <el-table-column label="操作" align="center">
            <!-- 操作按钮 -->
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="changeScene2"
              ></el-button>
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                size="small"
                icon="PieChart"
                title="查看SKU列表"
              ></el-button>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                title="删除SPU"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="categoryStore.limit"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="getSpuList()"
        />
      </div>
      <!-- 场景1 spuForm -->
      <SpuForm ref="spu" v-show="scene == 1" @changeScene0="changeScene0" />
      <!-- 场景2 skuForm -->
      <SkuForm v-show="scene == 2" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, watch, onMounted } from 'vue'
// 引入商品分类相关的小仓库
import useCategoryStore from '@/store/modules/category'
// 引入网络请求的接口
import { reqHasSpu } from '@/api/product/spu'
// 引入ts类型
import type {
  HasSpuResponseData,
  Records,
  SpuData,
} from '@/api/product/spu/type'
// 引入spuForm组件
import SpuForm from './spuForm.vue'
// 引入skuForm组件
import SkuForm from './skuForm.vue'

// 定义一个响应式数据scene
const scene = ref<number>(0)
// 定义一个响应式数据pageNo
const pageNo = ref<number>(1)
// 获取商品分类相关的小仓库
const categoryStore = useCategoryStore()
// 定义一个响应式数据用来存储SPU列表
const records = ref<Records>([])
// 定义一个响应式数据用来存储SPU列表的总数
const total = ref<number>(0)
// 获取spuForm组件的实例
let spu = ref<any>()

// 监视c3Id的变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 获取SPU列表
    getSpuList()
  },
)
// 此方法执行，可以获取到某一个三级分类下的所有SPU
const getSpuList = async (pager = 1) => {
  if (categoryStore.c3Id) {
    // 获取三级分类下的所有SPU
    pageNo.value = pager
    let result: HasSpuResponseData = await reqHasSpu(
      pageNo.value,
      categoryStore.limit,
      categoryStore.c3Id,
    )
    if (result.code == 200) {
      // 将获取到的SPU列表存储到Records中
      records.value = result.data.records
      // 将获取到的SPU列表的总数存储到total中
      total.value = result.data.total
    }
  }
}
// 切换场景0的回调(子组件spuForm触发的自定义事件)
const changeScene0 = (obj: any) => {
  // 切换场景0
  scene.value = obj.flag
  if (obj.params == 'update') {
    // 获取SPU列表
    getSpuList(pageNo.value)
  } else {
    // 获取SPU列表
    getSpuList()
  }
}
// 切换场景1的回调
const changeScene1 = () => {
  // 切换场景1
  scene.value = 1
}
// 切换场景2的回调
const changeScene2 = () => {
  // 切换场景2
  scene.value = 2
}
// 挂载后
onMounted(() => {
  // 获取SPU列表
  getSpuList()
})
// 修改SPU的回调
const updateSpu = (row: SpuData) => {
  changeScene1()
  // 调取子组件方法获取完整的SPU数据
  spu.value.initHasSpuData(row)
}
// 添加SPU的回调
const addSpu = () => {
  changeScene1()
  // 调取子组件方法获取较为完整的SPU数据
  spu.value.initSpuData(categoryStore.c3Id)
}
</script>

<style scoped lang="scss"></style>
