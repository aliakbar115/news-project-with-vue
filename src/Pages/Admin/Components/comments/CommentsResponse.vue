<template>
  <div>
    <ol class="breadcrumb mt-4">
      <li class="breadcrumb-item">
        <router-link to="/admin"> خانه </router-link>
      </li>
      <li class="breadcrumb-item active">نمایش پاسخ ها</li>
    </ol>
    <section class="content mt-5">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">فرم ثبت پاسخ به پیام کاربر</h3>
              </div>
              <form class="form-horizontal">
                <div class="card-body">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">متن پاسخ</label>
                    <textarea
                      v-model="comment"
                      class="form-control"
                      cols="30"
                      rows="3"
                      placeholder="متن پاسخ را وارد کنید"
                    >
                    </textarea>
                  </div>
                  <p style="color: red" v-if="comment.length == 0" class="m-3">
                    {{ error }}
                  </p>
                </div>
                <div class="card-footer">
                  <button
                    v-on:click.prevent="responseComment"
                    class="btn btn-info"
                  >
                    ثبت پاسخ
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="card-header">
            <h3 class="card-title">نمایش دیگر پاسخ های شما:</h3>
          </div>
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>آیدی نظر</th>
                  <th>متن پاسخ</th>
                  <th>نام کاربر(نظر دهنده)</th>
                  <th>عنوان مقاله مرتبط</th>
                  <th>اقدامات</th>
                </tr>
                <tr v-for="(comment, index) in responses.data" :key="index">
                  <td>{{ comment.id }}</td>
                  <td>{{ comment.comment }}</td>
                  <td>{{ comment.user.name }}</td>
                  <td>{{ comment.commentable.title }}</td>

                  <td class="d-flex">
                    <a
                      class="btn btn-sm btn-danger mr-2"
                      v-on:click.prevent="deleteResponse(comment.id)"
                      >حذف</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
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
      parent_id: this.$route.params.id,
      comment: "",
      error: "",
    };
  },
  methods: {
    responseComment() {
      if (this.comment.length > 0) {
        let response = {
          parent_id: this.parent_id,
          comment: this.comment,
        };
        this.$store.dispatch("responseComment", response);
        this.comment='';
      } else {
        this.error = "شما هیچ متنی وارد نکردید";
      }
    },
    deleteResponse(commentId){
      let deleteObj={
        parent_id: this.parent_id,
        commentId: commentId,
      }
      this.$store.dispatch("deleteResponse", deleteObj);
    }
  },
  computed: {
    responses() {
      console.log(this.$store.getters.getResponse);
      return this.$store.getters.getResponse;
    },
  },
  created() {
    this.$store.dispatch("getResponse", this.parent_id);
  },
};
</script>
