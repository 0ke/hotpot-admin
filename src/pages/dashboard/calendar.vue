<template>
  <div class="card">
    <div class="card-block">
      <full-calendar ref="fullCalendar" :options="options" :events="events"
                     :eventSources="eventSources" class="blurCalendar" @select="select"></full-calendar>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import fullCalendar from 'components/full-calendar'
  export default {
    components: {fullCalendar},
    data() {
      return {
        options: {
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
//            right: 'month,agendaWeek,agendaDay,listWeek'
          },
          navLinks: true, // can click day/week names to navigate views
          selectable: true,
          editable: true,
          eventLimit: true, // allow "more" link when too many events
          defaultDate: '2016-12-12'
        },
        events: [
          {
            "title": "All Day Event",
            "start": "2016-12-01"
          },
          {
            "title": "Long Event",
            "start": "2016-12-07",
            "end": "2016-12-10"
          },
          {
            "id": "999",
            "title": "Repeating Event",
            "start": "2016-12-09T16:00:00-05:00"
          },
          {
            "id": "999",
            "title": "Repeating Event",
            "start": "2016-12-16T16:00:00-05:00"
          },
          {
            "title": "Conference",
            "start": "2016-12-11",
            "end": "2016-12-13"
          },
          {
            "title": "Meeting",
            "start": "2016-12-12T10:30:00-05:00",
            "end": "2016-12-12T12:30:00-05:00"
          },
          {
            "title": "Lunch",
            "start": "2016-12-12T12:00:00-05:00"
          },
          {
            "title": "Meeting",
            "start": "2016-12-12T14:30:00-05:00"
          },
          {
            "title": "Happy Hour",
            "start": "2016-12-12T17:30:00-05:00"
          },
          {
            "title": "Dinner",
            "start": "2016-12-12T20:00:00"
          },
          {
            "title": "Birthday Party",
            "start": "2016-12-13T07:00:00-05:00"
          },
          {
            "title": "Click for Google",
            "url": "http://google.com/",
            "start": "2016-12-28"
          }
        ],
        eventSources: [
          {
            events: [
              {
                "title": "Click for Google",
                "url": "http://google.com/",
                "start": "2016-12-29"
              }
            ]
          }
        ]
      }
    },
    methods: {
      select(start, end) {
        var title = prompt('Event Title:')
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          }
          this.events.push(eventData)

          console.log('=====================================')
          console.log(this.$refs.fullCalendar.hello())
        }
      }
    }
  }
</script>
