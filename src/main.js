import Vue from 'vue'
import VueRouter from 'vue-router';
import { Routes } from './Routes';
import {store} from './Store/Store'
import VueCookie from 'vue-cookie';  // npm install vue-cookie --save
import App from './App.vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios';
import vueSimpleAlert from "vue-simple-alert";  // آلرت در ویو

Vue.use(VueRouter);   // for plagin
Vue.use(VueCookie);
Vue.use(Vuelidate);
Vue.use(VueAxios,axios);
Vue.use(vueSimpleAlert);

axios.defaults.baseURL='http://localhost:8000/api/'
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer ' + Vue.cookie.get('news_auth_token');
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error) {
    console.log(error.response);
    if (error.response.status == 401) {
      router.push('/');
    }
  }
  return Promise.reject(error);
});

export const router = new VueRouter({
  routes: Routes,
  mode: 'history',  // # برای اینکه نباشد
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
