import Vue from 'vue';
import { router } from '../../main';

const state = {
  category: {},
  categories: [],
  categoryErrors: []
};
const getters = {
  getCategories(state) {
    console.log('hi');
    return state.categories;
  },
  getErrorsCategory(state) {
    return state.categoryErrors;
  },
  getCategory(state) {
    return state.category;
  },
};
const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
  setErrorsCategory(state, categoryErrors) {
    state.categoryErrors = categoryErrors;
  },
  setCategory(state, category) {
    state.category = category;
  },
};
const actions = {
  getCategoriesFromServer(context) {
    Vue.axios.get('admin/categories/all')
      .then(function (response) {
        context.commit("setCategories", response.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  createCategory(context, registerData) {
    Vue.axios.post('admin/categories/create', registerData)
      .then(function (response) {
        router.push('/admin/categories');   // ری دایرکت
      })
      .catch(function (error) {
        if (error.response.status == 422) {
          context.commit("setErrorsCategory", error.response.data.errors);
        }
      })
      .then(function () {
      });
  },
  updateCategory(context, edit) {
    Vue.axios.post('admin/categories/update', edit)
      .then(function (response) {
        router.push('/admin/categories');   // ری دایرکت
      })
      .catch(function (error) {
        if (error.response.status == 422) {
          context.commit("setErrorsCategory", error.response.data.errors);
        }
      })
      .then(function () {
      });
  },
  deleteCategory(context, categoryId) {
    Vue.axios.delete("admin/categories/delete/" + categoryId)
      .then(function (response) {
        context.commit("setCategories", response.data.categories);
      })
      .catch(function (error) {
      })
      .then(function () {
      });
  },
  searchInputCategory(context, search) {
    Vue.axios.get('admin/categories/search', {
      params: {
        search: search
      }
    })
      .then(function (response) {
        context.commit("setCategories", response.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
