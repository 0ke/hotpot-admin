<template>
  <el-row type="flex" align="top" class="page-top">
    <el-col span="20">
      <a class="logo" href="javascript:;"><span>Hotpot</span>Admin</a>
      <a href="javascript:void(0);" class="collapse-menu-link"><i class="fa fa-bars"></i></a>
    </el-col>
    <el-col span="4" style="text-align:right;">
      <hp-notification></hp-notification>
      <hp-message></hp-message>
      <el-dropdown trigger="click">
        <a href="javascript:;" class="el-dropdown-link"><img src="holder.js/55x55"/></a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><a><i class="fa fa-user"></i> Profile</a></el-dropdown-item>
          <el-dropdown-item><a><i class="fa fa-cog"></i> Settings</a></el-dropdown-item>
          <el-dropdown-item><a><i class="fa fa-power-off"></i> Sign Out</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>

  </el-row>
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
