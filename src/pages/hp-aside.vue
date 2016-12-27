<template>
  <el-menu default-active="2" theme="dark" router="true">
    <template v-for="m, i in menus">
      <hp-aside-submenu v-if="m.submenus && m.submenus.length > 0" :title="m.title"
                        :index="m.path" :icon="m.icon"
                        :submenus="m.submenus"></hp-aside-submenu>
      <el-menu-item v-else :index="m.path"><i :class="m.icon"></i>{{m.title}}</el-menu-item>
    </template>
  </el-menu>
</template>
<script>
  import hpAsideSubmenu from './hp-aside-submenu.vue'
  export default {
    components: {hpAsideSubmenu},
    data() {
      return {
        menus: []
      }
    },
    beforeMount() {
      // 根据 routes 输出菜单
      var routes = this.$router.options.routes
      var menus = [];

      var recMenu = function (rs, ms, p) {
        rs.forEach(function (r) {
          var o = {
            title: r.meta.title,
            icon: r.meta.icon,
            path: r.path,
            abstract: r.meta.abstract,
            collapsed: false
          }

          if (r.children) {
            // FIXME 处理父节点路径
            o.submenus = []
            recMenu(r.children, o.submenus, r)
          }
          ms.push(o)
        })
      }
      recMenu(routes, menus)
      console.log(menus)
      this.menus = menus
    }
  }

</script>
