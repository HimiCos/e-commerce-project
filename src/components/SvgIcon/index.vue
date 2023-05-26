<template>
  <div>
    <svg class="phone" :style="{width, height}">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
// 接受父組件傳遞過來的參數
defineProps({
  // xlink:href屬性值前綴
  prefix: {
    type: String,
    default: '#icon-'
  },
  // 圖標名稱
  name: {
    type: String,
    required: true
  },
  // 圖標顏色
  color:{
    type: String,
    default: '#fff'
  },
  // 圖標寬度
  width: {
    type: String,
    default: '16px'
  },
  // 圖標高度
  height: {
    type: String,
    default: '16px'
  },
})
</script>

<style scoped>

</style>