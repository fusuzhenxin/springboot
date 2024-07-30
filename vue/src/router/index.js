import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/front',
    name: 'Front',
    component: () => import('../views/front/Front'),
    children: [
      {
        path: 'password',
        name: 'Password',
        component: () => import('../views/front/Password.vue')
      },
      {
        path: 'person',
        name: 'Person',
        component: () => import('../views/front/Person.vue')
      },
    ]},
  //前端的路由权限验证
  {
    path: '/FontHome',
    name: 'FontHome',
    component: () => import('../font-views/FontHome'),
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem('user');
      if (!user) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/FontIncoming',
    name: 'FontIncoming',
    component: () => import('../font-views/FontIncoming'),
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem('user');
      if (!user) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/FontOutbound',
    name: 'FontOutbound',
    component: () => import('../font-views/FontOutbound'),
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem('user');
      if (!user) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/LogisticsInformation',
    name: 'LogisticsInformation',
    component: () => import('../font-views/LogisticsInformation'),
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem('user');
      if (!user) {
        next('/login');
      } else {
        next();
      }
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 重置路由
export const resetRouter = () => {
  router.matcher = new VueRouter({
    mode: 'history',
    routes
  })
}

// 注意：刷新页面会导致页面路由重置
export const setRoutes = () => {
  const storeMenus = localStorage.getItem("menus");
  if (storeMenus) {
    // 拼装动态路由
    const manageRoute = { path: '/', name: 'Manage', component: () => import('../views/Manage.vue'), redirect: "/FontHome", children: [
        { path: 'person', name: '个人信息', component: () => import('../views/Person.vue')},
        { path: 'password', name: '修改密码', component: () => import('../views/Password.vue')},
      ] }
    //获取Menus数据
    const menus = JSON.parse(storeMenus)
    //遍历menus
      menus.forEach(item => {
      if (item.path) {  // 当且仅当path不为空的时候才去设置路由
        let itemMenu = {
          path: item.path.replace("/", ""),
          name: item.name, component: () => import('../views/' + item.pagePath + '.vue')
        }
        manageRoute.children.push(itemMenu)

      } else if(item.children.length) {
        item.children.forEach(item => {
          if (item.path) {
            let itemMenu = {
              path: item.path.replace("/", ""),
              name: item.name, component: () => import('../views/' + item.pagePath + '.vue')
            }
            manageRoute.children.push(itemMenu)
          }
        })
      }
    })

    // 获取当前的路由对象名称数组
    const currentRouteNames = router.getRoutes().map(v => v.name)
    if (!currentRouteNames.includes('Manage')) {
      // 动态添加到现在的路由对象中去
      router.addRoute(manageRoute)
    }
  }
}

// 每次刷新页面都要重新设置路由，否则路由就会被重置
setRoutes()

router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称
  store.commit("setPath")

  //后台的路由权限认证
  if (!to.matched.length) {
    const menus = localStorage.getItem("menus")
    if (!menus) {
      next("/login")
    } else {
      next("/404")
    }
  } else {
    next()
  }
})

export default router
