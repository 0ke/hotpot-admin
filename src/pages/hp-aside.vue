<template>
  <aside class="sidebar">
    <hp-aside-item :menus="menus"></hp-aside-item>
  </aside>
</template>
<script>
  import hpAsideItem from './hp-aside-item.vue'
  export default {
    components: {hpAsideItem},
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
            o.subMenus = []
            recMenu(r.children, o.subMenus, r)
          }
          ms.push(o)
        })
      }
      recMenu(routes, menus)
      this.menus = menus
    }
  }
</script>
