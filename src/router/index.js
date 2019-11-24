import Vue from 'vue'
import Router from 'vue-router'
import Alum3D from '@/components/Alum/Alum3D'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:key',
      name: 'Alum3D',
      component: Alum3D
    }
  ]
})
