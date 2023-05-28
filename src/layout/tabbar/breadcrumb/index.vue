<template>
  <!-- 顶部左侧的静态 -->
  <el-icon @click="changIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧的面包屑 -->
  <el-breadcrumb separator="/" separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
      <template class="breadcrumb__inner">
        <!-- 图标 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 标题 -->
        <span>{{item.meta.title}}</span>
      </template>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
// 引入useRoute
import { useRoute } from 'vue-router';

// 获取layout配置相关的仓库
let LayOutSettingStore = useLayOutSettingStore();
// 获取路由对象
let $route = useRoute();

// 点击图标切换的方法
const changIcon = () => {
  // 图标取反
  LayOutSettingStore.fold = !LayOutSettingStore.fold;
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped lang="scss">
.el-icon{
  margin-right: 15px;
}
.breadcrumb__inner{
  display: flex;
  align-items: center;
  .el-icon{
    margin-right: 5px;
  }
}
</style>
