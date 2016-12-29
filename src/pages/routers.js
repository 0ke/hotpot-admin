import dashboard from './dashboard/dashboard'
import basicForm from './forms/basic-form.vue'

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
    path: '/forms',
    component: basicForm,
    meta: {
      title: 'Forms',
      icon: 'fa fa-edit',
      abstract: true
    },
    children: [
      {
        path: '/basic-form',
        component: basicForm,
        meta: {
          title: 'Basic Form'
        }
      }
    ]
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
        path: 'second-level1',
        meta: {
          title: 'Second Level Item 1',
          abstract: true
        }
      },
      {
        path: 'second-level2',
        meta: {
          title: 'Second Level Item 2',
          abstract: true
        }
      },
      {
        path: 'second-level3',
        meta: {
          title: 'Second Level Item 3',
          abstract: true
        },
        children: [
          {
            path: 'third-level1',
            meta: {
              title: 'Third Level Item 1',
              abstract: true
            }
          },
          {
            path: 'third-level2',
            meta: {
              title: 'Third Level Item 2',
              abstract: true
            }
          },
          {
            path: 'third-level3',
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
