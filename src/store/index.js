import { createStore } from "vuex";
import pbHelper from "../utilities/pb-helper";

export default createStore({
  state: {
    user: {},
  },
  mutations: {
    clear(state) {
      state.user = {};
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    clear({ commit }) {
      commit("clear");
    },
    async register({ commit }, { username, email, password, passwordConfirm }) {
      const data = {
        username: username,
        email: email,
        emailVisibility: false,
        password,
        passwordConfirm,
      };

      const record = await pbHelper.create("users", data);

      return await pbHelper.requestVerification(email);
    },
    async requestPasswordRest({ commit }, { email }) {
      return await pbHelper.requestPasswordReset(email);
    },
    async sendVerificationEmail({ commit }, { email }) {
      return await pbHelper.sendVerificationEmail(email);
    },
    logout() {
      pbHelper.logout();
    },
    async login({ commit, dispatch }, { email, password }) {
      const authData = await pbHelper.login(email, password);
      if (pbHelper.isLoggedIn()) {
        commit("setUser", authData);
        await dispatch("loadAll");
        return true;
      }
      return false;
    },
    isLoggedIn() {
      return pbHelper.isLoggedIn();
    },
    async loadAll() {
      // LOAD YOUR DATA
      // const dbData = await pbHelper.getAll("YOUR COLLECTION");
    },
  },
});
