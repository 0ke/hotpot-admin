<template>
  <div class="pos-f-t main-header">
    <div class="collapse" id="navbar-header">
      <div class="container bg-inverse p-1">
        <h3>Collapsed content</h3>
        <p>Toggleable via the navbar brand.</p>
      </div>
    </div>
    <b-navbar class="navbar-static-top bg-none utmenu">
      <div class="container-fluid">
        <div class="collapse navbar-toggleable-xs">
          <a class="navbar-brand" href="#">Hotpot</a>
          <b-nav type="navbar" class="utmenu-list">
            <b-nav-item>仪表盘</b-nav-item>
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
            <li class="nav-item dropdown menu-large">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Dropdown2</a>
              <ul class="dropdown-menu megamenu">
                <li>
                  <div class="row">
                    <div class="col-sm-3">
                      <h5 class="mobile-megamenu waves-effect waves-light">Page Layouts <span class="icon_plus"></span>
                      </h5>
                      <ul class="list-menu">
                        <li>
                          <a href="components/flot.html"><i class="arrow_triangle-right" aria-hidden="true"></i>Flot</a>
                        </li>
                        <li>
                          <a href="components/chartist.html"><i class="arrow_triangle-right" aria-hidden="true"></i>Chartist</a>
                        </li>
                        <li>
                          <a href="components/validation.html"><i class="arrow_triangle-right" aria-hidden="true"></i>Form
                            validation</a>
                        </li>
                        <li>
                          <a href="components/layouts.html"><i class="arrow_triangle-right" aria-hidden="true"></i>Form
                            layouts</a>
                        </li>
                        <li>
                          <a href="components/jsgrid.html"><i class="arrow_triangle-right" aria-hidden="true"></i>JsGrid</a>
                        </li>
                        <li>
                          <a href="components/footable.html"><i class="arrow_triangle-right" aria-hidden="true"></i>FooTable</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-sm-3">b</div>
                    <div class="col-sm-3">c</div>
                    <div class="col-sm-3">d</div>
                  </div>
                </li>
              </ul>
            </li>
            <b-nav-item>功能</b-nav-item>
            <b-nav-item>扩展功能</b-nav-item>
            <li>
              <div class="float-xs-right">
                <b-nav type="navbar">
                  <b-nav-item>Profile</b-nav-item>
                  <b-nav-item>仪表盘</b-nav-item>
                </b-nav>
              </div>
            </li>
          </b-nav>
        </div>
      </div>
    </b-navbar>
  </div>
</template>
<script>
  export default{
    name: 'hp-page-top',
    data(){
    }
  }
</script>
<style>
</style>
