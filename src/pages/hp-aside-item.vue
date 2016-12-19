<template>
  <ul class="sidebar-list">
    <li v-for="m in menus">
      <hp-aside-link :path="m.path" :abstract="m.abstract" class="sidebar-list-link" @click="toggle(m)">
        <i v-if="m.icon" :class="m.icon"></i>
        <span>{{m.title}}</span>
        <i class="sidebar-menu-angle fa" :class="{'fa-angle-up': m.collapsed, 'fa-angle-down': !m.collapsed}"
           v-if="m.subMenus"></i>
      </hp-aside-link>

      <transition @beforeEnter="beforeEnter" @afterEnter="afterEnter" @beforeLeave="beforeLeave"
                  @afterLeave="afterLeave">
        <hp-aside-item :menus="m.subMenus" v-if="m.subMenus" v-show="m.collapsed"
                       class="sidebar-sublist"></hp-aside-item>
      </transition>
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
