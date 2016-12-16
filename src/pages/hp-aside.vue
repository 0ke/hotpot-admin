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
      return {
        menus: []
      }
    },
    beforeMount() {
      // 根据 routes 输出菜单
      var routes = this.$router.options.routes
      var menus = [];

      var recMenu = function (rs, ms) {
        rs.forEach(function (r) {
          var o = {
            title: r.meta.title,
            icon: r.meta.icon,
            collapsed: false
          }

          if (r.children) {
            o.subMenus = []
            recMenu(r.children, o.subMenus)
          }
          ms.push(o)
        })
      }
      recMenu(routes, menus)
      this.menus = menus
    },
    methods: {
      toggleMenu(m)
      {
        console.log(m)
        if (!m.subMenus) {
          return
        }
        m.collapsed = !m.collapsed
      }
    }
  }
</script>
