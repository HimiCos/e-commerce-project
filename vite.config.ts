import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 引入mock插件提供的方法 viteMockServe
import {viteMockServe} from 'vite-plugin-mock'
export default defineConfig(({ command })=>{
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve', // 保證開發階段可以使用mock接口
      })
    ],
    resolve: {
      alias: {
          "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    // scss全局變量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    }
  }
})
