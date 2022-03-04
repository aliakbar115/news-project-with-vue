<template>
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">ویرایش مقاله</h1>
          </div>
          <div class="col-sm-6">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/admin"> خانه </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/admin/users"> مقالات </router-link>
              </li>
              <li class="breadcrumb-item active">ویرایش مقاله</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">فرم ویرایش مقاله</h3>
          </div>
          <form class="form-horizontal" method="post" action="">
            <div class="card-body">
              <div v-if="errors" style="color: red">
                <ul v-for="(error, index) in errors" :key="index">
                  <li>{{ error }}</li>
                </ul>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">عنوان مقاله</label>
                <input
                  type="text"
                  name="title"
                  class="form-control"
                  placeholder="عنوان را وارد کنید"
                  v-model="title"
                  @input="$v.title.$touch()"
                  :class="{ invalid: $v.title.$error }"
                />
              </div>
              <p
                class="text-danger"
                v-if="!$v.title.required && $v.title.$dirty"
              >
                لطفا عنوان مقاله را وارد کنید
              </p>
              <div class="form-group">
                <label class="col-sm-2 control-label">خلاصه مقاله </label>
                <textarea
                  class="form-control"
                  placeholder="خلاصه مقاله را وارد کنید"
                  v-model="summary"
                  @input="$v.summary.$touch()"
                  :class="{ invalid: $v.summary.$error }"
                ></textarea>
              </div>
              <p
                class="text-danger"
                v-if="!$v.summary.required && $v.summary.$dirty"
              >
                لطفا خلاصه مقاله را وارد کنید
              </p>
              <div class="form-group">
                <label class="col-sm-2 control-label">متن مقاله </label>
                <textarea
                  class="form-control"
                  placeholder="خلاصه مقاله را وارد کنید"
                  v-model="body"
                  @input="$v.body.$touch()"
                  :class="{ invalid: $v.body.$error }"
                ></textarea>
              </div>
              <p class="text-danger" v-if="!$v.body.required && $v.body.$dirty">
                لطفا متن مقاله را وارد کنید
              </p>
              <div class="mb-3">
                <label for="formFile" class="form-label"
                  >انتخاب تصویر شاخص مقاله</label
                >
                <input
                  class="form-control"
                  type="file"
                  @change="uploadFile"
                  ref="file"
                />
              </div>
              <div class="preview" v-if="image">
                <img v-if="url" :src="url" />
              </div>
              <div class="preview" v-else>
                <img :src="articleImageAddress + oldImage['thumb']"  alt="" srcset="">
              </div>
              <div class="form-group mt-5">
                <label for="articleStatus"> وضعیت مقاله</label>
                <select
                  class="form-control"
                  v-model="status"
                  id="articleStatus"
                >
                  <option value="0">غیر فعال</option>
                  <option value="1">فعال</option>
                </select>
              </div>

              <div class="form-group">
                <label for="exampleForm">انتخاب دسته مقاله</label>
                <select
                  name="categories"
                  class="form-control"
                  v-model="category"
                >
                  <option
                    :value="item.id"
                    v-for="(item, index) in categories"
                    :key="index"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="card-footer">
              <button
                v-on:click.prevent="updateArticle()"
                class="btn btn-info"
                :disabled="$v.$invalid"
              >
                ویرایش مقاله
              </button>
              <router-link class="btn btn-danger float-left" to="/admin/users">
                لغو
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  // باید ولیدیشن های استفاده شده را اضافه کنیم
  required,
} from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
export default {
  data() {
    return {
      title: "",
      summary: "",
      body: "",
      image: "",
      oldImage:'',
      status: 1,
      url: null,
      categories: [],
      category: "",
      id: this.$route.params.id,
    };
  },
  methods: {
    updateArticle() {
      const edit = {
        // باید یک آبجکت از موارد ثبت نامی بسازیم و به سمت سرور بفرستیم
        title: this.title,
        summary: this.summary,
        body: this.body,
        image: this.image,
        status: this.status,
        category: this.category,
        id: this.id,
      };
      this.$store.dispatch("updateArticle", edit);
    },
    uploadFile(e) {
      this.image = this.$refs.file.files[0];
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    allCategory: function () {
      let app = this;
      this.axios
        .get("admin/categories/all")
        .then(function (response) {
          app.categories = response.data.data;
        })
        .catch(function (error) {
          //console.log("response");
        })
        .then(function () {
          // always executed
        });
    },
    editArticle() {
      let app = this;
      this.axios
        .get("admin/articles/edit/" + this.id)
        .then(function (response) {
          app.title = response.data.data.title;
          app.body = response.data.data.body;
          app.summary = response.data.data.summary;
          app.id = response.data.data.id;
          app.category = response.data.data.category_id;
          app.oldImage=response.data.data.image;
          if (response.data.data.status == "enable") {
            app.status = 1;
          } else {
            app.status = 0;
          }
        })
        .catch(function (error) {
          //console.log("response");
        })
        .then(function () {
          // always executed
        });
    },
  },
  computed: {
    errors() {
      return this.$store.getters.getErrorsArticle;
    },
    articleImageAddress() {
      return this.$store.getters.getArticleImageAddress;
    },
  },
  components: { Multiselect },
  validations: {
    //  این پراپرتی اضافه می شود vuelidate بعد از نصب
    title: {
      required,
    },
    summary: {
      required,
    },
    body: {
      required,
    },
  },
  created() {
    this.allCategory();
    this.editArticle();
  },
};
</script>

<style scoped>
.invalid {
  border: 1px solid red !important;
  box-shadow: 0 0 5px red !important;
  background-color: lightpink !important;
}
.preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview img {
  max-width: 30%;
  max-height: 200px;
}
</style>
