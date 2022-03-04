import AdminIndex from './Pages/Admin/AdminIndex.vue'
import Users from './Pages/Admin/Components/users/Users.vue'
import UsersCreate from './Pages/Admin/Components/users/UsersCreate.vue'
import UsersEdit from './Pages/Admin/Components/users/UsersEdit.vue'
import UsersAll from './Pages/Admin/Components/users/UsersAll.vue'
import Categories from './Pages/Admin/Components/categories/Categories.vue'
import CategoriesCreate from './Pages/Admin/Components/categories/CategoriesCreate.vue'
import CategoriesEdit from './Pages/Admin/Components/categories/CategoriesEdit.vue'
import CategoriesAll from './Pages/Admin/Components/categories/CategoriesAll.vue'
import Articles from './Pages/Admin/Components/articles/Articles.vue'
import ArticlesCreate from './Pages/Admin/Components/articles/ArticlesCreate.vue'
import ArticlesEdit from './Pages/Admin/Components/articles/ArticlesEdit.vue'
import ArticlesAll from './Pages/Admin/Components/articles/ArticlesAll.vue'
import Comments from './Pages/Admin/Components/comments/Comments.vue'
import CommentsApproved from './Pages/Admin/Components/comments/CommentsApproved.vue'
import CommentsUnApproved from './Pages/Admin/Components/comments/CommentsUnApproved.vue'
import CommentsResponse from './Pages/Admin/Components/comments/CommentsResponse.vue'

export const Routes = [
  {
    path: '/admin',
    component: AdminIndex,
    children: [
      {
        path: "users",
        component: Users,
        name: "adminUsers",
        children: [
          {
            path: "",
            component: UsersAll,
            name: "adminUsersAll"
          },
          {
            path: "create",
            component: UsersCreate,
            name: "adminUsersCreate"
          },
          {
            path: "edit/:id",
            component: UsersEdit,
            name: "adminUsersEdit"
          },
        ]
      },
      {
        path: "categories",
        component: Categories,
        name: "adminCategories",
        children: [
          {
            path: "",
            component: CategoriesAll,
            name: "adminCategoriesAll"
          },
          {
            path: "create",
            component: CategoriesCreate,
            name: "adminCategoriesCreate"
          },
          {
            path: "edit/:id",
            component: CategoriesEdit,
            name: "adminCategoriesEdit"
          },
        ]
      },
      {
        path: "articles",
        component: Articles,
        name: "adminArticles",
        children: [
          {
            path: "",
            component: ArticlesAll,
            name: "adminArticlesAll"
          },
          {
            path: "create",
            component: ArticlesCreate,
            name: "adminArticlesCreate"
          },
          {
            path: "edit/:id",
            component: ArticlesEdit,
            name: "adminArticlesEdit"
          },
        ]
      },
      {
        path: "",
        component: Comments,
        name: "adminComments",
        children: [
          {
            path: "comments/approved",
            component: CommentsApproved,
            name: "adminCommentsApproved"
          },
          {
            path: "comments/unApproved",
            component: CommentsUnApproved,
            name: "adminCommentsUnApproved"
          },
          {
            path: "response/:id",
            component: CommentsResponse,
            name: "adminCommentsResponse"
          },
        ]
      }
    ]
  },
];
