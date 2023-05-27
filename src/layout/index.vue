<template>
  <div class="layout_container">
    <!-- 左側菜單 -->
    <div class="layout_slider">
      <Logo />
      <!-- 展示菜單 -->
      <!-- 滾動組件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜單組件 -->
        <el-menu background-color="#001529" text-color="white">
          <el-menu-item index="1">首頁</el-menu-item>
          <el-menu-item index="2">數據大屏</el-menu-item>
          <!-- 折疊的菜單 -->
          <el-sub-menu index="3">
            <template #title>權限管理</template>
            <el-menu-item index="3-1">用戶管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜單管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 頂部導航 -->
    <div class="layout_tabbar">456</div>
    <!-- 主體內容 -->
    <div class="layout_main">
      <p style="height: 1000px">hh</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入左側菜單logo子組件
import Logo from '@/layout/logo/index.vue'
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: pink;
    padding: 20px;
  }
  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: #8c6666;
    padding: 20px;
    overflow: auto;
  }
}
</style>
