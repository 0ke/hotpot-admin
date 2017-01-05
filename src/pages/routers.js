import dashboard from './dashboard/dashboard'

import basicForm from './forms/basic-form'
import validationForm from './forms/form-validation.vue'
import advancedElements from './forms/advanced-elements.vue'

import basicTables from './tables/basic-table'
import pageTables from './tables/page-table'

// echarts
import barExample from './charts/bar-example.vue'
import pieExample from './charts/pie-example.vue'
import radarExample from './charts/radar-example.vue'
import chinaMapExample from './charts/china-map-example.vue'

export default [
  {
    name: 'dashboard',
    path: '/',
    component: dashboard
  },
  {
    name: 'forms.basicForms',
    path: '/forms/basic-form',
    component: basicForm
  },
  {
    name: 'forms.validation',
    path: '/forms/validation',
    component: validationForm
  },
  {
    name: 'forms.advancedElements',
    path: '/forms/advanced-elements',
    component: advancedElements
  },
  {
    name: 'tables.basicTables',
    path: '/tables/basic-table',
    component: basicTables,
  },
  {
    name: 'tables.pageTables',
    path: '/tables/page-table',
    component: pageTables
  },
  {
    name: 'echarts.bar',
    path: '/echarts/bar',
    component: barExample
  },
  {
    name: 'echarts.pie',
    path: '/echarts/pie',
    component: pieExample
  },
  {
    name: 'echarts.radar',
    path: '/echarts/radar',
    component: radarExample
  },
  {
    name: 'echarts.chinaMap',
    path: '/echarts/china-map',
    component: chinaMapExample
  }
]
