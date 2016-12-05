<template>
  <div>
    <hp-page-top></hp-page-top>

    <div style="padding-top:200px;">
      <router-view></router-view>
    </div>

    <footer class="footer">
      <div class="container">
        <span class="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>
  </div>
</template>

<script>
  import hpPageTop from './hp-page-top'

  export default {
    name: 'app',
    components: {
      hpPageTop
    }
  }
</script>

<style lang="scss">
  @import "../scss/variables";

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    line-height: 40px;
    background-color: $gray-lighter;
  }
</style>
