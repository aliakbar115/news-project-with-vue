import Vue from 'vue';
import Vuex from 'vuex';
import AdminUsers from './Modules/AdminUsers'
import AdminCategories from './Modules/AdminCategories'
import AdminArticles from './Modules/AdminArticles'
import AdminComments from './Modules/AdminComments'

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {},
  modules: {
    AdminUsers,
    AdminCategories,
    AdminArticles,
    AdminComments
  }
});
