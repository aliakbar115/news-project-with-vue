import Vue from 'vue';
import { router } from '../../main';

const state = {
  user: {},
  users: [],
  errors: [],
  isAdmin: false
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
  isAdmin(state) {
    return state.isAdmin;
  }
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
  setIsAdmin(state, isAdminUser) {
    state.isAdmin = isAdminUser;
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
        console.log(response.data.data);
        context.commit("setUser", response.data.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  updateUser(context, edit) {
    Vue.axios.post('admin/users/update', edit)
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
  deleteUser(context, userId) {
    Vue.axios.delete("admin/users/delete/" + userId)
      .then(function (response) {
        context.commit("setUsers", response.data.users);
      })
      .catch(function (error) {
      })
      .then(function () {
      });
  },
  searchInput(context, search) {
    Vue.axios.get('admin/users/search', {
      params: {
        search: search
      }
    })
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
  checkAdmin(context) {
    Vue.axios.get('admin/checkAdmin')
      .then(function (response) {
        if (response.data) {
          context.commit("setIsAdmin", true);
        } else {
          context.commit("setIsAdmin", false);
          router.push('/');
        }
      })
      .catch(function (error) {
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
