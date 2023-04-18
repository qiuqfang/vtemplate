import Layout from "@/layout";

const authorizationManagement = [
  {
    path: "/authorization",
    redirect: "/authorization/admin",
    meta: {
      title: "权限管理",
      icon: "",
    },
    component: Layout,
    children: [
      {
        id: 2,
        path: "/authorization/admin",
        meta: {
          title: "管理员",
          icon: "",
        },
        component: () =>
          import(/* webpackChunkName: "admin" */ "@/views/authorizationManagement/admin/index.vue"),
      },
      {
        id: 3,
        path: "/authorization/role",
        meta: {
          title: "角色",
        },
        component: () =>
          import(/* webpackChunkName: "role" */ "@/views/authorizationManagement/role/index.vue"),
      },
      {
        id: 4,
        path: "/authorization/permission",
        meta: {
          title: "资源",
        },
        component: () =>
          import(
            /* webpackChunkName: "permission" */ "@/views/authorizationManagement/permission/index.vue"
          ),
      },
      {
        id: 5,
        path: "/authorization/menu",
        meta: {
          title: "菜单",
          icon: "",
        },
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/authorizationManagement/menu"),
      },
    ],
  },
];

export default authorizationManagement;
