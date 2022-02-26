import Vue from 'vue'
import VueRouter from 'vue-router';
import { Routes } from './Routes';
import {store} from './Store/Store'
import VueCookie from 'vue-cookie';  // npm install vue-cookie --save
import App from './App.vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios';

Vue.use(VueRouter);   // for plagin
Vue.use(VueCookie);
Vue.use(Vuelidate);
Vue.use(VueAxios,axios);

axios.defaults.baseURL='http://localhost:8000/api/'

// Vue.http.options.root = "http://localhost:8000/api/";
// Vue.http.interceptors.push((request, next) => { // use JWT   برای لاگین
//   request.headers.set('Authorization', 'Bearer ' + Vue.cookie.get('news_auth_token'));  // set in header Request for all
//   next();
// });

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
