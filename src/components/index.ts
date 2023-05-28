// 引入項目中所有的全局組件
import SvgIcon from './SvgIcon/index.vue'
// 將所有全局組件組成一個對象
const allGlobalComponents: any = { SvgIcon }
// 引入element-plus提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 對外暴露插件對象
export default {
  // 務必叫做install方法
  install(app: any) {
    // 遍歷所有全局組件，逐個註冊
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })
    // 遍歷所有element-plus圖標組件，逐個註冊全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
