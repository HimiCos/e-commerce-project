<template>
  <div>
    <el-card style="margin-top: 30px" shadow="hover">
      <div class="box">
        <img :src="userStore.avatar" alt="" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ getTime() }} {{ userStore.username }}</h3>
          <p class="subtitle">硅谷甄选运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="bottoms">
      <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入user小仓库
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

// 获取user小仓库
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-top: 18px;
    }
    .subtitle {
      font-style: italic;
      color: #ccc;
      margin-top: 18px;
    }
  }
}
.bottoms {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
