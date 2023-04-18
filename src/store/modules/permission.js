import { asyncRoutes, constantRoutes } from "@/router";
import { filterAsyncRoutes } from "@/utils/storePermission";

const state = {
  routes: constantRoutes,
  accessedRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, resultRoutes) => {
    state.routes = constantRoutes.concat(resultRoutes);
    state.accessedRoutes = resultRoutes;
  },
};

const actions = {
  // 方案一
  generateRoutes({ commit }, menus) {
    return new Promise((resolve) => {
      let resultRoutes;
      if (menus.includes("*")) {
        resultRoutes = asyncRoutes;
      } else {
        resultRoutes = filterAsyncRoutes(asyncRoutes, menus);
      }
      commit("SET_ROUTES", resultRoutes);
      resolve(resultRoutes);
    });
  },
  // 方案二
  // generateRoutes({ commit }, menus) {
  //     return new Promise((resolve) => {
  //         let resultRoutes;
  //         resultRoutes = filterAsyncRoutes(asyncRoutes, menus);
  //         commit("SET_ROUTES", resultRoutes);
  //         resolve(resultRoutes);
  //     });
  // },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
