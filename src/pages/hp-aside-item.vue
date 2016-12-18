<template>
  <ul class="al-sidebar-list">
    <li v-for="m in menus" class="al-sidebar-list-item" :class="{'ba-sidebar-item-expanded': m.collapsed}">
      <!--<a class="al-sidebar-list-link" @click="toggle(m)" v-if="m.abstract">-->
      <!--<i v-if="m.icon" :class="m.icon"></i>-->
      <!--<span>{{m.title}}</span>-->
      <!--<i class="al-sidebar-menu-angle fa" :class="{'fa-angle-up': m.collapsed, 'fa-angle-down': !m.collapsed}"-->
      <!--v-if="m.subMenus"></i>-->
      <!--</a>-->
      <!--<router-link :to="m.name" v-else>-->
      <!--<i v-if="m.icon" :class="m.icon"></i>-->
      <!--<span>{{m.title}}</span>-->
      <!--<i class="al-sidebar-menu-angle fa" :class="{'fa-angle-up': m.collapsed, 'fa-angle-down': !m.collapsed}"-->
      <!--v-if="m.subMenus"></i>-->
      <!--</router-link>-->
      <hp-aside-link :path="m.path" :abstract="m.abstract" class="al-sidebar-list-link" @click="toggle(m)">
        <i v-if="m.icon" :class="m.icon"></i>
        <span>{{m.title}}</span>
        <i class="al-sidebar-menu-angle fa" :class="{'fa-angle-up': m.collapsed, 'fa-angle-down': !m.collapsed}"
           v-if="m.subMenus"></i>
      </hp-aside-link>

      <hp-aside-item :menus="m.subMenus" v-if="m.subMenus"></hp-aside-item>
    </li>
  </ul>
</template>
<script>
  import hpAsideLink from './hp-aside-link'

  export default {
    name: 'hp-aside-item',
    props: ['menus'],
    components: {hpAsideLink},
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
