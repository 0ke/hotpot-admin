<template>
  <div class="pos-f-t">
    <div class="collapse" id="navbar-header">
      <div class="container bg-inverse p-1">
        <h3>Collapsed content</h3>
        <p>Toggleable via the navbar brand.</p>
      </div>
    </div>
    <b-navbar class="navbar-static-top">
      <div class="container-fluid">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse"
                data-target="#exCollapsingNavbar2" aria-expanded="false" aria-controls="exCollapsingNavbar2"
                aria-label="Toggle navigation"></button>
        <div class="collapse navbar-toggleable-xs col-md-6 float-xs-left">
          <a class="navbar-brand" href="#">Sticky footer</a>
          <b-nav type="navbar" class="nav-pills">
            <li class="nav-item">
              <router-link class="nav-link" to="/">仪表盘</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Dropdown</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Dropdown</a>
              <div class="dropdown-menu row">
                <a class="dropdown-item" href="#">Action</a>
              </div>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/features">功能 LINK</router-link>
            </li>
            <b-nav-item>功能</b-nav-item>
            <b-nav-item>扩展功能</b-nav-item>
          </b-nav>
        </div>
        <div class="float-xs-right">
          <b-nav type="navbar">
            <b-nav-item>Profile</b-nav-item>
            <b-nav-item>仪表盘</b-nav-item>
          </b-nav>
        </div>
      </div>
    </b-navbar>
  </div>
</template>
<script>
  export default{
    name: 'hp-page-top'
  }
</script>
