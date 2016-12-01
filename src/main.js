import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'

Vue.use(VueRouter, Axios, VueAxios)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  template: '<App/>',
  components: {App}
})
