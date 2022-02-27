<template>
  <div>
    <ol class="breadcrumb mt-4">
      <li class="breadcrumb-item">
        <router-link to="/admin"> خانه </router-link>
      </li>
      <li class="breadcrumb-item active">لیست دسته ها</li>
    </ol>
    <section class="content mt-5">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">دسته بندی ها</h3>

                <div class="card-tools d-flex">
                  <!-- search -->
                  <form action="" method="get">
                    <div
                      class="input-group input-group-sm"
                      style="width: 200px"
                    >
                      <input
                        type="text"
                        name="search"
                        value=""
                        class="form-control float-right"
                        placeholder="search in name"
                        v-model="searchQuery"
                        @input="onInput"
                      />
                      <div class="input-group-append">
                        <button type="submit" class="btn btn-default">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>

                  <!-- ایجاد دسته  -->
                  <div class="input-group-sm mr-2">
                    <router-link
                      to="/admin/categories/create"
                      class="btn btn-sm btn-info"
                    >
                      ایجاد دسته
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <th>آیدی دسته</th>
                      <th>نام دسته</th>
                      <th>نام انگلیسی</th>
                      <th>نام والد</th>
                      <th>اقدامات</th>
                    </tr>
                    <tr
                      v-for="(category, index) in categories.data"
                      :key="index"
                    >
                      <td>{{ category.id }}</td>
                      <td>{{ category.name }}</td>
                      <td>{{ category.lname }}</td>
                      <td v-if="category.parent">{{ category.parent.name }}</td>
                      <td v-else>بدون والد</td>

                      <td class="d-flex">
                        <router-link
                          :to="{
                            name: 'adminCategoriesEdit',
                            params: { id: category.id },
                          }"
                          class="btn btn-sm btn-primary"
                        >
                          ویرایش
                        </router-link>
                        <a
                          class="btn btn-sm btn-danger mr-2"
                          v-on:click.prevent="deleteCategory(category.id)"
                          >حذف</a
                        >
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
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    deleteCategory(categoryId) {
      this.$store.dispatch("deleteCategory", categoryId);
    },
    onInput() {
      this.$store.dispatch("searchInputCategory", this.searchQuery);
    },
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
  },
  created() {
    this.$store.dispatch("getCategoriesFromServer");
  },
};
</script>
