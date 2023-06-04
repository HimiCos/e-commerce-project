<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="sex">
      <div class="man">
        <p>男士</p>
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="women">
        <p>女士</p>
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
//获取图形图标的DOM节点
let charts = ref()
onMounted(() => {
  //初始化echarts实例
  let mycharts = echarts.init(charts.value)
  //设置配置项
  mycharts.setOption({
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 30,
        z: 100,
        itemStyle: {
          color: '#007afe',
          borderRadius: 20,
          borderColor: '#fff',
          borderWidth: 2,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 30,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: '#ff4b7a',
          borderRadius: 20,
          borderColor: '#fff',
          borderWidth: 2,
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box1 {
  width: 500px;
  height: 235px;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;

  .title {
    p {
      margin-top: 20px;
      color: white;
      font-size: 23px;
    }
  }

  .sex {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-right: 25px;

    .man {
      margin: 20px 40px;
      width: 111px;
      height: 115px;
      background: url(../../images/man-bg.png) no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        position: absolute;
        color: white;
        top: 510px;
      }
      img {
        margin-top: 15px;
      }
    }

    .women {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../images/woman-bg.png) no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        position: absolute;
        color: white;
        top: 510px;
      }
      img {
        margin-top: 15px;
      }
    }
  }

  .rate {
    display: flex;
    justify-content: space-around;
    color: white;
    margin-bottom: -20px;
  }

  .charts {
    height: 100px;
    width: 400px;
    margin-left: 50px;
  }
}
</style>
