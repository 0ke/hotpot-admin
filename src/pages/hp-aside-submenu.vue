<template>
  <transition @beforeEnter="beforeEnter" @afterEnter="afterEnter" @beforeLeave="beforeLeave" @afterLeave="afterLeave">
    <el-submenu :index="index">
      <template slot="title"><i v-if="icon" :class="icon"></i>{{title}}</template>
      <template v-for="sm, i in submenus">
        <hp-aside-submenu v-if="sm.submenus && sm.submenus.length > 0" :title="sm.title"
                          :index="sm.path" :icon="sm.icon"
                          :submenus="sm.submenus"></hp-aside-submenu>
        <el-menu-item v-else :index="sm.path">{{sm.title}}</el-menu-item>
      </template>
    </el-submenu>
  </transition>
</template>
<script>
  export default {
    name: 'hp-aside-submenu',
    props: ['title', 'index', 'icon', 'submenus'],
    methods: {
      beforeEnter (el) {
        el.classList.remove('collapse')
        el.style.display = 'block'
        el.classList.add('collapsing')
        el.style.height = `${el.scrollHeight}px`
      },
      afterEnter (el) {
        el.classList.remove('collapsing')
        el.classList.add('collapse', 'in')
      },
      beforeLeave (el) {
        el.classList.add('collapsing')
        el.classList.remove('collapse', 'in')
        el.style.height = 0
      },
      afterLeave (el) {
        el.classList.remove('collapsing')
        el.classList.add('collapse')
        el.style.display = 'none'
      },
      toggle(m) {
        console.log(m)
        if (!m.subMenus) {
          return
        }
        m.collapsed = !m.collapsed
      }
    }
  }

</script>
