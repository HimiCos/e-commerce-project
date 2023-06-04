<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Counter class="count"></Counter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, onMounted } from 'vue'
// 引入top组件
import Top from './components/top/index.vue'
// 引入游客组件
import Tourist from './components/tourist/index.vue'
// 引入性别组件
import Sex from './components/sex/index.vue'
// 引入年龄组件
import Age from './components/age/index.vue'
//引入中间两个子组件
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Counter from './components/couter/index.vue'

// 获取screen DOM元素
let screen = ref()

// 计算屏幕缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
// 屏幕发生变化时，重新计算缩放比例
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
// 挂载时，计算缩放比例
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
    left: 50%;
    top: 50%;
    .top {
      width: 100%;
      height: 42px;
    }
    .bottom {
      display: flex;
      .left {
        flex: 1;
        height: 1038px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 40px;
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
        .count {
          flex: 1;
          margin-top: -103px;
          margin-bottom: 62px;
        }
      }
    }
  }
}
</style>
