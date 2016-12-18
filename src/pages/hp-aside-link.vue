<template>
  <a v-if="abstract">
    <slot></slot>
  </a>
  <router-link :to="path" v-else>
    <slot></slot>
  </router-link>
</template>
<script>
  export default {
    props: ['path', 'abstract']
  }
</script>
