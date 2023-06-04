<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入echarts
import * as echarts from 'echarts'
let charts = ref()
//组件挂载完毕初始化图形图标
onMounted(() => {
  let mychart = echarts.init(charts.value)
  //设置配置项
  let option = {
    //标题组件
    title: {
      text: '年龄比例',
      right: 185,
      textStyle: {
        //主标题颜色
        color: 'white',
      },
      top: 115,
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      right: 0,
      top: 60,
      orient: 'vertical', //图例组件方向的设置
      textStyle: {
        color: 'white',
        fontSize: 14,
      },
    },
    series: [
      {
        name: '年龄比例',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        data: [
          { value: 235, name: '5岁以下' },
          { value: 1048, name: '10岁以下' },
          { value: 439, name: '20岁以下' },
          { value: 580, name: '35岁以下' },
          { value: 300, name: '65岁以下' },
        ],
      },
    ],
  }
  mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box2 {
  width: 500px;
  height: 135px;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 95%;

  .title {
    margin-top: 13px;
    p {
      color: white;
      font-size: 23px;
    }
  }

  .charts {
    height: 260px;
    margin-right: 50px;
  }
}
</style>
