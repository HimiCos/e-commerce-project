import { createApp } from 'vue'
import App from '@/App.vue'
// 引入element-plus和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-plus國際化
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入element-plus的暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// svg插件需要配置代碼
import 'virtual:svg-icons-register'
// 引入自定義插件對象：註冊整個項目全局組件
import globalComponent from '@/components'
// 引入模板的全局樣式
import '@/styles/index.scss'
// 引入路由
import router from '@/router'
// 引入倉庫
import pinia from '@/store'
// 引入路由鉴权
import '@/permisstion'
//引入自定义指令文件
import { isHasButton } from '@/directive/has'

// 獲取應用實例
const app = createApp(App)
// 安裝element-plus插件，配置國際化
app.use(ElementPlus, {
  locale: zhCn,
})
// 安裝自定義插件
app.use(globalComponent)
// 安裝路由
app.use(router)
// 安裝倉庫
app.use(pinia)
// 安裝自定義指令
isHasButton(app)
// 將應用掛載到掛載點上
app.mount('#app')
