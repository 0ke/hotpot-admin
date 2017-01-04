let menus = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    icon: 'fa fa-dashboard'
  },
  {
    title: 'Forms',
    icon: 'fa fa-edit',
    submenus: [
      {
        name: 'forms.basicForms',
        title: 'Basic Forms'
      },
      {
        name: 'forms.validation',
        title: 'Form Validation'
      },
      {
        name: 'forms.advancedElements',
        title: 'Advanced Elements'
      }
    ]
  },
  {
    title: 'Tables',
    icon: 'fa fa-table',
    submenus: [
      {
        name: 'tables.basicTables',
        title: 'Basic Tables'
      },
      {
        name: 'tables.pageTables',
        title: 'Page Tables'
      }
    ]
  },
  {
    title: 'Charts',
    icon: 'fa fa-bar-chart',
    submenus: [
      {
        name: 'charts.echarts',
        title: 'ECharts'
      }
    ]
  },
  {
    title: 'Multi-Level Menu',
    icon: 'fa fa-sitemap',
    submenus: [
      {
        title: 'Second Level Item 1'
      },
      {
        title: 'Second Level Item 2'
      },
      {
        title: 'Second Level Item 3',
        submenus: [
          {
            title: 'Third Level Item 1'
          },
          {
            title: 'Third Level Item 2'
          },
          {
            title: 'Third Level Item 3'
          }
        ]
      }
    ]
  }
]

export {
  menus
}
