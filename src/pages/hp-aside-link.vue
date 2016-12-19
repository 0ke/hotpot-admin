<template>
  <router-link v-if="!abstract" :to="path" @click="click" :exact="true">
    <slot></slot>
  </router-link>
  <a v-else @click="click">
    <slot></slot>
  </a>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    props: ['path', 'abstract'],
    methods: {
      click() {
        this.$emit('click')
      }
    }
  }
</script>
