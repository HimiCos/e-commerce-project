<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }" v-if="isNotDestroy">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
// 引入layout配置小仓库
import useLayOutSettingStore from '@/store/modules/setting';
// 获取小仓库
let LayOutSettingStore = useLayOutSettingStore();

// 控制当前组件是否销毁
let isNotDestroy = ref(true)

watch(() => LayOutSettingStore.refresh, () => {
  isNotDestroy.value = false
  setTimeout(() => {
    nextTick(() => {
      isNotDestroy.value = true
    })
  }, 100)
});
</script>

<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped lang="scss">
.fade-enter-from{
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active{
  transition: all .3s;
}
.fade-enter-to{
  opacity: 1;
  transform: scale(1);
}
</style>