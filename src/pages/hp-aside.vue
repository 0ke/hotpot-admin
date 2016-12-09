<template>
  <aside class="al-sidebar">
    <ul class="al-sidebar-list">
      <li v-for="m in menus" class="al-sidebar-list-item"
          :class="{'ba-sidebar-item-expanded': m.collapsed}">
        <a class="al-sidebar-list-link" @click="toggleMenu(m)">
          <i v-if="m.icon" :class="m.icon"></i>
          <span>{{m.title}}</span>
          <i class="al-sidebar-menu-angle fa" :class="{'fa-angle-up': m.collapsed, 'fa-angle-down': !m.collapsed}"
             v-if="m.subMenus"></i>
        </a>

        <ul v-if="m.subMenus" class="al-sidebar-sublist">
          <li v-for="sm in m.subMenus">
            <a class="al-sidebar-list-link">
              <i v-if="sm.icon" :class="sm.icon"></i>
              <span>{{sm.title}}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>
<script>
  export default {
    data() {
      var menus = [
        {
          title: '仪表盘NEW',
          icon: 'fa fa-dashboard'
        },
        {
          title: '组件',
          icon: 'fa fa-gear',
          collapsed: false,
          subMenus: [
            {
              title: 'Mail'
            },
            {
              title: 'Timeline'
            },
            {
              title: 'Tree View'
            }
          ]
        },
        {
          title: '图表',
          icon: 'fa fa-bar-chart',
          collapsed: false,
          subMenus: [
            {
              title: 'Mail'
            },
            {
              title: 'Timeline'
            },
            {
              title: 'Tree View'
            }
          ]
        }
      ]

      return {
        menus: menus
      }
    },
    methods: {
      toggleMenu(m) {
        if (!m.subMenus) {
          return
        }
        m.collapsed = !m.collapsed
      }
    }
  }
</script>
