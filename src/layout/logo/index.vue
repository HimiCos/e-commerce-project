<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 引入設置標題與logo的配置文件
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: rgb(221, 215, 215);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  p {
    font-size: $base-logo-title-fontSize;
  }
}
</style>
