<template>
  <div></div>
</template>

<script>
  require('fullcalendar')

  export default {
    props: {
      options: {
        default() {
          return {
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,basicWeek,basicDay'
            },
            navLinks: true,
            editable: true,
            eventLimit: true
          }
        }
      },
      events: {
        default() {
          return []
        }
      },
      eventSources: {
        default() {
          return []
        }
      }
    },
    methods: {
      select(start, end) {
        this.$emit('select', start, end)
      },
      hello() {
        alert('hello')
      }
    },
    mounted() {
      const cal = $(this.$el)
      const self = this
      if (this.options.selectable) {
        this.options.select = this.select
      }

      this.options.events = function (start, end, timezone, callback) {
        callback(self.events)
      }
      this.options.eventSources = this.eventSources
      cal.fullCalendar(this.options)
    },
    watch: {
      events: {
        deep: true,
        handler(val) {
          const cal = $(this.$el)
          cal.fullCalendar('refetchEvents')
          cal.fullCalendar('rerenderEvents')
        }
      },
      eventSources: {
        deep: true,
        handler(val) {
          const cal = $(this.$el)
          console.log(val)
          cal.fullCalendar('refetchEventSources')
          cal.fullCalendar('rerenderEvents')
        }
      }
    }
  }
</script>
