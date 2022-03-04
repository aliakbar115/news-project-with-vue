<template>
  <div>
    <ol class="breadcrumb mt-4">
      <li class="breadcrumb-item">
        <router-link to="/admin"> خانه </router-link>
      </li>
      <li class="breadcrumb-item active">لیست تایید نشده</li>
    </ol>
    <section class="content mt-5">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">نظرات</h3>

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
                        placeholder="search in comment & id"
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
                </div>
              </div>

              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <th>آیدی نظر</th>
                      <th>متن نظر</th>
                      <th>نام کاربر(نظر دهنده)</th>
                      <th>عنوان مقاله مرتبط</th>
                      <th>اقدامات</th>
                    </tr>
                    <tr v-for="(comment, index) in comments.data" :key="index">
                      <td>{{ comment.id }}</td>
                      <td>{{ comment.comment }}</td>
                      <td>{{ comment.user.name }}</td>
                      <td>{{ comment.commentable.title }}</td>

                      <td class="d-flex">
                        <a
                          class="btn btn-sm btn-success mr-2"
                          v-on:click.prevent="approvedComment(comment.id)"
                          >تایید نظر</a
                        >
                        <a
                          class="btn btn-sm btn-danger mr-2"
                          v-on:click.prevent="deleteComment(comment.id)"
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
    deleteComment(commentId) {
      this.$store.dispatch("deleteComment", commentId); // حذف کامنت و پاسخ های آن با هم
    },
    onInput() {
      this.$store.dispatch("searchInputComment", this.searchQuery);
    },
    approvedComment(commentId) {
      this.$store.dispatch("approvedComment", commentId);
    },
  },
  computed: {
    comments() {
      return this.$store.getters.getComments;
    },
  },
  created() {
    this.$store.dispatch("getUnApprovedCommentsFromServer");
  },
};
</script>
