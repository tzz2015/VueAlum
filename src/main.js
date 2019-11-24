// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './comonStyle.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import CommonUtils from './util/CommonUtils.js'
import RequestUtils from './RequestUtils'
Vue.use(Mint)
Vue.config.productionTip = false
Vue.prototype.$comUtils = CommonUtils
Vue.prototype.$vHOST = '/api/'
Vue.prototype.$requestUtils = RequestUtils
Vue.prototype.$Mint = Mint

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
