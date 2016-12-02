import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueRouter, Axios, VueAxios)

import App from './pages/Dashboard'

new Vue({
  el: '#app',
  template: '<app/>',
  components: {App}
})
