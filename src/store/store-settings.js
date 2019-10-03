// Data
const state = {
  settings: {
    show12hTimeFormat: false
  }
}

// Synchronous functions to modify state
const mutations = {
  setShow12hTimeFormat(state, value) {
    state.settings.show12hTimeFormat = value
  }
}

// Can be asynchronous
// Called by components to modify state
const actions = {
  setShow12hTimeFormat({commit}, value) {
    commit('setShow12hTimeFormat', value)
  }
}

// Retrieve data from state
const getters = {
  settings: (state) => {
    return state.settings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
