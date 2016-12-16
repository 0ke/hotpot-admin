<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <visit-chart></visit-chart>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-block">
            <calendar></calendar>
          </div>
        </div>
      </div>
    </div>

    <div class="row card">
      <h4 class="card-header">中国地图</h4>
      <div class="card-block">
        <chart :options="polar" weight="400" height="600"></chart>
      </div>
    </div>
  </div>
</template>

<script>
  import visitChart from './visit-chart'
  import calendar from './calendar'
  export default {
    name: 'dashboard',
    components: {visitChart, calendar},
    data: function () {
      let data = []

      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }

      return {
        polar: {
          title: {
            text: '极坐标双数值轴'
          },
          legend: {
            data: ['line']
          },
          polar: {
            center: ['50%', '54%']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          angleAxis: {
            type: 'value',
            startAngle: 0
          },
          radiusAxis: {
            min: 0
          },
          series: [
            {
              coordinateSystem: 'polar',
              name: 'line',
              type: 'line',
              showSymbol: false,
              data: data
            }
          ],
          animationDuration: 2000
        }
      }
    }
  }
</script>
