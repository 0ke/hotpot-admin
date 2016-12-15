<template>
  <div class="container-fluid">
    <hp-page-top></hp-page-top>

    <div class="row">
      <div class="col-md-2">
        <hp-aside></hp-aside>
      </div>
      <div class="col-md-10 al-main">
        <div class="al-content">
          <router-view></router-view>
        </div>
      </div>
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
  import hpAside from './hp-aside'

  export default {
    name: 'app',
    components: {
      hpPageTop, hpAside
    }
  }
</script>

<style lang="scss">
  @import "../scss/variables";
  @import "../sass/main";

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    line-height: 40px;
    background-color: $gray-lighter;
  }
</style>
