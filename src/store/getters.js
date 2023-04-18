const getters = {
  token: (state) => state.user.token,
  menus: (state) => state.user.info.menus,
  routes: (state) => state.permission.routes,
  accessedRoutes: (state) => state.permission.accessedRoutes,
};
export default getters;
