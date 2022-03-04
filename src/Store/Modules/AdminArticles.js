import Vue from 'vue';
import { router } from '../../main';

const state = {
  article: {},
  articles: [],
  articleErrors: [],
  articleImageAddress:"http://localhost:8000/",
};
const getters = {
  getArticles(state) {
    return state.articles;
  },
  getErrorsArticle(state) {
    return state.articleErrors;
  },
  getArticle(state) {
    return state.article;
  },
  getArticleImageAddress(state) {
    return state.articleImageAddress;
  },
};
const mutations = {
  setArticles(state, articles) {
    state.articles = articles;
  },
  setErrorsArticle(state, articleErrors) {
    state.articleErrors = articleErrors;
  },
  setArticle(state, article) {
    state.article = article;
  },
};
const actions = {
  getArticlesFromServer(context) {
    Vue.axios.get('admin/articles/all')
      .then(function (response) {
        context.commit("setArticles", response.data);
      })
      .catch(function (error) {
        //console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
  createArticle(context, registerData) {
    const formData = new FormData();
    formData.append('image', registerData.image);
    formData.append('title', registerData.title);
    formData.append('summary', registerData.summary);
    formData.append('body', registerData.body);
    formData.append('status', registerData.status);
    formData.append('category_id', registerData.category);
    const headers = { 'Content-Type': 'multipart/form-data' };
    Vue.axios.post('admin/articles/create', formData,{ headers })
      .then(function (response) {
        router.push('/admin/articles');   // ری دایرکت
      })
      .catch(function (error) {
        if (error.response.status == 422) {
          context.commit("setErrorsArticle", error.response.data.errors);
        }
      })
      .then(function () {
      });
  },
  updateArticle(context, edit) {
    const formData = new FormData();
    formData.append('image', edit.image);
    formData.append('title', edit.title);
    formData.append('summary', edit.summary);
    formData.append('body', edit.body);
    formData.append('status', edit.status);
    formData.append('category_id', edit.category);
    formData.append('id', edit.id);
    const headers = { 'Content-Type': 'multipart/form-data' };
    Vue.axios.post('admin/articles/update', formData,{ headers })
      .then(function (response) {
        router.push('/admin/articles');   // ری دایرکت
      })
      .catch(function (error) {
        if (error.response.status == 422) {
          context.commit("setErrorsArticle", error.response.data.errors);
        }
      })
      .then(function () {
      });
  },
  deleteArticle(context, articleId) {
    Vue.axios.delete("admin/articles/delete/" + articleId)
      .then(function (response) {
        context.commit("setArticles", response.data.articles);
      })
      .catch(function (error) {
      })
      .then(function () {
      });
  },
  searchInputArticle(context, search) {
    Vue.axios.get('admin/articles/search', {
      params: {
        search: search
      }
    })
      .then(function (response) {
        context.commit("setArticles", response.data);
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
