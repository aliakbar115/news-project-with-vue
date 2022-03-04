import Vue from 'vue';
import { router } from '../../main';

const state = {
  comment: {},
  comments: [],
  commentErrors: [],
  response: [],
};
const getters = {
  getComments(state) {
    return state.comments;
  },
  getErrorsComment(state) {
    return state.commentErrors;
  },
  getComment(state) {
    return state.comment;
  },
  getResponse(state) {
    return state.response;
  },
};
const mutations = {
  setComments(state, comments) {
    state.comments = comments;
  },
  setErrorsComment(state, commentErrors) {
    state.commentErrors = commentErrors;
  },
  setComment(state, comment) {
    state.comment = comment;
  },
  setResponse(state, response) {
    state.response = response;
  },
};
const actions = {
  getApprovedCommentsFromServer(context) {
    Vue.axios.get('admin/comments/allApproved')
      .then(function (response) {
        context.commit("setComments", response.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  getUnApprovedCommentsFromServer(context) {
    Vue.axios.get('admin/comments/allUnApproved')
      .then(function (response) {
        context.commit("setComments", response.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  getResponse(context, commentId) {
    Vue.axios.get('admin/comments/getResponse/' + commentId)
      .then(function (response) {
        context.commit("setResponse", response.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  responseComment(context, resComment) {
    Vue.axios.post('admin/comments/response', resComment)
      .then(function (response) {
        context.commit("setResponse", response.data);
      })
      .catch(function (error) {
      })
      .then(function () {
      });
  },
  deleteComment(context, commentId) {
    Vue.axios.delete("admin/comments/delete/" + commentId)
      .then(function (response) {
        context.commit("setComments", response.data);
      })
      .catch(function (error) {
      })
      .then(function () {
      });
  },
  deleteResponse(context, deleteObj) {
    Vue.axios.post("admin/comments/delete/response/" + deleteObj.commentId, deleteObj)
      .then(function (response) {
        context.commit("setResponse", response.data);
      })
      .catch(function (error) {
      })
      .then(function () {
      });
  },
  searchInputComment(context, search) {
    Vue.axios.get('admin/comments/search', {
      params: {
        search: search
      }
    })
      .then(function (response) {
        context.commit("setComments", response.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  approvedComment(context, commentId) {
    Vue.axios.post("admin/comments/setApproved/" + commentId)
      .then(function (response) {
        context.commit("setComments", response.data);
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
