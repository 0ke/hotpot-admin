import dashboard from './dashboard/dashboard'

export default [
  {
    path: '/',
    component: dashboard,
    meta: {
      title: 'Dashboard',
      icon: 'fa fa-dashboard'
    }
  },
  {
    path: '/tables',
    meta: {
      title: 'Tables',
      icon: 'fa fa-table',
      abstract: true
    },
    children: [
      {
        path: '/bootstrap-table',
        meta: {
          title: 'Bootstrap Table'
        }
      }
    ]
  }
]
