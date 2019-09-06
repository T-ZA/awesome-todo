import Vue from 'vue'
import { uid } from 'quasar'

// Data
const state = {
  tasks: {
    'ID1': {
      name: 'Task 1',
      completed: false,
      dueDate: '2019/08/15',
      dueTime: '00:00'
    },
    'ID2': {
      name: 'Task 2',
      completed: false,
      dueDate: '2019/08/15',
      dueTime: '06:00'
    },
    'ID3': {
      name: 'Task 3',
      completed: false,
      dueDate: '2019/08/15',
      dueTime: '12:00'
    }
  },
  search: ''
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
  }
}

// Can be asynchronous
// Called by components to modify state
const actions = {
  addTask({commit}, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  },
  updateTask({commit}, payload) {
    commit('updateTask', payload)
  },
  deleteTask({commit}, id) {
    commit('deleteTask', id)
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  }
}

// Retrieve data from state
const getters = {
  tasksFiltered: (state) => {
    let tasksFiltered = {}

    // Only filter tasks if there is a search term
    if (state.search) {
      // Iterate over state.tasks by key (since its objects)
      Object.keys(state.tasks).forEach((key) => {
        // Get the task of the current key
        let task = state.tasks[key]

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
    return state.tasks
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
