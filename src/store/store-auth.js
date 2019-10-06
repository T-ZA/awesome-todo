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
    .then((res) => {
      console.log(`response: ${res}`)
    })
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
      .then((res) => {
        console.log(`response: ${res}`)
      })
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
  handleAuthStateChange({ commit }) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        commit('setLoggedIn', true)

        // Save login state to local storage to know user state prior to app initialization
        LocalStorage.set('loggedIn', true)

        this.$router.push('/')
      }
      else {
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
