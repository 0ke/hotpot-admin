import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, Axios)

// 组件
import echarts from 'components/echarts'
Vue.component('chart', echarts)

import routes from './pages/routers'
import app from './pages/layout'

const router = new VueRouter({
  mode: 'history',
  base: '/c',
  routes: routes
})

new Vue({
  router,
  el: '#app',
  template: '<app/>',
  components: {app}
})
