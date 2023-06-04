<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span style="color: orange; font-style: italic">99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- 将来放echarts展示图形图表的节点 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
// 引入ref
import { ref, onMounted } from 'vue'
// 引入echarts
import * as echarts from 'echarts'
// 引入水球图
import 'echarts-liquidfill'

// 储存当前人数
let people = ref('216908人')
// 获取节点
let charts = ref()

// 挂载时获取echarts类的实例
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  // 配置项
  mycharts.setOption({
    series: {
      type: 'liquidFill',
      data: [
        {
          value: 0.4,
          direction: 'left',
          itemStyle: {
            color: '#56e9e9',
          },
        },
        {
          value: 0.3,
          direction: 'left',
          itemStyle: {
            color: '#56e9e9',
          },
        },
      ],
      radius: '55%',
      label: {
        position: ['50%', '30%'],
        formatter: function () {
          return '预估量'
        },
        fontSize: 20,
        color: '#fff',
      },
      backgroundStyle: {
        borderWidth: 5,
        borderColor: '#56e9e9',
        color: 'rgba(0,0,0,0)',
        shadowColor: 'rgba(0, 0, 0, 0.4)',
      },
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  width: 500px;
  height: 235px;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .top {
    .title {
      margin-top: 10px;
      color: white;
      font-size: 23px;
    }
    .bg {
      width: 77px;
      height: 8px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      margin-top: -20px;
      margin-right: 15px;
    }
  }
  .number {
    margin: 0px 30px;
    margin-top: 30px;
    display: flex;
    span {
      flex: 1;
      height: 50px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      margin-right: 9px;
      line-height: 49px;
      font-size: 30px;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 280px;
    margin-top: -40px;
  }
}
</style>
