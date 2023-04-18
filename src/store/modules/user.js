import user from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    info: {
      username: undefined,
      nickName: undefined,
      avatar: undefined,
      roles: undefined,
      permissions: undefined,
      menus: undefined,
    },
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INFO: (state, info) => {
    state.info = info;
  },
};

const actions = {
  async login({ commit }, loginData) {
    const { token } = await user.login(loginData);
    commit("SET_TOKEN", token);
    setToken(token);
  },

  async info({ commit }) {
    const data = await user.info();
    commit("SET_INFO", data);
  },

  async logout({ commit }) {
    await user.logout();
    removeToken();
    resetRouter();
    commit("RESET_STATE");
  },

  resetToken({ commit }) {
    removeToken();
    commit("RESET_STATE");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
