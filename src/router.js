import Vue from 'vue'
import Router from 'vue-router'
import Records from './views/Records.vue'
import Login from './views/Login.vue'
import Registry from './views/Registry.vue'

Vue.use(Router)

const isNotAuth = (to, from, next) => {
  if (!localStorage.getItem('user-token')) {
    next()
    return
  }
  next('/')
}

const isAuth = (to, from, next) => {
  if (localStorage.getItem('user-token')) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: isNotAuth
    },
    {
      path: '/registry',
      name: 'registry',
      component: Registry
    },
    {
      path: '/',
      name: 'records',
      component: Records,
      beforeEnter: isAuth
    },
    {
      path: '/record/:id',
      name: 'record',
      component: () => import('./views/DetailedRecord'),
      props: true,
      children: [
        {
          path: 'edit',
          name: 'Edit',
          component: () => import('./components/EditRecord.vue'),
          props: true
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
