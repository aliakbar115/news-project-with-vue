<template>
  <div>
    <ol class="breadcrumb mt-4">
      <li class="breadcrumb-item">
        <router-link to="/admin"> خانه </router-link>
      </li>
      <li class="breadcrumb-item active">لیست مقالات</li>
    </ol>
    <section class="content mt-5">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">مقالات</h3>

                <div class="card-tools d-flex">
                  <!-- search -->
                  <form action="" method="get">
                    <div
                      class="input-group input-group-sm"
                      style="width: 250px"
                    >
                      <input
                        type="text"
                        name="search"
                        value=""
                        class="form-control float-right"
                        placeholder="search in title & summary & body"
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

                  <!-- ایجاد مقاله  -->
                  <div class="input-group-sm mr-2">
                    <router-link
                      to="/admin/articles/create"
                      class="btn btn-sm btn-info"
                    >
                      ایجاد مقاله
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <th>آیدی مقاله</th>
                      <th>عنوان مقاله</th>
                      <th>خلاصه مقاله</th>
                      <th>متن مقاله</th>
                      <th>تعداد بازدید</th>
                      <th>عکس مقاله</th>
                      <th>وضعیت مقاله</th>
                      <th>اقدامات</th>
                    </tr>
                    <tr v-for="(article, index) in articles.data" :key="index">
                      <td>{{ article.id }}</td>
                      <td>{{ article.title }}</td>
                      <td>{{ article.summary }}</td>
                      <td>{{ article.body }}</td>
                      <td>{{ article.view_count }}</td>
                      <td>
                        <img
                          :src="articleImageAddress + article.image['thumb']"
                          width="100"
                          height="100"
                        />
                      </td>
                      <td v-if="article.status == 'enable'">فعال</td>
                      <td v-else>غیر فعال</td>
                      <td class="d-flex">
                        <router-link
                          :to="{
                            name: 'adminArticlesEdit',
                            params: { id: article.id },
                          }"
                          class="btn btn-sm btn-primary"
                        >
                          ویرایش
                        </router-link>
                        <a
                          class="btn btn-sm btn-danger mr-2"
                          v-on:click.prevent="deleteArticle(article.id)"
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
    deleteArticle(articleId) {
      this.$store.dispatch("deleteArticle", articleId);
    },
    onInput() {
      this.$store.dispatch("searchInputArticle", this.searchQuery);
    },
  },
  computed: {
    articles() {
      return this.$store.getters.getArticles;
    },
    articleImageAddress() {
      return this.$store.getters.getArticleImageAddress;
    },
  },
  created() {
    this.$store.dispatch("getArticlesFromServer");
  },
};
</script>
