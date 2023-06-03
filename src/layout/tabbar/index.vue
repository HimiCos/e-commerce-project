<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <BreadCrumb />
    </div>
    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入面包屑组件
import BreadCrumb from '@/layout/tabbar/breadcrumb/index.vue'
// 引入设置组件
import Setting from '@/layout/tabbar/setting/index.vue'
// 接收父亲传过来的背景颜色
defineProps({ background: String, backgroundBorder: String })
</script>

<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  background: v-bind(background);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid v-bind(backgroundBorder);
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
