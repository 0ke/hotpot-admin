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
  },
  {
    path: 'multi-level',
    meta: {
      title: 'Multi-Level Menu',
      icon: 'fa fa-sitemap',
      abstract: true
    },
    children: [
      {
        path: 'multi-level',
        meta: {
          title: 'Second Level Item 1',
          abstract: true
        }
      },
      {
        path: 'multi-level',
        meta: {
          title: 'Second Level Item 2',
          abstract: true
        }
      },
      {
        path: 'multi-level',
        meta: {
          title: 'Second Level Item 3',
          abstract: true
        },
        children: [
          {
            path: 'multi-level',
            meta: {
              title: 'Third Level Item 1',
              abstract: true
            }
          },
          {
            path: 'multi-level',
            meta: {
              title: 'Third Level Item 2',
              abstract: true
            }
          },
          {
            path: 'multi-level',
            meta: {
              title: 'Third Level Item 3',
              abstract: true
            }
          }
        ]
      }
    ]
  }
]
