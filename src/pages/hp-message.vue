<template>
  <div>
    <div class="header clearfix">
      <strong>Messages</strong>
      <a href>Mark All as Read</a>
      <a href>Settings</a>
    </div>
    <div class="msg-list">
      <a href class="clearfix" v-for="msg in messages">
        <div class="img-area"><img src="holder.js/55x55"></div>
        <div class="msg-area">
          <div>{{ msg.text }}</div>
          <span>{{ msg.time }}</span>
        </div>
      </a>
    </div>
    <a href>See all messages</a>
  </div>
</template>
<script>
  export default {
    data() {
      var messages = [
        {
          userId: 3,
          text: 'After you get up and running, you can place Font Awesome icons just about...',
          time: '1 min ago'
        },
        {
          userId: 0,
          text: 'You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.',
          time: '2 hrs ago'
        },
        {
          userId: 1,
          text: 'Want to request new icons? Here\'s how. Need vectors or want to use on the...',
          time: '10 hrs ago'
        },
        {
          userId: 2,
          text: 'Explore your passions and discover new ones by getting involved. Stretch your...',
          time: '1 day ago'
        },
        {
          userId: 3,
          text: 'Get to know who we are - from the inside out. From our history and culture, to the...',
          time: '1 day ago'
        },
        {
          userId: 1,
          text: 'Need some support to reach your goals? Apply for scholarships across a variety of...',
          time: '2 days ago'
        },
        {
          userId: 0,
          text: 'Wrap the dropdown\'s trigger and the dropdown menu within .dropdown, or...',
          time: '1 week ago'
        }
      ]
      return {messages: messages}
    }
  }
</script>
