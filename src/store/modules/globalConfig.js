const gConfig = {
  state: {
    base_uri: window.location.protocol + '//' + window.location.host
  },
  actions: {
    SET_BASE_URI (state, base_uri) {
      state.base_uri = base_uri
    }
  },
  mutations: {
    SETBASEURI ({ commit }, base_uri) {
      commit('SET_BASE_URI', base_uri)
    }
  }
}

export default gConfig
