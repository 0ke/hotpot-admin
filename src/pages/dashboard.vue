<template>
  <div>
    <div class="row card">
      <h4 class="card-header">中国地图</h4>
      <div class="card-block">
        <chart :options="chinaMap"></chart>
      </div>
    </div>

    <chart :options="polar"></chart>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data: function () {
      let data = []
      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }

      let chinaMap = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        series: [
          {
            name: '中国',
            type: 'map',
            mapType: 'china',
            selectedMode: 'multiple',
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            }
          }
        ]
      }

      return {
        chinaMap: chinaMap,
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
