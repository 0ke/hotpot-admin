import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import ECharts from 'vue-echarts/dist/vue-echarts'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, Axios)
Vue.component('chart', ECharts)

import routes from './pages/routers'
import app from './pages/layout'

const router = new VueRouter({
  mode: 'history',
  base: '/c',
  routes: routes
})

console.log(router)

new Vue({
  router, el: '#app', template: '<app/>', components: {app}
})
