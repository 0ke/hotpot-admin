import dashboard from './pages/dashboard/dashboard'

import basicForm from './pages/forms/basic-form'
import validationForm from './pages/forms/form-validation.vue'
import advancedElements from './pages/forms/advanced-elements.vue'
import wysiwygEditor from './pages/forms/wysiwyg-editor.vue'

import basicTables from './pages/tables/basic-table'
import pageTables from './pages/tables/page-table'

// echarts
import barExample from './pages/charts/bar-example.vue'
import lineExample from './pages/charts/line-example.vue'
import pieExample from './pages/charts/pie-example.vue'
import radarExample from './pages/charts/radar-example.vue'
import chinaMapExample from './pages/charts/china-map-example.vue'

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
    name: 'forms.wysiwygEditor',
    path: '/forms/wysiwyg-editor',
    component: wysiwygEditor
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
    name: 'echarts.line',
    path: '/echarts/line',
    component: lineExample
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
