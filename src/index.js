import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueAxios, Axios)

import routes from './routers'
import app from './pages/layout'

const router = new VueRouter({
  mode: 'history',
  base: '/c',
  routes: routes
})

// 取消 Vue 所有的日志与警告
Vue.config.silent = true
Vue.config.errorHandler = (err, vm) => {
  console.error(err)
}

new Vue({
  router,
  el: '#app',
  template: '<app/>',
  components: {app},
  data: {
    contentTitle: 'DEFAULT',
    contentBreadcrumbs: []
  }
})
