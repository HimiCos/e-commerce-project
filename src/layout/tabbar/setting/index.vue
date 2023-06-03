<template>
  <el-row>
    <!-- 刷新按钮 -->
    <el-button
      icon="Refresh"
      circle
      @click="LayOutSettingStore.updateRefresh"
    />
    <!-- 全屏按钮 -->
    <el-button icon="FullScreen" circle @click="fullScreen" />
    <el-popover title="主题设置" :width="230" trigger="click">
      <!-- 表单元素 -->
      <el-form label-width="100">
        <el-form-item label="主题颜色" style="margin-top: 20px">
          <el-color-picker
            @change="setColor"
            v-model="color"
            size="small"
            show-alpha
            :predefine="predefineColors"
          />
        </el-form-item>
        <el-form-item label="暗黑模式" style="margin-top: -10px">
          <el-switch
            @change="changeDark"
            v-model="LayOutSettingStore.dark"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <!-- 设置按钮 -->
        <el-button icon="Setting" circle />
      </template>
    </el-popover>
    <!-- 用户头像 -->
    <img :src="userStore.avatar ? userStore.avatar : undefined" alt="" />
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
// 引入ref
import { ref, onBeforeMount } from 'vue'
// 引入路由
import { useRouter, useRoute } from 'vue-router'
// 引入layout配置小仓库
import useLayOutSettingStore from '@/store/modules/setting'
// 引入user小仓库
import useUserStore from '@/store/modules/user'
// @ts-ignore
import { ElNotification } from 'element-plus'
// 引入 Set_localStorage
import { Set_localStorage, Get_localStorage } from '@/utils/localStorage'
// 获取路由对象
let $router = useRouter()
// 获取路由信息对象
let $route = useRoute()
// 获取小仓库
let LayOutSettingStore = useLayOutSettingStore()
// 获取user小仓库
let userStore = useUserStore()

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
// 颜色组件的数据
const color = ref(
  Get_localStorage('Color') == 'null' ? '#409EFF' : Get_localStorage('Color'),
)
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// 主题颜色的设置
const setColor = () => {
  // 通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
  Set_localStorage('Color', color.value)
}
// switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
  Set_localStorage('isDark', LayOutSettingStore.dark)
  // 获取HTML根节点
  let html = document.documentElement
  // 判断HTML标签是否有类名dark
  LayOutSettingStore.dark ? (html.className = 'dark') : (html.className = '')
}
onBeforeMount(() => {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
})
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
