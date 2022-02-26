import Vue from 'vue';
import { router } from '../../main';

const state = {
  user: {},
  users: [],
  errors: []
};

const getters = {
  getUsers(state) {
    return state.users;
  },
  getErrors(state) {
    return state.errors;
  },
  getUser(state) {
    return state.user;
  },
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setErrors(state, errors) {
    state.errors = errors;
  },
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  getUsersFromServer(context) {
    Vue.axios.get('admin/users/all')
      .then(function (response) {
        context.commit("setUsers", response.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  registerUser(context, registerData) {
    Vue.axios.post('admin/users/create', registerData)
      .then(function (response) {
        router.push('/admin/users');   // ری دایرکت
      })
      .catch(function (error) {
        if (error.response.status == 422) {
          context.commit("setErrors", error.response.data.errors);
        }
      })
      .then(function () {
      });
  },
  editUser(context, filter) {
    Vue.axios.get('admin/users/edit/' + filter.id)
      .then(function (response) {
        context.commit("setUser", response.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  updateUser() {
    Vue.axios.put('admin/users/edit', editData)
      .then(function (response) {
        router.push('/admin/users');   // ری دایرکت
      })
      .catch(function (error) {
        if (error.response.status == 422) {
          context.commit("setErrors", error.response.data.errors);
        }
      })
      .then(function () {
      });
  }




};

export default {
  state,
  getters,
  mutations,
  actions,
};
