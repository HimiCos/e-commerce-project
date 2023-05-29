<template>
  <el-row>
    <el-button icon="Refresh" circle @click="updateRefresh" />
    <el-button icon="FullScreen" circle @click="fullScreen" />
    <el-button icon="Setting" circle />
    <img :src="userStore.avatar" alt="" />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-row>
</template>

<script setup lang="ts">
// 引入路由
import { useRouter, useRoute } from 'vue-router'
// 引入layout配置小仓库
import useLayOutSettingStore from '@/store/modules/setting'
// 引入user小仓库
import useUserStore from '@/store/modules/user'
// @ts-ignore
import { ElNotification } from 'element-plus'
// 获取路由对象
let $router = useRouter()
// 获取路由信息对象
let $route = useRoute()
// 获取小仓库
let LayOutSettingStore = useLayOutSettingStore()
// 获取user小仓库
let userStore = useUserStore()

// 刷新按钮点击的回调
const updateRefresh = () => {
  LayOutSettingStore.refresh = !LayOutSettingStore.refresh
}
// 全屏按钮点击的回调
const fullScreen = () => {
  // Dom对象的一个属性：可以用来判断当前是否全屏
  let isFullScreen = document.fullscreenElement
  if (!isFullScreen) {
    // 如果不是全屏，就全屏
    document.documentElement.requestFullscreen()
  } else {
    // 如果是全屏，就退出全屏
    document.exitFullscreen()
  }
}
// 退出登陆点击的回调
const logout = async () => {
  // 调用user小仓库的退出登陆方法
  await userStore.userLogout()
  // 成功提示
  ElNotification({
    type: 'success',
    message: '退出登陆成功',
  })
  // 跳转到登陆页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped lang="scss">
img {
  margin-left: 12px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 50%;
  height: 31px;
  width: 31px;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  .el-icon {
    margin-left: 2px;
    margin-right: 10px;
  }
}
</style>
