<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p v-if="!LayOutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 引入設置標題與logo的配置文件
import setting from '@/setting'
// 引入layout配置相关的小仓库
import useLayOutSettingStore from '@/store/modules/setting'

// 获取layout配置相关的仓库
let LayOutSettingStore = useLayOutSettingStore()
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
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
  padding-top: 20px;
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
