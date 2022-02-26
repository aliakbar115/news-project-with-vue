import Vue from 'vue';
import Vuex from 'vuex';

import AdminUsers from './Modules/AdminUsers'
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  modules: {
    AdminUsers
  }
});
