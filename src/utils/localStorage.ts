// 封裝本地存儲數據與讀取數據的方法

// 存儲數據
export const Set_localStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}
// 本地存儲獲取數據
export const Get_localStorage = (key: string) => {
  return localStorage.getItem(key)
}
// 本地存儲刪除數據
export const Del_localStorage = (key: string) => {
  return localStorage.removeItem(key)
}
