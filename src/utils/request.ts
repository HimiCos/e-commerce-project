// 進行 axios 二次封裝：使用請求攔截器與響應攔截器
import axios from 'axios'
// @ts-ignore
import { ElMessage } from 'element-plus'
// 引入user小仓库
import useUserStore from '@/store/modules/user'
// 第一步：利用axios對象的create方法 創建axios實例
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基本路徑
  timeout: 5000, // 超時時間
})
// 第二步：利用axios實例進行請求攔截器的設置
request.interceptors.request.use((config) => {
  // 获取user小仓库
  let userStore = useUserStore()
  if (userStore.token) {
    // 有token，给请求头设置token
    config.headers.token = userStore.token
  }
  // config配置對象，headers屬性請求頭，经常给服务器端携带公共参数
  // 返回配置對象
  return config
})
// 第三步：利用axios實例進行響應攔截器的設置
request.interceptors.response.use(
  (response) => {
    // 成功回調
    // 簡化數據
    return response.data
  },
  (error) => {
    // 失敗回調： 處理http網絡錯誤
    let message = ''
    let status = error.response.status
    switch (status) {
      case 400:
        message = '請求參數錯誤'
        break
      case 401:
        message = '用戶沒有權限'
        break
      case 403:
        message = '用戶得到授權，但是訪問是被禁止的'
        break
      case 404:
        message = '請求路徑錯誤'
        break
      default:
        message = '未知錯誤'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request
