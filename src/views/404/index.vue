<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" />
    <h3>你访问的页面不存在!</h3>
    <p>管理员禁止当前用户访问此页面</p>
    <span>请检查你的路径是否正确, 或点击下方按钮回到首页</span>
    <el-button type="primary" round @click="goHome">返回到首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.box {
  img {
    position: absolute;
    top: 13%;
    left: 15%;
    width: 600px;
    height: 300px;
  }
  h3 {
    position: absolute;
    top: 20%;
    left: 50%;
    font-size: 30px;
    font-weight: 700;
    color: #1a90f1;
    margin: 20px 0;
  }
  p {
    position: absolute;
    top: 28%;
    left: 50%;
    font-size: 20px;
    font-weight: 450;
    color: #000000;
    margin: 20px 0;
  }
  span {
    position: absolute;
    top: 32%;
    left: 50%;
    font-size: 15px;
    color: #8d8c8c;
    margin: 20px 0;
  }
  button {
    position: absolute;
    top: 43%;
    left: 50%;
  }
}
</style>
