import { LocalStorage } from 'quasar'

// Data
const state = {
  settings: {
    show12hTimeFormat: false,
    showTasksInOneList: false
  }
}

// Synchronous functions to modify state
const mutations = {
  setShow12hTimeFormat(state, value) {
    state.settings.show12hTimeFormat = value
  },
  setShowTasksInOneList(state, value) {
    state.settings.showTasksInOneList = value
  },
  setSettings(state, settings) {
    Object.assign(state.settings, settings)
  }
}

// Can be asynchronous
// Called by components to modify state
const actions = {
  setShow12hTimeFormat({ commit, dispatch }, value) {
    commit('setShow12hTimeFormat', value)

    // Save the changed settings via the saveSettings action
    dispatch('saveSettings')
  },
  setShowTasksInOneList({ commit, dispatch }, value) {
    commit('setShowTasksInOneList', value)

    // Save the changed settings via the saveSettings action
    dispatch('saveSettings')
  },
  saveSettings({ state }) {
    LocalStorage.set('settings', state.settings)
  },
  getSettings({ commit }) {
    let savedSettings = LocalStorage.getItem('settings')
    if (savedSettings) {
      commit('setSettings', savedSettings)
    }
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
