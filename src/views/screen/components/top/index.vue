<template>
  <div class="top">
    <div class="left">
      <router-link to="/" class="lbtn">首页</router-link>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计</span>
      <span class="time">当前时间: {{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'

// 储存当前时间
let time = ref(moment().format('YYYY-MM-DD HH:mm:ss'))
// 定时器
let timer = ref(0)

onMounted(() => {
  // 开启定时器，每秒更新一次时间
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})

onBeforeUnmount(() => {
  // 组件卸载时，清除所有定时器
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    .lbtn {
      text-decoration: none;
      width: 135px;
      height: 42px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 42px;
      color: #29fcff;
      font-size: 20px;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 80px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 80px;
      color: #29fcff;
      font-size: 36px;
    }
  }
  .right {
    flex: 1.5;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn {
      width: 135px;
      height: 42px;
      float: left;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 42px;
      color: #29fcff;
      font-size: 20px;
    }
    .time {
      margin-right: 50px;
      color: #29fcff;
      font-size: 20px;
    }
  }
}
</style>
