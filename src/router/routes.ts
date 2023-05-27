// 對外暴露配置路由(常量路由)
export const constantRoute = [
  {
    // 登陸
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  // 首頁
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  // 通配符
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
