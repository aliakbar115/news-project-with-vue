import AdminIndex from './Pages/Admin/AdminIndex.vue'
import Users from './Pages/Admin/Components/users/Users.vue'
import UsersCreate from './Pages/Admin/Components/users/UsersCreate.vue'
import UsersEdit from './Pages/Admin/Components/users/UsersEdit.vue'
import UsersAll from './Pages/Admin/Components/users/UsersAll.vue'
import Categories from './Pages/Admin/Components/categories/Categories.vue'
import CategoriesCreate from './Pages/Admin/Components/categories/CategoriesCreate.vue'
import CategoriesEdit from './Pages/Admin/Components/categories/CategoriesEdit.vue'
import CategoriesAll from './Pages/Admin/Components/categories/CategoriesAll.vue'

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
      }
    ]
  },
];
