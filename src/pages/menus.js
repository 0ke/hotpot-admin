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
