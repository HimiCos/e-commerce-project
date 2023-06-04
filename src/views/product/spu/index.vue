<template>
  <div>
    <!-- 三个分类 -->
    <Category :scene="scene" />
    <!-- 卡片 -->
    <el-card shadow="hover">
      <!-- 场景0 -->
      <div v-show="scene == 0">
        <!-- 添加按钮 -->
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
          v-has="`btn.Spu.add`"
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
                @click="addSku(row)"
                v-has="`btn.Spu.addsku`"
              ></el-button>
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
                v-has="`btn.Spu.update`"
              ></el-button>
              <el-button
                type="info"
                size="small"
                icon="PieChart"
                title="查看SKU列表"
                @click="viewSku(row)"
                v-has="`btn.Spu.skus`"
              ></el-button>
              <el-popconfirm
                title="确定要删除当前的SPU吗? "
                width="230px"
                icon="Warning"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                    v-has="`btn.Spu.delete`"
                  ></el-button>
                </template>
              </el-popconfirm>
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
          @current-change="getSpuList(pageNo)"
          @size-change="changeSize"
        />
      </div>
      <!-- 场景1 spuForm -->
      <SpuForm ref="spu" v-show="scene == 1" @changeScene0="changeScene0" />
      <!-- 场景2 skuForm -->
      <SkuForm ref="sku" v-show="scene == 2" @changeScene0="changeScene0" />
      <!-- 点击查看SKU列表按钮显示的Dialog -->
      <el-dialog
        v-model="dialogVisible"
        title="SKU列表"
        width="50%"
        style="border-radius: 10px"
      >
        <el-table :data="skuParams" border>
          <el-table-column label="SKU名称" align="center" prop="skuName" />
          <el-table-column label="SKU价格" align="center" prop="price" />
          <el-table-column label="SKU重量" align="center" prop="weight" />
          <el-table-column label="SKU图片" align="center">
            <template #="{ row }">
              <el-image style="width: 100px" :src="row.skuDefaultImg" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, watch, onMounted } from 'vue'
// 引入商品分类相关的小仓库
import useCategoryStore from '@/store/modules/category'
// 引入网络请求的接口
import { reqHasSpu, reqSkuList, reqDeleteSpu } from '@/api/product/spu'
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
// 引入ElMessage
// @ts-ignore
import { ElMessage } from 'element-plus'
// 引入localStorage.ts
import { Set_localStorage } from '@/utils/localStorage'

// 场景0 1 2
const scene = ref<number>(0)
// 当前页码数pageNo
const pageNo = ref<number>(1)
// 获取商品分类相关的小仓库
const categoryStore = useCategoryStore()
// 定义一个响应式数据用来存储SPU列表
const records = ref<Records>([])
// 定义一个响应式数据用来存储SPU列表的总数
const total = ref<number>(0)
// 获取spuForm组件的实例
let spu = ref<any>()
// 获取skuForm组件的实例
let sku = ref<any>()
// SKU的列表
const skuParams = ref<any>([])
// 控制Dialog的显示和隐藏
const dialogVisible = ref<boolean>(false)

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
  }
  if (obj.params == 'add') {
    // 获取SPU列表
    getSpuList()
  } else {
    pageNo.value = pageNo.value
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
// 添加SKU的回调
const addSku = (row: SpuData) => {
  changeScene2()
  // 调取子组件方法获取完整的SPU数据
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
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
// 查看SKU列表的回调
const viewSku = async (row: any) => {
  // 发送网络请求获取SKU列表
  let result = await reqSkuList(row.id)
  if (result.code == 200) {
    // 将数据存储到skuParams中
    skuParams.value = result.data
    // 显示Dialog
    dialogVisible.value = true
  }
}
// 删除某个已有的SPU
const deleteSpu = async (row: any) => {
  // 发送网络请求删除SPU
  let result = await reqDeleteSpu(row.id)
  if (result.code == 200) {
    ElMessage.success('成功删除SPU')
    // 获取SPU列表
    getSpuList(pageNo.value)
  } else {
    ElMessage.error('删除SPU失败')
  }
}
// 当每页显示条数改变时触发
const changeSize = () => {
  Set_localStorage('Limit', categoryStore.limit)
  getSpuList()
}
</script>

<style scoped lang="scss"></style>
