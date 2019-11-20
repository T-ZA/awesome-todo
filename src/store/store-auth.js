import { LocalStorage, LoadingBar } from 'quasar'
import { firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}

const actions = {
  registerUser({}, payload) {
    LoadingBar.start()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        showErrorMessage(error.message)
      })
      .finally(() => {
        LoadingBar.stop()
      })
  },
  loginUser({}, payload) {
    LoadingBar.start()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        showErrorMessage(error.message)
      })
      .finally(() => {
        LoadingBar.stop()
      })
  },
  logoutUser() {
    firebaseAuth.signOut()
      .catch((error) => {
        showErrorMessage(error.message)
      })
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // Set logged in state to true on login
        commit('setLoggedIn', true)

        // Save login state to local storage to know user state prior to app initialization
        LocalStorage.set('loggedIn', true)

        this.$router.push('/')

        // Read data from database into the tasks state module
        dispatch('tasks/fbReadData', null, { root: true })
      }
      else {
        // Clear current tasks that are in the tasks module state
        commit('tasks/clearTasks', null, { root: true })
        
        // Stop loading on logout
        commit('tasks/setTasksDownloaded', false, { root: true })
        
        // Set logged in state to false on logout
        commit('setLoggedIn', false)

        // Save login state to local storage to know user state prior to app initialization
        LocalStorage.set('loggedIn', false)

        this.$router.replace('/auth')
      }
    })
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
