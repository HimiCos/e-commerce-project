<template>
  <div>
    <el-card shadow="hover">
      <!-- 展示SKU的表格 -->
      <el-table border style="margin-bottom: 10px" :data="skuParams">
        <el-table-column label="序号" width="80" type="index" align="center" />
        <el-table-column
          label="名称"
          width="100"
          align="center"
          prop="skuName"
        />
        <el-table-column
          label="描述"
          width="200"
          align="center"
          prop="skuDesc"
        />
        <el-table-column label="默认图片" width="150" align="center">
          <template #="{ row }">
            <el-image
              style="width: 100px"
              :src="row.skuDefaultImg"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="重量(克)"
          width="100"
          align="center"
          prop="weight"
        />
        <el-table-column
          label="价格(元)"
          width="100"
          align="center"
          prop="price"
        />
        <el-table-column label="操作" width="240" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              :type="row.isSale == 0 ? 'success' : 'warning'"
              size="small"
              :icon="row.isSale == 0 ? 'ArrowUp' : 'ArrowDown'"
              @click="updateIsSale(row)"
              v-has="`btn.Sku.updown`"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="ElMessage.success('程序员正在研发中...')"
              v-has="`btn.Sku.update`"
            ></el-button>
            <el-button
              type="info"
              size="small"
              icon="PieChart"
              @click="showSkuInfo(row.id)"
              v-has="`btn.Sku.detail`"
            ></el-button>
            <el-popconfirm
              width="240px"
              icon="Warning"
              title="确定要删除当前的SKU吗? "
              @confirm="deleteSku(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  v-has="`btn.Sku.remove`"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格下的分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="categoryStore.limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @current-change="getHasSku(pageNo)"
        @size-change="changeSize"
      />
      <!-- 點擊詳情彈出的drawer -->
      <el-drawer v-model="drawer" title="商品详情" size="40%">
        <!-- 名称 -->
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <!-- 描述 -->
        <el-row style="margin-top: 15px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <!-- 价格 -->
        <el-row style="margin-top: 15px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <!-- 平台属性 -->
        <el-row style="margin-top: 15px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin-right: 5px; margin-bottom: 5px"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <!-- 销售属性 -->
        <el-row style="margin-top: 15px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin-right: 5px; margin-bottom: 5px"
              type="warning"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <!-- 商品图片 -->
        <el-row style="margin-top: 15px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel
              :interval="4000"
              type="card"
              height="200px"
              style="width: 100%"
              indicator-position="outside"
            >
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; border-radius: 10px"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, onMounted } from 'vue'
// 引入分类相关的小仓库
import useCategoryStore from '@/store/modules/category'
// 引入获取SKU列表的接口
import {
  reqSkuList,
  reqOnSale,
  reqCancelSale,
  reqSkuInfo,
  reqDeleteSku,
} from '@/api/product/sku'
// 引入ts类型
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from '@/api/product/sku/type'
// 引入提示组件
// @ts-ignore
import { ElMessage } from 'element-plus'
// 引入localStorage.ts
import { Set_localStorage } from '@/utils/localStorage'

// 存取SKU列表的数组
let skuParams = ref<SkuData[]>([])
// 定义分页器的页码数
let pageNo = ref(1)
// 获取分类相关的小仓库
const categoryStore = useCategoryStore()
// 总页数
let total = ref<number>(0)
// 是否显示drawer
let drawer = ref<boolean>(false)
// 存储已有的SPU销售属性and信息
let skuInfo = ref<any>({})

// 挂载时获取SKU列表
onMounted(() => {
  getHasSku()
})
// 获取SKU列表
const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  // 获取SKU列表
  let result: SkuResponseData = await reqSkuList(
    pageNo.value,
    categoryStore.limit,
  )
  if (result.code == 200) {
    // 将获取到的数据赋值给skuParams数组
    skuParams.value = result.data.records
    // 将总页数赋值给分页器
    total.value = result.data.total
  }
}
// 修改SKU的上下架状态
const updateIsSale = async (row: SkuData) => {
  // 判断当前SKU的上下架状态
  if (row.isSale == 0) {
    // 上架
    let result = await reqOnSale(row.id as number)
    if (result.code == 200) {
      // 提示上架成功
      ElMessage.success('上架成功')
      // 重新获取SKU列表
      getHasSku(pageNo.value)
    } else {
      ElMessage.error('上架失败')
    }
  } else {
    // 下架
    let result = await reqCancelSale(row.id as number)
    if (result.code == 200) {
      // 提示下架成功
      ElMessage.success('下架成功')
      // 重新获取SKU列表
      getHasSku(pageNo.value)
    } else {
      ElMessage.error('下架失败')
    }
  }
}
// 查看SKU详情
const showSkuInfo = async (skuId: number) => {
  //抽屉展示出来
  drawer.value = true
  //获取已有商品详情数据
  let result: SkuInfoData = await reqSkuInfo(skuId)
  //将已有的销售属性和信息存储起来
  skuInfo.value = result.data
}
// 删除SKU按钮的回调
const deleteSku = async (skuId: number) => {
  let result = await reqDeleteSku(skuId)
  if (result.code == 200) {
    // 提示删除成功
    ElMessage.success('删除成功')
    // 重新获取SKU列表
    getHasSku(pageNo.value)
  } else {
    ElMessage.error(result.data)
  }
}
// 当每页显示条数改变时触发
const changeSize = () => {
  Set_localStorage('Limit', categoryStore.limit)
  getHasSku()
}
</script>

<style scoped lang="scss">
.el-col-18 {
  line-height: 1.3em;
}
.el-tag.el-tag--light {
  position: relative;
  top: -5px;
}
</style>
