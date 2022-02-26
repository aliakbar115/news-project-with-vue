<template>
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">ایجاد کاربر جدید</h1>
          </div>
          <div class="col-sm-6">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/admin"> خانه </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/admin/users"> کاربران </router-link>
              </li>
              <li class="breadcrumb-item active">ایجاد کاربر جدید</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">فرم ایجاد کاربر</h3>
          </div>
          <form class="form-horizontal" method="post" action="">
            <div class="card-body">
              <div v-if="errors" style="color:red">
                <ul v-for="(error, index) in errors" :key="index">
                  <li>{{ error }}</li>
                </ul>
              </div>
              <div class="form-group">
                <label for="nameInput" class="col-sm-2 control-label"
                  >نام کاربر</label
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
                لطفا نام کاربـر را وارد کنید
              </p>

              <div class="form-group">
                <label for="emailInput" class="col-sm-2 control-label"
                  >ایمیل</label
                >
                <input
                  type="email"
                  value=""
                  name="email"
                  class="form-control"
                  id="emailInput"
                  placeholder="ایمیل را وارد کنید"
                  v-model="email"
                  @blur="$v.email.$touch()"
                  :class="{ invalid: $v.email.$error }"
                />
                <p class="text-danger" v-if="!$v.email.email">
                  ایمیل وارد شده معتبر نمیباشد
                </p>
                <p
                  class="text-danger"
                  v-if="!$v.email.required && $v.email.$dirty"
                >
                  لطفا ایمیل را وارد کنید
                </p>
              </div>

              <div class="form-group">
                <label for="passwordInput" class="col-sm-2 control-label"
                  >پسورد</label
                >
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  id="passwordInput"
                  placeholder="پسورد را وارد کنید"
                  v-model="password"
                  @blur="$v.password.$touch()"
                  :class="{ invalid: $v.password.$error }"
                />
                <p
                  class="text-danger"
                  v-if="!$v.password.required && $v.password.$dirty"
                >
                  لطفا کلمه عبور را وارد کنید
                </p>
                <p class="text-danger" v-if="!$v.password.minLength">
                  کلمه عبور باید حداقل شمال
                  {{ $v.password.$params.minLength.min }} کاراکتر باشد
                </p>
              </div>

              <div class="form-group">
                <label for="passwordInputreapet" class="col-sm-2 control-label"
                  >تکرار پسورد</label
                >
                <input
                  type="password"
                  name="password_confirmation"
                  class="form-control"
                  id="passwordInputreapet"
                  placeholder=" تکرار پسورد را وارد کنید "
                  v-model="password_confirmation"
                  @input="$v.password_confirmation.$touch()"
                  :class="{ invalid: $v.password_confirmation.$error }"
                />
                <p
                  class="text-danger"
                  v-if="
                    !$v.password_confirmation.sameAs &&
                    $v.password_confirmation.$dirty
                  "
                >
                  کلمه عبور مغایرت دارد
                </p>
              </div>

              <div class="form-group">
                <label for="exampleForm">همکار سایت</label>
                <select
                  name="is_staff"
                  class="form-control"
                  id="exampleForm"
                  v-model="is_staff"
                >
                  <option value="0">کاربر عادی</option>
                  <option value="1">همکار سایت</option>
                </select>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  name="verify"
                  type="checkbox"
                  id="verify"
                  v-model="verify"
                />
                <label class="form-check-label" for="verify"
                  >اکانت فعال باشد
                </label>
              </div>
            </div>
            <div class="card-footer">
              <button
                v-on:click.prevent="registerUser()"
                class="btn btn-info"
                :disabled="$v.$invalid"
              >
                ثبت کاربر
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
  email,
  sameAs,
  maxLength,
  minLength,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      verify: false,
      is_staff: 0,
    };
  },
  methods: {
    registerUser() {
      const register = {
        // باید یک آبجکت از موارد ثبت نامی بسازیم و به سمت سرور بفرستیم
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        verify: this.verify,
        is_staff: this.is_staff,
      };
      this.$store.dispatch("registerUser", register);
    },
  },
  computed: {
    errors() {
      return this.$store.getters.getErrors;
    },
  },
  components: {},
  validations: {
    //  این پراپرتی اضافه می شود vuelidate بعد از نصب
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      minLength: minLength(6),
      required,
    },
    password_confirmation: {
      sameAs: sameAs("password"),
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
