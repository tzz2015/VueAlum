import Vue from 'vue'
import Router from 'vue-router'
import Alum3D from '@/components/Alum/Alum3D'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Alum3D',
      component: Alum3D
    },
    {
      path: '/Alum3D',
      name: 'Alum3D',
      component: Alum3D
    },
    {
      path: '*',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
