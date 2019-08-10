import Vue from 'Vue'

// Data
const state = {
  tasks: {
    'ID1': {
      name: 'Task 1',
      completed: false,
      dueDate: '08/15/2019',
      dueTime: '00:00'
    },
    'ID2': {
      name: 'Task 2',
      completed: false,
      dueDate: '08/15/2019',
      dueTime: '06:00'
    },
    'ID3': {
      name: 'Task 3',
      completed: false,
      dueDate: '08/15/2019',
      dueTime: '12:00'
    }
  }
}

// Synchronous fuinctions to modify state
const mutations = {
  updateTask(state, payload) {
    /*
      payload object structure:
      {
        id: String,
        updates: {
          completed: Boolean
        }
      }

      Since the "updates" object contains properties
      at the same level as propeties that exist in
      the structure for a task object, the updates
      object from the payload can be mapped directly
      to the task object by ID.
    */
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    // Needed to keep Vuex and Vue in sync
    Vue.delete(state.tasks, id)
  }
}

// Can be asynchronous
// Called by components to modify state
const actions = {
  updateTask({commit}, payload) {
    commit('updateTask', payload)
  },
  deleteTask({commit}, id) {
    commit('deleteTask', id)
  }
}

// Retrieve data from state
const getters = {
  tasks: (state) => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
