<template>
  <div>
    <hp-page-top></hp-page-top>
    <el-row>
      <el-col span="3">
        <hp-aside></hp-aside>
      </el-col>
      <el-col span="21">
        <div class="content-wrapper">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
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
  @import "../../node_modules/bootstrap/scss/bootstrap-reboot";
  @import "../../node_modules/font-awesome/css/font-awesome.min.css";
  @import "../element-theme/index.css";
  @import "../scss/main";
</style>
