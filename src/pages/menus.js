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
    title: 'ECharts',
    icon: 'fa fa-bar-chart',
    submenus: [
      {
        name: 'echarts.bar',
        title: 'Bar Charts'
      },
      {
        name: 'echarts.pie',
        title: 'Pie Charts'
      },
      {
        name: 'echarts.radar',
        title: 'Radar Charts'
      },
      {
        name: 'echarts.chinaMap',
        title: 'China Map Charts'
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
