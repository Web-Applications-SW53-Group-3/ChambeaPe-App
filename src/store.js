import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      userClaims: null,
    };
  },
  mutations: {
    setUserClaims(state, claims) {
      state.userClaims = claims;
    },
  },
});