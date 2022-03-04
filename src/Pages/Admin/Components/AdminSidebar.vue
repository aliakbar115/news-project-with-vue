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
            <img
              src="/src/assets/dist/img/Untitled-66.jpg"
              class="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div class="info">
            <a href="#" class="d-block">علی اکبر تیموری</a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li
              class="nav-item has-treeview"
              v-on:click="click_li_user"
              v-bind:class="{ 'menu-open': isActiveUser }"
            >
              <router-link
                to="/admin/users"
                class="nav-link"
                active-class="active"
              >
                <i class="nav-icon fa fa-dashboard"></i>
                <p>
                  کاربران
                  <i class="right fa fa-angle-left"></i>
                </p>
              </router-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link
                    to="/admin/users"
                    class="nav-link"
                    active-class="active"
                  >
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>لیست کاربران</p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li
              class="nav-item has-treeview"
              v-on:click="isActiveCategory = !isActiveCategory"
              v-bind:class="{ 'menu-open': isActiveCategory }"
            >
              <router-link
                to="/admin/categories"
                class="nav-link"
                active-class="active"
              >
                <i class="nav-icon fa fa-address-card"></i>
                <p>
                  دسته بندی ها
                  <i class="right fa fa-angle-left"></i>
                </p>
              </router-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link
                    to="/admin/categories"
                    class="nav-link"
                    active-class="active"
                  >
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>لیست دسته ها</p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li
              class="nav-item has-treeview"
              v-on:click="isActiveArticle = !isActiveArticle"
              v-bind:class="{ 'menu-open': isActiveArticle }"
            >
              <router-link
                to="/admin/articles"
                class="nav-link"
                active-class="active"
              >
                <i class="nav-icon fa fa-archive"></i>
                <p>
                  مقالات
                  <i class="right fa fa-angle-left"></i>
                </p>
              </router-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link
                    to="/admin/articles"
                    class="nav-link"
                    active-class="active"
                  >
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>لیست مقالات</p>
                  </router-link>
                </li>
              </ul>
            </li>
            <li
              class="nav-item has-treeview"
              v-on:click="isActiveComment = !isActiveComment"
              v-bind:class="{ 'menu-open': isActiveComment }"
            >
              <router-link
                to="/admin/comments/approved"
                class="nav-link"
                active-class="active"
              >
                <i class="nav-icon fa fa-comment"></i>
                <p>
                  نظرات
                  <i class="right fa fa-angle-left"></i>
                </p>
              </router-link>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link
                    to="/admin/comments/approved"
                    class="nav-link"
                    active-class="active"
                  >
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>نظرات تایید شده</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="/admin/comments/unApproved"
                    class="nav-link"
                    active-class="active"
                  >
                    <i class="fa fa-circle-o nav-icon"></i>
                    <p>نظرات تایید نشده</p>
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
  data() {
    return {
      isActiveUser: false,
      isActiveComment:false,
      isActiveArticle:false,
      isActiveCategory:false,
    };
  },
  computed: {},
  created() {},
  methods: {
    click_li_user() {
      this.isActiveUser = !this.isActiveUser;
    },
  },
};
</script>
