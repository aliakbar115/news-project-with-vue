<template>
  <div>
    <ol class="breadcrumb mt-4">
      <li class="breadcrumb-item">
        <router-link to="/admin"> خانه </router-link>
      </li>
      <li class="breadcrumb-item active">لیست کاربران</li>
    </ol>
    <section class="content mt-5">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">کاربران</h3>

                <div class="card-tools d-flex">
                  <!-- search -->
                  <form action="" method="get">
                    <div
                      class="input-group input-group-sm"
                      style="width: 150px"
                    >
                      <input
                        type="text"
                        name="search"
                        value=""
                        class="form-control float-right"
                        placeholder="جستجو"
                      />
                      <div class="input-group-append">
                        <button type="submit" class="btn btn-default">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>

                  <!-- ایجاد کاربر  -->
                  <div class="input-group-sm mr-2">
                    <router-link
                      to="/admin/users/create"
                      class="btn btn-sm btn-info"
                    >
                      ایجاد کاربر
                    </router-link>

                    <!-- <a href="" class="btn btn-sm btn-warning">
                      کاربران مدیر
                    </a>
                    <a href="" class="btn btn-sm btn-secondary">
                      همه کاربران
                    </a> -->
                  </div>
                </div>
              </div>

              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <th>آیدی کاربر</th>
                      <th>نام کاربر</th>
                      <th>ایمیل</th>
                      <th>وضعیت ایمیل کاربر</th>
                      <th>اقدامات</th>
                    </tr>
                    <tr v-for="(user, index) in users.data" :key="index">
                      <td>{{ user.id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>

                      <td v-if="user.email_verified_at">
                        <span class="badge badge-success">فعال</span>
                      </td>

                      <td v-else>
                        <span class="badge badge-danger">غیر فعال</span>
                      </td>

                      <td class="d-flex">
                        <router-link
                          :to="{name:'adminUsersEdit',params:{id:user.id}}"
                          class="btn btn-sm btn-primary"
                        >
                          ویرایش
                        </router-link>
                        <router-link
                          to="/admin/users/delete"
                          class="btn btn-sm btn-danger mr-2"
                        >
                          حذف
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- صفحه بندی -->
              <div class="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },

  },
  created() {
    this.$store.dispatch("getUsersFromServer");
  },
};
</script>
