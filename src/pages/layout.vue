<template>
  <div>
    <hp-page-top></hp-page-top>
    <hp-aside></hp-aside>

    <el-row class="page-wrapper">
      <div class="content-wrapper">
        <div class="content-header clearfix">
          <div class="float-xs-left">
            <h3>{{$root.contentTitle}}</h3>
          </div>
          <div class="float-xs-right" v-if="$root.contentBreadcrumbs && $root.contentBreadcrumbs.length > 1">
            <ol class="breadcrumb header-breadcrumb">
              <li class="breadcrumb-item" v-for="(v, i) in $root.contentBreadcrumbs" :class="{active: !v.path}">
                <template v-if="v.path">
                  <a :href="v.path">{{v.text}}</a>
                </template>
                <template v-else>
                  {{v.text}}
                </template>
              </li>
            </ol>
          </div>
        </div>
        <div class="content-view p-1">
          <router-view></router-view>
        </div>
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
  @import "../element-theme/index.css";
  @import "../scss/main";
</style>
