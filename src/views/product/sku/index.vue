<template>
  <div>
    <el-card>
      <!-- 展示SKU的表格 -->
      <el-table border style="margin-bottom: 10px" :data="arrys">
        <el-table-column label="序号" width="80" type="index" align="center" />
        <el-table-column label="名称" width="100" align="center" />
        <el-table-column label="描述" width="200" align="center" />
        <el-table-column
          label="默认图片"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column label="重量(克)" width="100" align="center" />
        <el-table-column label="价格(元)" width="100" align="center" />
        <el-table-column label="操作" width="240" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="success" size="small" icon="ArrowUp"></el-button>
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="info" size="small" icon="PieChart"></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
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
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref } from 'vue'
// 引入分类相关的小仓库
import useCategoryStore from '@/store/modules/category'

// 定义一个测试的数组
let arrys = [0, 1, 2]
// 定义分页器的页码数
let pageNo = ref(1)
// 获取分类相关的小仓库
const categoryStore = useCategoryStore()
// 总页数
let total = ref(5)
</script>

<style scoped lang="scss"></style>
