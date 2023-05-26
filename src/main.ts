import { createApp } from 'vue'
import App from '@/App.vue'
// 引入element-plus和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入element-plus國際化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 獲取應用實例
const app = createApp(App)
// 安裝element-plus插件，配置國際化
app.use(ElementPlus, {
  locale: zhCn,
})
// svg插件需要配置代碼
import 'virtual:svg-icons-register'
// 引入自定義插件對象：註冊整個項目全局組件
import globalComponent from '@/components'
app.use(globalComponent)
// 引入模板的全局樣式
import '@/styles/index.scss'

// 將應用掛載到掛載點上
app.mount('#app')
