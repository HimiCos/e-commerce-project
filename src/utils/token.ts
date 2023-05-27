// 封裝本地存儲數據與讀取數據的方法

// 存儲數據
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
// 本地存儲獲取數據
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
