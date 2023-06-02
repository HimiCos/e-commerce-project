<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登陸的表單 -->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              @click="login"
            >
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 引入element圖標
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
// 引入vue-router
import { useRouter, useRoute } from 'vue-router'
// @ts-ignore
import { ElNotification } from 'element-plus'
// 引入用戶相關的小倉庫
import useUserStore from '@/store/modules/user'
// 引入獲取當前時態的函數
import { getTime } from '@/utils/time'

let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()

// 獲取el-form組件
let loginForms = ref()

let loading = ref(false)
// 收集帳號與密碼的數據
const loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})

// 登陸按鈕回調
const login = async () => {
  try {
    // 保證全部的表單校驗通過
    await loginForms.value.validate()
  } catch {
    return false
  }
  // 登陸按鈕加載中
  loading.value = true
  try {
    // 保證登陸成功
    await userStore.userLogin(loginForm)
    // 編程式導航跳轉到首頁
    // 判断登陆时，是否有query参数，如果有，就跳转到query参数指定的页面，如果没有，就跳转到首页
    let redirect = $route.query.redirect as string
    $router.push({ path: redirect ? redirect : '/' })
    // 成功提示
    ElNotification({
      type: 'success',
      title: `Hi, ${getTime()}!`,
      message: '欢迎回来～',
    })
    // 登陸成功取消按鈕加載中
    loading.value = false
  } catch (error) {
    // 登陸失敗取消按鈕加載中
    loading.value = false
    // 失敗提示
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

// 自定義校驗規則
const validateUserName = (_: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度至少五位'))
  }
}
const validateUserPassword = (_: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码長度至少六位'))
  }
}
// 定義表單校驗需要的配置對象
const rules = {
  username: [
    // { required: true, min: 5, max: 10, message: '用戶名長度需在5-10字符之間', trigger: 'change' },
    { validator: validateUserName, trigger: 'change' },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密碼長度需在6-15字符之間', trigger: 'change' },
    { validator: validateUserPassword, trigger: 'change' },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  border-radius: 20px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
