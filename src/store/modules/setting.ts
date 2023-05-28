// 創建 layout相关设置 的小倉庫
import { defineStore } from 'pinia'

// 創建用戶小倉庫
let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用于控制菜单的展开和收起
      refresh: false, //这个属性用于控制刷新效果
    }
  },
})

export default useLayOutSettingStore
