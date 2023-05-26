// 引入項目中所有的全局組件
import SvgIcon from './SvgIcon/index.vue';
// 將所有全局組件組成一個對象
const allGlobalComponents = {SvgIcon};
// 對外暴露插件對象
export default {
  // 務必叫做install方法
  install(app){
    // 遍歷所有全局組件，逐個註冊
    Object.keys(allGlobalComponents).forEach(key => {
      app.component(key, allGlobalComponents[key]);
    });
  }
};