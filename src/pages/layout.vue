<template>
  <div>
    <hp-page-top></hp-page-top>
    <el-row class="page-wrapper">
      <hp-aside class="sidebar"></hp-aside>
      <div class="content-wrapper">
        <el-row>
          <el-col span="12">
            <h1>Title</h1>
          </el-col>
          <el-col span="12">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
              <el-breadcrumb-item>promotion management</el-breadcrumb-item>
              <el-breadcrumb-item>promotion list</el-breadcrumb-item>
              <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-card>
          <router-view></router-view>
        </el-card>
      </div>
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
  @import "../../node_modules/bootstrap/scss/bootstrap";
  @import "../../node_modules/font-awesome/css/font-awesome.min.css";
  @import "../element-theme/index.css";
  @import "../scss/main";
</style>
