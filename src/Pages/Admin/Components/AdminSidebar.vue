<template>
 <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <span class="brand-text font-weight-light">پنل مدیریت</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar" style="direction: ltr">
      <div style="direction: rtl">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img src="/src/assets/dist/img/Untitled-66.jpg" class="img-circle elevation-2" alt="User Image">
          </div>
          <div class="info">
            <a href="#" class="d-block">علی اکبر تیموری</a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item has-treeview menu-open">
              <router-link to="/admin/users" class="nav-link" active-class="active">
                <i class="nav-icon fa fa-dashboard"></i>
                <p>
                  کاربران
                  <i class="right fa fa-angle-left"></i>
                </p>
              </router-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                <router-link to="/admin/users" class="nav-link" active-class="active">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>لیست کاربران</p>
                </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview menu-open">
              <router-link to="/admin/categories" class="nav-link" active-class="active">
                <i class="nav-icon fa fa-dashboard"></i>
                <p>
                  دسته بندی ها
                  <i class="right fa fa-angle-left"></i>
                </p>
              </router-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                <router-link to="/admin/categories" class="nav-link" active-class="active">
                  <i class="fa fa-circle-o nav-icon"></i>
                  <p>لیست دسته ها</p>
                </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
export default {
  computed: {

  },
  created() {

  },
   methods: {

  }
};
</script>
