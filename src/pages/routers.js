import dashboard from './dashboard/dashboard'
import basicForm from './forms/basic-form'
import basicTables from './tables/basic-table'
import pageTables from './tables/page-table'

let onlyRouterView = {
  template: '<router-view></router-view>'
}

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
    name: 'tables.basicTables',
    path: '/tables/basic-table',
    component: basicTables,
  },
  {
    name: 'tables.pageTables',
    path: '/tables/page-table',
    component: pageTables
  }
]
