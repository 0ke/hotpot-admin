<template>
  <div class="pos-f-t">
    <div class="page-top clearfix">
      <a href="#/dashboard" class="al-logo clearfix"><span>Hotpot</span>Admin</a>
      <a href="javascript:void(0);" class="collapse-menu-link"><i class="fa fa-bars"></i></a>

      <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="Search for...">
      </div>

      <div class="user-profile">
        <div class="al-user-profile float-xs-right">
          <div class="dropdown">
            <a data-toggle="dropdown">
              <img src="http://placehold.it/100x100"/>
            </a>

            <ul class="top-dropdown-menu profile-dropdown dropdown-menu dropdown-menu-right">
              <li class="dropdown-item"><a href="#/profile"><i class="fa fa-user"></i>Profile</a></li>
              <li class="dropdown-item"><a href><i class="fa fa-cog"></i>Settings</a></li>
              <li class="dropdown-item"><a href class="signout"><i class="fa fa-power-off"></i>Sign out</a></li>
            </ul>
          </div>
        </div>
        <hp-msg-center></hp-msg-center>
      </div>
    </div>
  </div>
</template>
<script>
  import hpMsgCenter from './hp-msg-center'
  export default{
    components: {
      hpMsgCenter
    }
  }
</script>
