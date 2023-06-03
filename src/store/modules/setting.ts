// 創建 layout相关设置 的小倉庫
import { defineStore } from 'pinia'
// 引入 Get_localStorage 方法
import { Get_localStorage } from '@/utils/localStorage'

// 創建用戶小倉庫
let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用于控制菜单的展开和收起
      refresh: false, //这个属性用于控制刷新效果
      dark: Get_localStorage('isDark') == 'true', //这个属性用于控制暗黑模式
    }
  },
  actions: {
    updateRefresh() {
      this.refresh = !this.refresh
    },
  },
})

export default useLayOutSettingStore
