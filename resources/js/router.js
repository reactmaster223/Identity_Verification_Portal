import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthService from './services/auth'
import LocalStorage from './services/ls'

// Dashboard
import Basic from './views/admin/dashboard/Basic.vue'

// Layouts
import LayoutBasic from './views/layouts/LayoutBasic.vue'
import LayoutLogin from './views/layouts/LayoutLogin.vue'

// Users
import Users from './views/admin/users/Users.vue'
import Profile from './views/admin/users/Profile.vue'
import Verification from './views/admin/users/Verification.vue'
import HealthStatus from './views/admin/users/HealthStatus.vue'

// Setting
import NewUser from './views/admin/users/NewUser.vue'
import NewAdminUser from './views/admin/users/NewAdminUser.vue'
import RegionManagement from './views/admin/users/RegionManagement.vue'

// Region Management
import RegionComponent from './views/admin/users/RegionComponent.vue'

// Regional_Admin Detail
import RegionAdminDetail from './views/admin/regionInfo/RegionAdminDetail.vue'
import Practitioners from './views/admin/users/Practitioners.vue';

// Auth
import Login from './views/auth/Login.vue'

import NotFoundPage from './views/errors/404.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: LayoutLogin,
    redirect: "login",
    children: [
      {
        path: 'login',
        component: Login,
        name: 'login'
      },
    ]
  },

  {
    path: '/admin',
    component: LayoutBasic, // Change the desired Layout here
    meta: { requiresAuth: true },
    children: [
      // Dashboard
      {
        path: 'dashboard/basic',
        component: Basic,
        name: 'dashboard'
      },

      // Users
      {
        path: 'users/all',
        component: Users
      },
      {
        path: 'users/profile/:id',
        component: Profile
      },
      {
        path: 'users/verification',
        component: Verification
      },

      {
        path: 'users/health_status',
        component: HealthStatus
      },

      // New User
      {
        path: 'new_user',
        component: NewUser
      },

      // New Admin User
      {
        path: 'new_admin_user',
        component: NewAdminUser
      },

      // Region Management
      {
        path: 'region_management',
        component: RegionManagement
      },

      {
        path: 'regions/:id',
        component: RegionComponent
      },

      // Region Detail Page
      {
        path: "region/detail/:regionName",
        component: RegionAdminDetail
      },

      {
        path: "region/practitioners",
        component: Practitioners
      }
    ]
  },

  //  DEFAULT ROUTE
  { path: '*', component: NotFoundPage }
]

const router = new VueRouter({
  routes,
  base: "/",
  mode: 'history',
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  //  If the next route is requires user to be Logged IN
  if (to.matched.some(m => m.meta.requiresAuth)) {
    return AuthService.check().then(authenticated => {
      if (!authenticated) {
        let user_id = LocalStorage.get("user_id");
        AuthService.setOffline(user_id).then((res) => {
          if (res.data) {
            LocalStorage.remove('user_id')
            LocalStorage.remove('auth.token')
            LocalStorage.remove('Name')
            LocalStorage.remove('User Name')
            LocalStorage.remove('Role')
            LocalStorage.remove('Gender')
            LocalStorage.remove('user_avatar')
            LocalStorage.remove('Registered_User')
            LocalStorage.remove('Region Name')
            LocalStorage.remove("User Region ID")
            LocalStorage.remove("Company Name")
            LocalStorage.remove("Login Time")
            LocalStorage.remove("Login Date")
            LocalStorage.remove("username")
            LocalStorage.remove("email_verification_status")
            return next({ path: '/login' });
          }
        })

      }

      return next()
    })
  }

  return next()
})

export default router
