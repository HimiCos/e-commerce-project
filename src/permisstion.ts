// 路由鉴权-鉴权：项目当中路由能不能被访问的权限的设置（某一个路由什么条件下可以访问，什么情况下不能被访问）
import router from '@/router'
// 引入setting文件
import setting from '@/setting'
// 引入nprogress
// @ts-expect-error
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入大仓库
import pinia from '@/store'
// 引入user小仓库
import useUserStore from '@/store/modules/user'

// 获取user小仓库
const userStore = useUserStore(pinia)
// 配置nprogress：取消右上角的旋转图标
nprogress.configure({ showSpinner: false })

// 全局前置守卫
router.beforeEach(async (to: any, _, next: any) => {
  document.title = setting.title.slice(0, 4) + '-' + to.meta.title
  //to:你将要访问那个路由
  //from:你从哪个路由而来
  //next:路由的放行函数
  nprogress.start()
  // 获取token，判断用户是否登陆
  const token = userStore.token
  // 获取用户名字
  const username = userStore.username
  if (token) {
    // 如果有token，证明用户登陆了
    // 如果用户访问的是登陆页，直接跳转到首页
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果用户访问的不是登陆页，直接放行
      // 有用户信息，直接放行
      if (username) {
        next()
      } else {
        // 如果没有用户信息，获取用户信息
        try {
          await userStore.userInfo()
          next({ ...to })
        } catch (error) {
          // 如果获取用户信息失败，退出登录并跳转到登陆页
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 如果没有token，证明用户没有登陆
    // 如果用户访问的是登陆页，直接放行
    if (to.path === '/login') {
      next()
    } else {
      // 如果用户访问的不是登陆页，跳转到登陆页
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫
router.afterEach(() => {
  // ...
  nprogress.done()
})

// 第一个问题：任意路由切换实现进度条效果
// 第二个问题：路由鉴权（路由组件访问权限的设置）
// 全部路由组件：登陆｜404｜人意路由｜首页｜数据大屏｜权限管理（三个子路由）｜商品管理（四个子路由）

// 用户未登录 ：可以访问login 其余的路由都不可以访问[指向login]
// 用户登陆：不可以访问login[指向首页] 可以访问其余的路由
