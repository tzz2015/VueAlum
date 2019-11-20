import Vue from 'vue'
import Router from 'vue-router'
import Alum3D from '@/components/Alum/Alum3D'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Alum3D',
      component: Alum3D
    }
  ]
})
