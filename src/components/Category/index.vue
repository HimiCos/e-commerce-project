<template>
  <!-- 选择框的卡片 -->
  <el-card style="margin-bottom: 10px" shadow="hover">
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          placeholder="请选择"
          @change="categoryStore.getC2Arr"
          :disabled="scene == 1"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          placeholder="请选择"
          @change="categoryStore.getC3Arr"
          :disabled="scene == 1"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          placeholder="请选择"
          :disabled="scene == 1"
        >
          <el-option
            v-for="c2 in categoryStore.c3Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// 引入商品分类相关的小仓库
import useCategoryStore from '@/store/modules/category'

// 获取商品分类相关的小仓库
const categoryStore = useCategoryStore()

// 接受父组件传递过来的scene
defineProps(['scene'])

onMounted(() => {
  if (categoryStore.c1Arr.length == 0) {
    categoryStore.getC1Arr()
  }
})
</script>

<style scoped lang="scss"></style>
