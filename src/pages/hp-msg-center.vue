<template>
  <ul class="al-msg-center">
    <li class="dropdown">
      <a href="javascript:void(0);" data-toggle="dropdown">
        <i class="fa fa-bell-o"></i><span>5</span>
        <div class="notification-ring"></div>
      </a>

      <div class="top-dropdown-menu dropdown-menu dropdown-menu-right">
        <div class="header clearfix">
          <strong>Notifications</strong>
          <a href>Mark All as Read</a>
          <a href>Settings</a>
        </div>
        <div class="msg-list">
          <a href class="clearfix" v-for="msg in notifications">
            <div class="img-area"><img src="http://placehold.it/100x100"></div>
            <div class="msg-area">
              <div v-html="getMessage(msg)"></div>
              <span>{{ msg.time }}</span>
            </div>
          </a>
        </div>
        <a href>See all notifications</a>
      </div>
    </li>
    <li class="dropdown">
      <a href="javascript:void(0);" class="msg" data-toggle="dropdown">
        <i class="fa fa-envelope-o"></i><span>5</span>
        <div class="notification-ring"></div>
      </a>
      <div class="top-dropdown-menu dropdown-menu dropdown-menu-right">
        <div class="header clearfix">
          <strong>Messages</strong>
          <a href>Mark All as Read</a>
          <a href>Settings</a>
        </div>
        <div class="msg-list">
          <a href class="clearfix" v-for="msg in messages">
            <div class="img-area"><img src="http://placehold.it/100x100"></div>
            <div class="msg-area">
              <div>{{ msg.text }}</div>
              <span>{{ msg.time }}</span>
            </div>
          </a>
        </div>
        <a href>See all messages</a>
      </div>
    </li>
  </ul>

</template>
<script>
  export default{
    data() {
      var users = {
        0: {
          name: 'Vlad',
        },
        1: {
          name: 'Kostya',
        },
        2: {
          name: 'Andrey',
        },
        3: {
          name: 'Nasta',
        }
      }

      var notifications = [
        {
          userId: 0,
          template: '&name posted a new article.',
          time: '1 min ago'
        },
        {
          userId: 1,
          template: '&name changed his contact information.',
          time: '2 hrs ago'
        },
        {
          image: 'assets/img/shopping-cart.svg',
          template: 'New orders received.',
          time: '5 hrs ago'
        },
        {
          userId: 2,
          template: '&name replied to your comment.',
          time: '1 day ago'
        },
        {
          userId: 3,
          template: 'Today is &name\'s birthday.',
          time: '2 days ago'
        },
        {
          image: 'assets/img/comments.svg',
          template: 'New comments on your post.',
          time: '3 days ago'
        },
        {
          userId: 1,
          template: '&name invited you to join the event.',
          time: '1 week ago'
        }
      ]

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

      return {
        users: users,
        notifications: notifications,
        messages: messages
      }
    },
    methods: {
      getMessage(msg) {
        var text = msg.template;
        if (msg.userId || msg.userId === 0) {
          text = text.replace('&name', '<strong>' + this.users[msg.userId].name + '</strong>');
        }
        return text;
      }
    }
  }
</script>
