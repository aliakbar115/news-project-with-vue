<template>
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">ایجاد دسته جدید</h1>
          </div>
          <div class="col-sm-6">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/admin"> خانه </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/admin/categories"> دسته بندی ها </router-link>
              </li>
              <li class="breadcrumb-item active">ایجاد دسته جدید</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">فرم ایجاد دسته</h3>
          </div>
          <form class="form-horizontal" method="post" action="">
            <div class="card-body">
              <div v-if="errors" style="color: red">
                <ul v-for="(error, index) in errors" :key="index">
                  <li>{{ error }}</li>
                </ul>
              </div>
              <div class="form-group">
                <label for="nameInput" class="col-sm-2 control-label"
                  >نام دسته</label
                >
                <input
                  type="text"
                  name="name"
                  value=""
                  class="form-control"
                  id="nameInput"
                  placeholder="نام را وارد کنید"
                  v-model="name"
                  @input="$v.name.$touch()"
                  :class="{ invalid: $v.name.$error }"
                />
              </div>
              <p class="text-danger" v-if="!$v.name.required && $v.name.$dirty">
                لطفا نام دسته را وارد کنید
              </p>

              <div class="form-group">
                <label class="col-sm-2 control-label">نام انگلیسی دسته</label>
                <input
                  type="text"
                  value=""
                  name="lname"
                  class="form-control"
                  placeholder="نام انگلیسی را وارد کنید"
                  v-model="lname"
                  @blur="$v.lname.$touch()"
                  :class="{ invalid: $v.lname.$error }"
                />
                <p
                  class="text-danger"
                  v-if="!$v.lname.required && $v.lname.$dirty"
                >
                  لطفا نام انگلیسی را وارد کنید
                </p>
              </div>

              <div class="form-group">
                <label for="exampleForm">انتخاب والد</label>
                <select
                  name="is_staff"
                  class="form-control"
                  id="exampleForm"
                  v-model="parent_id"
                >
                  <option value="0">بدون والد</option>
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
                v-on:click.prevent="createCategory()"
                class="btn btn-info"
                :disabled="$v.$invalid"
              >
                ثبت دسته
              </button>
              <router-link
                class="btn btn-danger float-left"
                to="/admin/categories"
              >
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
export default {
  data() {
    return {
      name: "",
      lname: "",
      parent_id: 0,
      categories: [],
    };
  },
  methods: {
    createCategory() {
      const create = {
        // باید یک آبجکت از موارد ثبت نامی بسازیم و به سمت سرور بفرستیم
        name: this.name,
        lname: this.lname,
        parent_id: this.parent_id,
      };
      this.$store.dispatch("createCategory", create);
    },
    allParent: function () {
      let app = this;
      this.axios
        .get("admin/categories/allParent")
        .then(function (response) {
          app.categories = response.data.categories;
        })
        .catch(function (error) {
          //console.log("response");
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
  },
  computed: {
    errors() {
      return this.$store.getters.getErrorsCategory;
    },
  },
  created() {
    this.allParent();
  },
  components: {},
  validations: {
    //  این پراپرتی اضافه می شود vuelidate بعد از نصب
    name: {
      required,
    },
    lname: {
      required,
    },
  },
};
</script>

<style scoped>
.invalid {
  border: 1px solid red !important;
  box-shadow: 0 0 5px red !important;
  background-color: lightpink !important;
}
</style>
