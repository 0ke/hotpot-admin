<template>
  <div class="container-fluid">
    <hp-page-top></hp-page-top>

    <div class="page-wrapper">
      <hp-aside></hp-aside>
      <div class="content-wrapper">
        <div class="al-content">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <!--<footer class="footer">-->
    <!--<div class="container">-->
    <!--<span class="text-muted">Place sticky footer content here.</span>-->
    <!--</div>-->
    <!--</footer>-->
  </div>
</template>

<script>
  import hpPageTop from './hp-page-top'
  import hpAside from './hp-aside'

  export default {
    name: 'app',
    components: {
      hpPageTop, hpAside
    }
  }

</script>

<style lang="scss">
  @import "../scss/main";
</style>
