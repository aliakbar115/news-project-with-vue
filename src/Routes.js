import AdminIndex from './Pages/Admin/AdminIndex.vue'
import Users from './Pages/Admin/Components/users/Users.vue'
import UsersCreate from './Pages/Admin/Components/users/UsersCreate.vue'
import UsersEdit from './Pages/Admin/Components/users/UsersEdit.vue'
import UsersAll from './Pages/Admin/Components/users/UsersAll.vue'

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
    ]
  },
];
