<template>
  <div class="pos-f-t">
    <div class="page-top clearfix">
      <a class="logo clearfix"><span>Hotpot</span>Admin</a>
      <a href="javascript:void(0);" class="collapse-menu-link"><i class="fa fa-bars"></i></a>

      <ul class="nav navbar-nav float-xs-right">
        <li class="nav-item msg-center">
          <a href="javascript:void(0);" data-toggle="dropdown">
            <i class="fa fa-bell-o"></i><span>5</span>
            <div class="notification-ring"></div>
          </a>
          <hp-notification class="top-dropdown-menu dropdown-menu dropdown-menu-right"></hp-notification>
        </li>
        <li class="nav-item msg-center">
          <a href="javascript:void(0);" class="msg" data-toggle="dropdown">
            <i class="fa fa-envelope-o"></i><span>5</span>
            <div class="notification-ring"></div>
          </a>
          <hp-message class="top-dropdown-menu dropdown-menu dropdown-menu-right"></hp-message>
        </li>
        <li class="nav-item user-profile">
          <a data-toggle="dropdown">
            <img src="holder.js/45x45"/>
          </a>
          <ul class="dropdown-menu dropdown-menu-right">
            <li class="dropdown-item"><a href="#/profile"><i class="fa fa-user"></i>Profile</a></li>
            <li class="dropdown-item"><a href><i class="fa fa-cog"></i>Settings</a></li>
            <li class="dropdown-item"><a href class="signout"><i class="fa fa-power-off"></i>Sign out</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import hpMsgCenter from './hp-msg-center'
  import hpNotification from './hp-notification'
  import hpMessage from './hp-message'
  export default{
    components: {
      hpMsgCenter, hpNotification, hpMessage
    }
  }
</script>
