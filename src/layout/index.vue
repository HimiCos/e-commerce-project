<template>
  <div class="layout_container">
    <!-- 左側菜單 -->
    <div class="layout_slider">
      <Logo />
      <!-- 展示菜單 -->
      <!-- 滾動組件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜單組件 -->
        <el-menu
          :collapse="LayOutSettingStore.fold"
          :default-active="$route.path"
          background-color="#001529"
          text-color="rgb(221, 215, 215)"
        >
          <Menu :menuList="userStore.menuRouters" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 頂部導航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Tabbar />
    </div>
    <!-- 主體內容 -->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入useRoute
import { useRoute } from 'vue-router'
// 引入左側菜單logo子組件
import Logo from '@/layout/logo/index.vue'
// 引入menu組件
import Menu from '@/layout/menu/index.vue'
// 引入右侧内容展示的main組件
import Main from '@/layout/main/index.vue'
// 引入右侧顶部导航的tabbar组件
import Tabbar from '@/layout/tabbar/index.vue'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
// 引入layout配置相关的小仓库
import useLayOutSettingStore from '@/store/modules/setting'

// 获取用户相关的小仓库
let userStore = useUserStore()
// 获取layout配置相关的仓库
let LayOutSettingStore = useLayOutSettingStore()
// 获取路由对象
let $route = useRoute()
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
        margin: 8px;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
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
    transition: all 0.3s;
    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
}
</style>
