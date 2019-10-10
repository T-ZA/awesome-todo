import Vue from 'vue'
import { uid } from 'quasar'

import { firebaseAuth, firebaseDb } from 'boot/firebase'

// Data
const state = {
  tasks: {},
  search: '',
  sort: 'name'
}

// Synchronous functions to modify state
const mutations = {
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
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
  },
  setSearch(state, value){
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  }
}

// Can be asynchronous
// Called by components to modify state
const actions = {
  addTask({ commit }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }

    // Make the actuaL change to the state via the given mutation
    commit('addTask', payload)
  },
  updateTask({ commit }, payload) {
    // Make the actuaL change to the state via the given mutation
    commit('updateTask', payload)
  },
  deleteTask({ commit }, id) {
    // Make the actuaL change to the state via the given mutation
    commit('deleteTask', id)
  },
  setSearch({ commit }, value) {
    // Make the actuaL change to the state via the given mutation
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    // Make the actuaL change to the state via the given mutation
    commit('setSort', value)
  },
  fbReadData({ commit }) {
    console.log('reading data from Firebase')

    let userId = firebaseAuth.currentUser.uid
    // console.log(userId)
    let userTasks = firebaseDb.ref(`tasks/${userId}`)
    // console.log(userTasks)

    // Triggers on a child being added to the referenced node
    userTasks.on('child_added', (snapshot) => {
      console.log(snapshot)
    })
  }
}

// Retrieve data from state
const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {}
    let keysOrdered = Object.keys(state.tasks)

    // Positive - a is placed after b
    // Negative - b is placed after a
    // Neither - a and b remain where they are
    keysOrdered.sort((a,b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase()
      let taskBProp = state.tasks[b][state.sort].toLowerCase()

      if(taskAProp > taskBProp) return 1
      else if (taskAProp < taskBProp) return -1
      else return 0
    })

    // Add tasks to return object by sorted keys
    keysOrdered.forEach((key) => {
      tasksSorted[key] = state.tasks[key]
    })

    return tasksSorted
  },
  tasksFiltered: (state, getters) => {
    let tasksFiltered = {}
    let tasksSorted = getters.tasksSorted

    // Only filter tasks if there is a search term
    if (state.search) {
      // Iterate over tasksSorted by key (since its objects)
      Object.keys(tasksSorted).forEach((key) => {
        // Get the task of the current key
        let task = tasksSorted[key]

        // Include the task in the return object
        // if its name includes the curretn search term
        let taskNameLowercase = task.name.toLowerCase()
        let searchLowercase = state.search.toLowerCase()
        if (taskNameLowercase.includes(searchLowercase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return tasksSorted
  },
  tasksToDo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}

    // Iterate over state.tasks by key (since its objects)
    Object.keys(tasksFiltered).forEach((key) => {
      // Get the task of the current key
      let task = tasksFiltered[key]

      // Include the task in the return object if not complete
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}

    // Iterate over tasksFiltered by key (since its objects)
    Object.keys(tasksFiltered).forEach((key) => {
      // Get the task of the current key
      let task = tasksFiltered[key]

      // Include the task in the return object if complete
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
