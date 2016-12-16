<template>
  <ul class="al-sidebar-list">
    <li v-for="m in menus" class="al-sidebar-list-item" :class="{'ba-sidebar-item-expanded': m.collapsed}">
      <a class="al-sidebar-list-link" @click="toggle(m)">
        <i v-if="m.icon" :class="m.icon"></i>
        <span>{{m.title}}</span>
        <i class="al-sidebar-menu-angle fa" :class="{'fa-angle-up': m.collapsed, 'fa-angle-down': !m.collapsed}"
           v-if="m.subMenus"></i>
      </a>

      <hp-aside-item :menus="m.subMenus" v-if="m.subMenus"></hp-aside-item>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'hp-aside-item',
    props: ['menus'],
    methods: {
      toggle(m) {
        if (!m.subMenus) {
          return
        }
        m.collapsed = !m.collapsed
      }
    }
  }
</script>
