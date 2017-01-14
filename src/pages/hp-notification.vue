<template>
  <el-dropdown trigger="click">
    <a href="javascript:;" class="el-dropdown-link">
      <el-badge :value="5">
        <i class="fa fa-bell-o"></i>
      </el-badge>
    </a>
    <el-dropdown-menu slot="dropdown">
      <li>
        <div class="d-flex justify-content-between">
          <strong>Notifications</strong>
          <a href>Mark All as Read</a>
          <a href>Settings</a>
        </div>
      </li>
      <el-dropdown-item v-for="msg in notifications">
        <div class="d-flex">
          <div>
            <a class="media-left" href="#">
              <img src="holder.js/55x55">
            </a>
          </div>
          <div class="align-self-center pl-1" v-html="getMessage(msg)"></div>
        </div>
      </el-dropdown-item>
      <li>
        <div class="d-flex justify-content-center">
          <a href>See all notifications...</a>
        </div>
      </li>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
  export default {
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

      return {users: users, notifications: notifications}
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
