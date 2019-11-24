import Vue from 'vue'
import { uid, Notify } from 'quasar'

import { firebaseAuth, firebaseDb } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

// Data
const state = {
  tasks: {},
  search: '',
  sort: 'name',
  tasksDownloaded: false
}

// Synchronous functions to modify state
const mutations = {
  addTask(state, payload) {
    /*
      payload object structure:
      {
        id: String,
        task: {
          completed: Boolean,
          name: String,
          dueDate: String,
          dueTime: String
        }
      }
    */
    Vue.set(state.tasks, payload.id, payload.task)
  },
  updateTask(state, payload) {
    /*
      payload object structure:
      {
        id: String,
        updates: {
          completed: Boolean,
          name: String,
          dueDate: String,
          dueTime: String
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
  clearTasks(state) {
    state.tasks = {}
  },
  setSearch(state, value){
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value
  }
}

// Can be asynchronous
// Called by components to modify state
const actions = {
  addTask({ dispatch }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }

    // Use the fbAddTask action to add the created task to Firebase
    dispatch('fbAddTask', payload)
  },
  updateTask({ dispatch }, payload) {
    // Use the fbUpdateTask action to update the received task in Firebase
    dispatch('fbUpdateTask', payload)
  },
  deleteTask({ dispatch }, taskId) {
    // Use the fbDeleteTask action to delete task with the given ID in Firebase
    dispatch('fbDeleteTask', taskId)
  },
  setSearch({ commit }, value) {
    // Make the actual change to the state via the given mutation
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    // Make the actual change to the state via the given mutation
    commit('setSort', value)
  },
  fbReadData({ commit, dispatch }) {
    // Get the user ID of the signed in user with the Firebase authentication import
    let userId = firebaseAuth.currentUser.uid

    // Read the data at the location tasks/userId (key for storing user's tasks)
    let userTasks = firebaseDb.ref(`tasks/${userId}`)

    /*
      Firebase Reference Hook: value

      Checks for the value at the utilized Reference.
      Useful for determining when data is accessible 
      from a database reference.
    */
    userTasks.once('value', (snapshot) => {
      commit('setTasksDownloaded', true)
    }, (error) => {
      console.error(error.message)
      showErrorMessage('You are not allowed to access another user\'s tasks')
      dispatch('auth/logoutUser', null, { root: true })
      this.$router.replace('/auth')
    })

    /*
      Firebase Reference Hook: child_added  
    
      Triggers on first making a database connection 
      or on a child being added to the referenced node
      (adding a new task in Firebase)
    */
    userTasks.on('child_added', (snapshot) => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        task: task
      }

      // Make the actual change to the state via the given mutation
      commit('addTask', payload)
    })

    /*
      Firebase Reference Hook: child_changed

      Triggers on a child that is changed
      (updating a task in Firebase)
    */
    userTasks.on('child_changed', (snapshot) => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }

      // Make the actual change to the state via the given mutation
      commit('updateTask', payload)
    })

    /*
      Firebase Reference Hook: child_removed

      Triggers on a child that is removed
      (deleting a task in Firebase)

    */
    userTasks.on('child_removed', (snapshot) => {
      let task = snapshot.val()
      let taskId = snapshot.key

      // Make the actual change to the state via the given mutation
      commit('deleteTask', taskId)
    })
  },
  fbAddTask({}, payload) {
    // Get the user ID of the signed in user with the Firebase authentication import
    let userId = firebaseAuth.currentUser.uid

    // Get the ID of the task to be added
    let taskId = payload.id
    
    // Get the Firebase Reference for the location the data should be saved
    let taskRef = firebaseDb.ref(`tasks/${userId}/${taskId}`)

    // Add the data to the Firebase Reference obtained
    taskRef.set(payload.task)
      .then(() => {
        Notify.create('Task added!')
      })
      .catch((error) => {
        console.error(error.message)
        showErrorMessage('You cannot add tasks for another user')
      })
  },
  fbUpdateTask({}, payload) {
    // Get the user ID of the signed in user with the Firebase authentication import
    let userId = firebaseAuth.currentUser.uid

    // Get the ID of the task to be added
    let taskId = payload.id
    
    // Get the Firebase Reference for the location the data should be saved
    let taskRef = firebaseDb.ref(`tasks/${userId}/${taskId}`)

    // Update the data at the Firebase Reference obtained with the payload
    taskRef.update(payload.updates)
      .then(() => {
        // Get the keys in the updates object within the payload 
        // for the task updates to send to Firebase
        let keys = Object.keys(payload.updates)

        // "keys" will only contain "completed" if the task is simply being marked as done.
        // So if the list of keys in the updates object is not just "completed" 
        // and has more than 1 element, then actual task details are being updated. 
        if (!(keys.includes('completed') && keys.length == 1)) {
          Notify.create('Task updated!')
        }
      })
      .catch((error) => {
        console.error(error.message)
        showErrorMessage('You cannot update another user\'s tasks')
      })
  },
  fbDeleteTask({}, taskId) {
    // Get the user ID of the signed in user with the Firebase authentication import
    let userId = firebaseAuth.currentUser.uid
    
    // Get the Firebase Reference for the location the data should be saved
    let taskRef = firebaseDb.ref(`tasks/${userId}/${taskId}`)

    // Remove the data at the location of the Firebase Reference
    taskRef.remove()
      .then(() => {
        Notify.create('Task deleted!')
      })
      .catch((error) => {
        console.error(error.message)
        showErrorMessage('You cannot delete another user\'s tasks')
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
