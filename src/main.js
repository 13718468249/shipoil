// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/vuex'
import { http } from '@/api/http'
import ElementUI from 'element-ui'
import '@/style/element-oil.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.directive('title', {
  inserted (el, binding) {
    document.title = binding.value
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
