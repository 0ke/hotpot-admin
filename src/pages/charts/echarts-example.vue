<template>
  <div>
    <el-row>
      <el-col span="12">
        <pie-example></pie-example>
      </el-col>
      <el-col span="12">
        <bar-example></bar-example>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="12">
        <radar-example></radar-example>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import pieExample from './pie-example'
  import barExample from './bar-example'
  import radarExample from './radar-example'
  export default {
    components: {pieExample, barExample, radarExample},
    created() {
      this.$root.contentTitle = 'ECharts Example'
      this.$root.contentBreadcrumbs = [
        {
          text: 'Index',
          path: '/'
        },
        {
          text: 'ECharts Example'
        }
      ]
    }
  }
</script>
