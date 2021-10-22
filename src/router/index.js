import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import userDatas from './data.json'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/data',
    component: () => import('@/views/gaz/Log/jsonUrl'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/Enjamlar',
    component: Layout,
    name: 'enjam',
    redirect: '/enjam/birikdir',
    meta: {
      title: 'Log',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'birikdir',
        component: () => import('@/views/gaz/Log/EnjamBirikdir'),
        name: 'birikdir',
        meta: {
          title: 'Enjam birikdir',
          icon: 'dashboard'
        }
      },
      {
        path: 'enjamlaryn sanowy',
        component: () => import('@/views/gaz/Log/Index'),
        name: 'enjamlaryň sanowy',
        meta: {
          title: 'enjamlaryň sanowy',
          icon: 'dashboard'
        }
      },
      {
        path: 'actions',
        component: () => import('@/views/gaz/Log/Actions'),
        name: 'actions',
        meta: {
          title: 'Actions',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/Guyylar',
    component: Layout,
    name: 'enjam',
    redirect: '/Guyy/Sanow',
    meta: {
      title: 'Guýylar',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'taze guyy gos',
        component: () => import('@/views/gaz/Guyy/GuyyGosh'),
        name: 'Täze guýy goş',
        meta: {
          title: 'Täze guýy goş',
          icon: 'dashboard'
        }
      },
      {
        path: 'Guýylaryň sanowy',
        component: () => import('@/views/gaz/Guyy/GuyySanowy'),
        name: 'enjamlaryň sanowy',
        meta: {
          title: 'Guýylaryň sanowy',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/gazylan guyylar',
    component: Layout,
    name: 'Gazylan guýylar',
    redirect: '/gazylan guyylar',
    meta: {
      title: 'Gazylan guýylar',
      icon: 'dashboard'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/gaz/GazylanGuyy'),
        name: 'RolePermission',
        meta: {
          title: 'Gazylan guýylar'
        }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/dashboard', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
