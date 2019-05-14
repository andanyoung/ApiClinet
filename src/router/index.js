import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ApiRequest/:module/:controller/:action',
      name: 'ApiRequest',
      component: () => import('@/components/ApiRequest'),
      props: true
    }
    // {
    //   path: '/layout',
    //   name: 'ApiRequest',
    //   component: () => import('@/views/layout/Layout')
    // }
  ]
})
