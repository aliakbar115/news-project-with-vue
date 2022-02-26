<template>
<div class="wrapper">

  <!-- Navbar -->
  <admin-navbar></admin-navbar>

  <!-- Main Sidebar Container -->
  <admin-sidebar></admin-sidebar>

  <!-- Content Wrapper. Contains page content -->

  <div class="content-wrapper">
    <router-view></router-view>
  </div>

  <admin-footer></admin-footer>

</div>
</template>

<script>

import AdminFooter from './Components/AdminFooter.vue';
import AdminSidebar from './Components/AdminSidebar.vue';
import AdminNavbar from './Components/AdminNavbar.vue';

export default {
  data() {
    return {};
  },
  components: {
    "admin-navbar": AdminNavbar,
    "admin-sidebar": AdminSidebar,
    "admin-footer": AdminFooter,
  }
};
</script>
