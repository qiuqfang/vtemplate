import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import authorizationManagement from "./authorizationManagement";

/* 需要根据用户拥有菜单动态加载的路由 */
export const asyncRoutes = [...authorizationManagement];

/* 任何用户都可以访问的路由 */
export const constantRoutes = [
  { path: "/login", name: "login", component: () => import("@/views/login"), hidden: true },
  {
    path: "/404",
    component: () => import("@/views/404"),
    // meta: { title: "404", icon: "" },
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/401"),
    // meta: { title: "401", icon: "" },
    hidden: true,
  },
  // 必须放在最后
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // 需要服务端支持
    // mode: process.env.IS_ELECTRON ? "hash" : "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // 重置路由
}

export default router;

// 解决导航故障
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  if (onComplete || onAbort) return routerPush.call(this, location, onComplete, onAbort);
  return routerPush.call(this, location).catch((err) => err);
};
